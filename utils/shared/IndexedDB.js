import Dexie from "dexie";
import PropTypes from 'prop-types'

export async function startDatabase() {
    const userDB = new Dexie('user');

    let response = null

    userDB.version(1).stores({
        profile: '++,id, corporateEmail, name, birth, pic, homeOffice, mainCollaboration',
        collaboration: '++,id, unitAcronym, roleInformation',
        accessProfile: '++, ' +
            'id,' +
            'denomination, ' +
            'canCreatePerson, ' +
            'canUpdatePerson, ' +
            'canDeletePerson, ' +
            'canManageStructure, ' +
            'canManageMembership'
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
                homeOffice: props.homeOffice,
                mainCollaboration: props.mainCollaboration
            }).catch(error => console.log(error))
    }).catch(error => console.log(error))
}

setProfile.propTypes = {
    id: PropTypes.number,
    corporateEmail: PropTypes.string,
    name: PropTypes.string,
    birth: PropTypes.number,
    pic: PropTypes.any,
    homeOffice: PropTypes.bool,
    mainCollaboration: PropTypes.number
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
                    roleInformation: props.roleInformation
                }).catch(error => console.log(error))
        }).catch(error => console.log(error))
    }

}

setCollaboration.propTypes = {
    id: PropTypes.number,
    unitAcronym: PropTypes.string,
    roleInformation: PropTypes.string
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
                    canCreatePerson:props.canCreatePerson,
                    canUpdatePerson:props.canUpdatePerson,
                    canDeletePerson:props.canDeletePerson,
                    canManageStructure:props.canManageStructure,
                    canManageMembership:props.canManageMembership
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
    canManageStructure: PropTypes.bool,
    canManageMembership: PropTypes.bool,

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