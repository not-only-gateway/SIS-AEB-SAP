import Dexie from "dexie";
import PropTypes from 'prop-types'

export async function startDatabase() {
    const userDB = new Dexie('user');

    let response = null

    userDB.version(1).stores({
        profile: '++,id, corporateEmail, name, birth, pic, homeOffice',
        collaboration: '++,id, unitAcronym',
        accessProfile: '++, ' +
            'id,' +
            ' denomination,' +
            ' canCreatePerson,' +
            ' canUpdatePerson,' +
            ' canDeletePerson,' +
            ' canCreateRole,' +
            ' canUpdateRole,' +
            ' canDeleteRole,' +
            ' canCreateAccessProfile,' +
            ' canUpdateAccessProfile,' +
            ' canDeleteAccessProfile ,' +
            ' canViewAccessLog,' +
            ' canViewActivityLog, ' +
            'canManageStructure,' +
            'canCreateCollaboration,' +
            ' canUpdateCollaboration,' +
            'canDeleteCollaboration,' +
            'canUpdateLocation,' +
            ' canViewLocation, ' +
            'canUpdateDocument,' +
            ' canViewDocuments,' +
            ' canUpdateContact,' +
            ' canViewContact' +
            'canCreateMembership,' +
            'canUpdateMembership'

    })

    await userDB.open().then(() => {
        response = userDB
    }).catch(error => {
        console.error(error);
    })

    return response
}

export async function setProfile(props) {
    const userDB = new Dexie('user');
    userDB.open().then(() => {
        const profile = userDB.table('profile')
        if (profile)
            profile.add({
                id: props.id,
                corporateEmail: props.corporateEmail,
                name: props.name,
                birth: props.birth,
                pic: props.pic,
                homeOffice: props.homeOffice
            }).catch(error => console.log(error))
    }).catch(error => console.log(error))
}

setProfile.propTypes = {
    id: PropTypes.number,
    corporateEmail: PropTypes.string,
    name: PropTypes.string,
    birth: PropTypes.number,
    pic: PropTypes.any,
    homeOffice: PropTypes.bool
}

export async function readProfile() {
    if (await Dexie.exists('user')) {
        const userDB = new Dexie('user')
        return userDB.open().then(async function () {
            const profile = userDB.table('profile')

            if (profile) {
                const query = await profile.toArray()
                if (query.length > 0)
                    return query[0]
                else
                    return null
            } else return null
        })
    }
    return null
}

export async function setCollaboration(props) {
    if (await Dexie.exists('user')) {
        const userDB = new Dexie('user');

        userDB.open().then(() => {
            const collaboration = userDB.table('collaboration')
            if (collaboration)
                collaboration.add({
                    id: props.id,
                    unitAcronym: props.unitAcronym,
                }).catch(error => console.log(error))
        }).catch(error => console.log(error))
    }

}

setCollaboration.propTypes = {
    id: PropTypes.number,
    unitAcronym: PropTypes.string,
}

export async function readCollaboration() {
    if (await Dexie.exists('user')) {
        const userDB = new Dexie('user')
        return userDB.open().then(async function () {
            const collaboration = userDB.table('collaboration')

            if (collaboration) {
                const query = await collaboration.toArray()
                if (query.length > 0)
                    return query[0]
                else
                    return null
            } else return null
        })
    }
    return null
}

export async function setAccessProfile(props) {
    if (await Dexie.exists('user')) {
        const userDB = new Dexie('user');
        userDB.open().then(() => {
            const access = userDB.table('accessProfile')
            if (access)
                access.add({
                    id: props.id,
                    denomination: props.denomination,
                    canCreatePerson: props.canCreatePerson,
                    canUpdatePerson: props.canUpdatePerson,
                    canDeletePerson: props.canDeletePerson,
                    canCreateRole: props.canCreateRole,
                    canUpdateRole: props.canUpdateRole,
                    canDeleteRole: props.canDeleteRole,
                    canCreateAccessProfile: props.canCreateAccessProfile,
                    canUpdateAccessProfile: props.canUpdateAccessProfile,
                    canDeleteAccessProfile: props.canDeleteAccessProfile,
                    canViewAccessLog: props.canViewAccessLog,
                    canViewActivityLog: props.canViewActivityLog,
                    canManageStructure: props.canManageStructure,
                    canCreateCollaboration: props.canCreateCollaboration,
                    canUpdateCollaboration: props.canUpdateCollaboration,
                    canDeleteCollaboration: props.canDeleteCollaboration,
                    canUpdateLocation: props.canUpdateLocation,
                    canViewLocation: props.canViewLocation,
                    canUpdateDocuments: props.canUpdateDocuments,
                    canViewDocuments: props.canViewDocuments,
                    canUpdateContact: props.canUpdateContact,
                    canViewContact: props.canViewContact,
                    canCreateMembership: props.canCreateMembership,
                    canUpdateMembership: props.canUpdateMembership,
                }).catch(error => console.log(error))
        }).catch(error => console.log(error))
    }
}

setAccessProfile.propTypes = {
    id: PropTypes.number,
    denomination: PropTypes.string,
    canCreatePerson: PropTypes.bool,
    canUpdatePerson: PropTypes.bool,
    canDeletePerson: PropTypes.bool,
    canCreateRole: PropTypes.bool,
    canUpdateRole: PropTypes.bool,
    canViewRole: PropTypes.bool,
    canDeleteRole: PropTypes.bool,
    canCreateAccessProfile: PropTypes.bool,
    canUpdateAccessProfile: PropTypes.bool,
    canDeleteAccessProfile: PropTypes.bool,
    canViewAccessLog: PropTypes.bool,
    canViewActivityLog: PropTypes.bool,
    canManageStructure: PropTypes.bool,
    canCreateMembership:  PropTypes.bool,
    canUpdateMembership: PropTypes.bool,
    canCreateCollaboration: PropTypes.bool,
    canUpdateCollaboration: PropTypes.bool,
    canViewCollaboration: PropTypes.bool,
    canDeleteCollaboration: PropTypes.bool,
    canUpdateLocation: PropTypes.bool,
    canViewLocation: PropTypes.bool,
    canUpdateDocuments: PropTypes.bool,
    canViewDocuments: PropTypes.bool,
    canUpdateContact: PropTypes.bool,
    canViewContact: PropTypes.bool
}

export async function readAccessProfile() {
    if (await Dexie.exists('user')) {
        const userDB = new Dexie('user')
        return userDB.open().then(async function () {
            const access = userDB.table('accessProfile')

            if (access) {
                const query = await access.toArray()
                if (query.length > 0)
                    return query[0]
                else
                    return null
            } else return null
        })
    }
    return null
}