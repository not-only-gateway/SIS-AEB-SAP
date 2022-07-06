import jwt
from service.endpoint.models import Access, Endpoint
from access.profile.models import AccessProfile, AccessPrivilege
import env
import ldap
from backend_utils.env import get_values
from access.user.models import User
from access.active_directory.models import ActiveDirectory
from sqlalchemy.exc import SQLAlchemyError
shared_env = get_values()


class Utils:
    @staticmethod
    def validate_authentication(email, password, active_directory):
        user = User.query.get(email)
        ad = ActiveDirectory.query.get(active_directory)

        if ad is not None:

            ldap.set_option(ldap.OPT_REFERRALS, 0)
            ldap.protocol_version = 3

            l_server = ldap.initialize(ad.server)
            try:
                l_server.set_option(ldap.OPT_REFERRALS, 0)
                l_server.simple_bind_s(email, password)

                if user is None:
                    result = l_server.search_s(ad.base, ldap.SCOPE_SUBTREE, ad.filter, ad.attr)

                    results = [entry for dn, entry in result if isinstance(entry, dict)]

                    final_data = []

                    for i in results:
                        attributes = {}
                        for j in ad.attr:
                            if len(i.get(j, {})) > 0:
                                attributes[j] = i.get(j, {})[0].decode('utf-8')

                        final_data.append(attributes)

                    new_user = {}
                    for i in final_data:
                        if i.get('mail', None) == email or i.get('email', None) == email:
                            new_user = {
                                'user_email': i.get('mail', None) if i.get('mail', None) == email else i.get('email',
                                                                                                             None),
                                'name': i.get('displayName', None)
                            }
                    try:
                        User(new_user)
                    except SQLAlchemyError:
                        pass
                return True
            except ldap.INVALID_CREDENTIALS:
                l_server.unbind()
                return False
        else:
            return False

    @staticmethod
    def make_jwt(package):
        return jwt.encode(
            package,
            env.AUTHORIZATION_TOKEN,
            algorithm='HS256'
        )

    @staticmethod
    def decrypt_jwt(token, has_exp=True):
        try:
            token = jwt.decode(
                token,
                key=env.AUTHORIZATION_TOKEN,
                algorithms='HS256',
                options={
                    'verify_exp': has_exp
                }
            )

            return token
        except (jwt.exceptions.DecodeError,
                jwt.exceptions.InvalidTokenError,
                jwt.exceptions.ExpiredSignatureError):
            return None

    @staticmethod
    def authenticate(authorization, path, method):
        allowed = Utils.validate_manager(authorization)
        Utils.validate_manager(authorization)

        if not allowed:
            endpoint = Endpoint.query.get(path)
            if endpoint is not None:
                allowed = Utils.check_access(token=authorization, endpoint=endpoint.url, method=method)
            else:
                allowed = False
        return allowed

    @staticmethod
    def validate_manager(authorization):
        return True

    @staticmethod
    def check_access(token, endpoint, method):
        if token == shared_env.get('INTERNAL_COMMUNICATION_TOKEN', None):
            return True
        else:
            decrypted = Utils.decrypt_jwt(token)
            user = User.query.get(decrypted.get('user_email', None)) if decrypted is not None else None
            if user is not None:
                access_profile = AccessProfile.query.get(
                    user.access_profile) if user.access_profile is not None else None
                access_profile_privileges = AccessPrivilege.query.filter(
                    AccessPrivilege.access == access_profile.id).all() if access_profile is not None else []
                endpoint_required_privileges = Access.query.filter(Access.endpoint == endpoint,
                                                                   Access.method == method).all()
                valid = True
                for i in endpoint_required_privileges:
                    found = False
                    for j in access_profile_privileges:
                        if j.privilege == i.privilege:
                            found = True
                    valid = found

                return valid
            else:
                return False
