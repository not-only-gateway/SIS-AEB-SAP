import Dexie from "dexie";
import PropTypes, {func} from 'prop-types'

export async function startDatabase() {
    const userDB = new Dexie('user');

    let response = null

    userDB.version(1).stores({
        profile: '++,id, corporateEmail, name, birth, pic',
        collaboration: '++,id, unityAcronym, unityID',
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
                pic: props.pic
            }).catch(error => console.log(error))
    }).catch(error => console.log(error))
}

setProfile.propTypes = {
    id: PropTypes.number,
    corporateEmail: PropTypes.string,
    name: PropTypes.string,
    birth: PropTypes.number,
    pic: PropTypes.any
}

export async function readProfile() {
    const userDB = new Dexie('user')
    return userDB.open().then(async function (){
        const profile = userDB.table('profile')

        if(profile)
            return profile.get(1)
        else return null
    })

}

export async function setCollaboration(props) {
    const userDB = new Dexie('user');
    userDB.open().then(() => {
        const collaboration = userDB.table('collaboration')
        if (collaboration)
            collaboration.add({
                id: props.id,
                unityAcronym: props.unityAcronym,
                unityID: props.unityID,
            }).catch(error => console.log(error))
    }).catch(error => console.log(error))
}

setCollaboration.propTypes = {
    id: PropTypes.number,
    unityAcronym: PropTypes.string,
    unityID: PropTypes.number,
}

export async function readCollaboration() {
    let response = null

    const userDB = new Dexie('user');

    userDB.open().then(async function () {
        const collaboration = userDB.table('collaboration')
        if (collaboration) {
            const query = await collaboration.get(1)
            if (query !== undefined && query !== null)
                response = query
        }
    }).catch(error => console.log(error))

    return response
}