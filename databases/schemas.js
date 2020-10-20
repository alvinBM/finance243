/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import Realm from "realm";

export const USER_SCHEMA = "User";
export const WALLET_SCHEMA = "Wallet";
export const CATEGORIE_SCHEMA = "Categorie";
export const TRANSACTION_SCHEMA = "Transaction";


export const walletSchema = {
    name: WALLET_SCHEMA,
    primaryKey: "id",
    properties: {
        id: "int",
        created: "date",
        modified: "date",
        activated: { type: "string", default: "1" },
        name: "string",
        description: "string",
        color: "string",
        currency: "string",
        amount: "int",
        saving: { type: "string", default: "0" }, //1=> si poche epargne
        principal: { type: "string", default: "0" }, //1=> si poche principal
        bank: { type: "string", default: "0" }, //1=> si poche banque
    },
};


export const userSchema = {
    name: USER_SCHEMA,
    primaryKey: "id",
    properties: {
        id: "int",
        fullname: "string",
        created: "date",
        modified: "date",
        activated: { type: "string", default: "1" },
        phone: "string",
        email: "string",
        password: "string",
        wallets: { type: "list", objectType: WALLET_SCHEMA },
    },
};

const databaseOptions = {
    path: "finance243.realm",
    schema: [walletSchema, userSchema],
    schemaVersion: 0,
};


/*** Fonctions for model */
export const creatUser = newUser => new Promise((resolve, reject) => {

    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(USER_SCHEMA, newUser);
            resolve(newUser);
        });
    }).catch(error => {
        console.log("Erreur create user realm", error);
        reject(error);
    });

});



export const updateUser = user => new Promise((resolve, reject) => {

    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let updatingUser = realm.objectForPrimaryKey(USER_SCHEMA, user.id);
            updatingUser.fullname = user.fullname;
            updatingUser.phone = user.phone;
            updatingUser.email = user.email;
            resolve();
        });
    }).catch(error => {
        console.log("Erreur Update user realm", error);
        reject(error);
    });

});


export const deleteUser = userId => new Promise((resolve, reject) => {

    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingUser = realm.objectForPrimaryKey(USER_SCHEMA, userId);
            realm.delete(deletingUser);
            resolve();
        });
    }).catch(error => {
        console.log("Erreur Deleting user realm", error);
        reject(error);
    });

});

export const getUser = userId => new Promise((resolve, reject) => {

    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let user = realm.objectForPrimaryKey(USER_SCHEMA, userId);
            resolve(user);
        });
    }).catch(error => {
        console.log("Erreur Get user realm", error);
        reject(error);
    });

});

export const getUsers = () => new Promise((resolve, reject) => {

    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let users = realm.objects(USER_SCHEMA);
            resolve(users);
        });
    }).catch(error => {
        console.log("Erreur Get all user realm", error);
        reject(error);
    });

});


export default new Realm(databaseOptions);
