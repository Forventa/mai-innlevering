module.exports = (sequelize, Sequelize) => {
    const Participants = sequelize.define('Participants', {
        Email: Sequelize.DataTypes.STRING,
        FirstName: Sequelize.DataTypes.STRING,
        LastName: Sequelize.DataTypes.STRING,
        Dob: Sequelize.DataTypes.DATE,
        CompanyName: Sequelize.DataTypes.STRING,
        Salary: Sequelize.DataTypes.SMALLINT,
        Currency: Sequelize.DataTypes.STRING,
        Country: Sequelize.DataTypes.STRING,
        City: Sequelize.DataTypes.STRING
    },{
        timestamps: false
    });

	return Participants;
}