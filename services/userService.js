const db = require('../models');
const { QueryTypes } = require('sequelize');


class UserService{
    constructor(){
        this.client = db.sequelize;
        this.user = db.User;
    }    

    async checkPassword(username, password){
        const user = await this.user.findOne({
            where: {Username: username}
        })
        
        if(user.dataValues.Password == password){
            return true;
        }


        return false;

    }

}

module.exports = UserService;