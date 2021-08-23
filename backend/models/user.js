const { ThrowStmt } = require('@angular/compiler');
const  db = require('../util/database');

var today = new Date();

module.exports = class User {
    constructor(fname,lname,email,password){

        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.password = password;

    }

    static find(email){
        return db.execute(
            'SELECT * FROM user WHERE email = ?', 
            [email]
        );
    }

    static save(user){
        return db.execute(
            'INSERT INTO user (fname,lname,email,password,calories,date) VALUES (?,?, ?, ?, 0, ?)',
            [user.fname,user.lname,user.email,user.password,today]
        );
    }
};


