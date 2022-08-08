const sqlite3 = require('sqlite3').verbose();
const {getSaltSync, hashSync} = require('./jwt');

AUTH_DB_PATH = 'db/auth.db';

function initTable(tableName) {
    const db = new sqlite3.Database(AUTH_DB_PATH);
    db.get(`SELECT * FROM ${tableName}`, (err, res)=> {
        if (err) {
            // console.log("\t", err, res);
            console.log('creating table....');
            db.run(`CREATE TABLE ${tableName} (
                Id INTEGER PRIMARY KEY AUTOINCREMENT,
                Username TEXT NOT NULL,
                Email TEXT,
                Password TEXT NOT NULL,
                Salt text,
                DateCreated DATE,
                DateLoginLast DATE)`
                );
        } else {
            console.log(`Table ${tableName} is already existed.`);
        }
    });
    db.close();
}

function getUser(tableName, username, callback) {
    const db = new sqlite3.Database(AUTH_DB_PATH);
    db.get(`SELECT * FROM ${tableName} WHERE Username=?`, username, callback);
    db.close();
}

function addUser(tableName, info, callback) {
    const db = new sqlite3.Database(AUTH_DB_PATH);
    const salt = getSaltSync(10);
    db.run(`INSERT INTO ${tableName} (Username, Email, Password, Salt, DateCreated) VALUES (?,?,?,?,?)`, [info.username, info.email || "", hashSync(info.password, salt), salt, Date()], callback);
    db.close();
}

// TODO: update last login, mainly
function updateUser(tableName, username, updateCol, updateRow, callback) {
    const db = new sqlite3.Database(AUTH_DB_PATH);
    db.run(`UPDATE ${tableName} SET ${updateCol}=? WHERE Username=?`, updateRow, username, callback);
    db.close();
}

function removeUser(tableName, username, callback) {
    const db = new sqlite3.Database(AUTH_DB_PATH);
    db.run(`DELETE FROM ${tableName} WHERE username=?`, username, callback);
    db.close();
}

module.exports = {
    initTable,
    getUser,
    addUser,
    removeUser,
    updateUser,
};
