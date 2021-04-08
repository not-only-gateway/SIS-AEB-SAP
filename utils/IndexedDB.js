import Dexie from "dexie";
import PropTypes from 'prop-types'

export async function startDatabase() {
    const userDB = new Dexie('user');

    let response = null

    userDB.version(1).stores({
        profile: 'id, corporateEmail, name, birth, pic',
        collaboration: 'id, unityAcronym, unityID, roleDenomination, roleID',
        accessLevel: 'id, ' +
            'canUpdatePerson, ' +
            'canViewCollaboratorRoles, ' +
            'canUpdateCollaboration, ' +
            'canCreateCollaboration, ' +
            'canUpdateUnity, ' +
            'canUpdateLocation, ' +
            'canUpdateContact, ' +
            'canUpdateDocuments, ' +
            'canViewLocation, ' +
            'canViewContact, ' +
            'canViewDocuments, ' +
            'canViewActivityLog'
    })

    await userDB.open().then(() => {
        response = userDB
    }).catch (error => {
        console.error(error);
    })

    return response
}

export async function setProfile(props) {
    const userDB = new Dexie('user');
    if(!userDB.isOpen())
        userDB.open().then(async function (){
            await userDB.profile.add({
                id: props.id,
                corporateEmail: props.corporateEmail,
                name: props.name,
                birth: props.birth,
                pic: props.pic
            })
        }).catch(error => console.log(error))
    else
        await userDB.profile.add({
            id: props.id,
            corporateEmail: props.corporateEmail,
            name: props.name,
            birth: props.birth,
            pic: props.pic
        })
}

setProfile.propTypes={
    id: PropTypes.number,
    corporateEmail: PropTypes.string,
    name: PropTypes.string,
    birth: PropTypes.number,
    pic: PropTypes.any
}

export async function setCollaboration(props) {
    const userDB = new Dexie('user');
    if(!userDB.isOpen())
        userDB.open().then(async function (){
            await userDB.profile.add({

            })
        }).catch(error => console.log(error))
    else
        await userDB.profile.add({
            id: props.id,
            unityAcronym: props.unityAcronym,
            unityID: props.unityID,
            roleDenomination: props.roleDenomination,
            roleID: props.roleID,
        })
}

setCollaboration.propTypes={
    id: PropTypes.number,
    unityAcronym: PropTypes.string,
    unityID: PropTypes.number,
    roleDenomination: PropTypes.string,
    roleID: PropTypes.number,
}