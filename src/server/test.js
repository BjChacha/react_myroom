const {removeUser, addUser, getUser, initTable} = require('./db');

tb_name = 'accounts';

// // initTable(tb_name);
addUser(tb_name, {username: 'roooooot1', password: 'roooooot1'}, (err, row) => {
    console.log(err, row);
});

// getUser(tb_name, 'chacha', (err, row) => {
//     console.log(err, row);
// });