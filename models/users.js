module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        Username: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: false
    });

	return User
}