const { sequelize } = require("../models");
const { QueryTypes } = require('sequelize');

class ParticipantsService{
    constructor(db){
        this.client = db.sequelize;
        this.participant = db.Participants;
    }

    async addParticipant(email, firstname, lastname, dob, companyname, salary, currency, country, city){
        //check if there is something missing
        const fields = {email, firstname, lastname, dob, companyname, salary, currency, country, city};

        const missingFields = Object.entries(fields)
        .filter(([key, value]) => !value)
        .map(([key]) => key);

        if (missingFields.length > 0) {
            return `Missing fields: ${missingFields.join(', ')}`;
        }

        //check if email is already in use
        const participant = await this.participant.findOne({where: {Email: email}});
        if(participant){
            return `Email is already in use`;
        }

        //create participant
        await this.participant.create({
            Email: email,
            FirstName: firstname,
            LastName: lastname,
            Dob: dob,
            CompanyName: companyname,
            Salary: salary,
            Currency: currency,
            Country: country,
            City: city
        })

        return {success: true, message: `Participant created`};
    }

    async getParticipant(email){
        return await participant.findOne({
            where: {Email: email}
        })
    }

    async getAllParticipants(){
        return await this.participant.findAll();
    }

    async deleteParticipant(email){
        const participant = await this.participant.findOne({where: {Email: email}});
        
        if(!participant){
            return {success: false, message: `Participant not found with email: ${email}`};
        }


        await this.participant.destroy({
            where: {Email: email}
        })

        return {success: true, message: `Deleted participant with email: ${email}`}

    }

    async updateParticipant(email, updates) {
        if (!email) {
            return { success: false, message: "Email is required" };
        }
    
        
        if (Object.keys(updates).length === 0) {
            return { success: false, message: "No update fields provided" };
        }
    
        const participant = await this.participant.findOne({
            where: { Email: email }
        });

        console.log(participant);
    
        if (!participant) {
            return { success: false, message: `No participant found with email: ${email}` };
        }
    
        const [updated] = await this.participant.update(
            updates,
            {where: { Email: email },
        });
    
        return { success: true, message: "Participant updated", data: updated };
    }


}



module.exports = ParticipantsService;