import Dexie from "dexie";

export function setProfile(data){
    const profileDB = new Dexie('profile');

    profileDB.version(1).stores({
        friends: '++id, name, age'
    })
}
export function setProfileAccess(data){
    const accessDB = new Dexie('access');
    accessDB.version(1).stores({
        friends: '++id, name, age'
    });
}
export function getProfile(){

}
export function getProfileAccess(){

}
