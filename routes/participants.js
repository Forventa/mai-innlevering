var express = require('express');
var router = express.Router();
const ParticipantsService = require('../services/participantsService');
const db = require('../models');

const participantsService = new ParticipantsService(db);

const isAuth = require('../middleware/isAuth');


router.get('/', isAuth, async function(req, res){
    try{
        const participants = await participantsService.getAllParticipants();
        res.json(participants);
    }catch(err){
        res.json({success: false, message: err});
    }
});


router.post('/', isAuth, async function(req, res){
    try{
        const {email, firstname, lastname, dob, companyname, salary, currency, country, city} = req.body;
        const result = await participantsService.addParticipant(email, firstname, lastname, dob, companyname, salary, currency, country, city);
        res.json(result);
    } catch(err){
        res.json({success: false, message: err});
    }
});


router.delete('/', isAuth, async function(req, res) {
    try{
        const {email} = req.body;
        const result = await participantsService.deleteParticipant(email);
        res.json(result);
    }catch(err){
        res.json({success: false, message: err});
    }
})


router.put('/', isAuth, async function(req, res){
    try{
        const { email, ...fieldsToUpdate} = req.body;
        if(!email){
            return res.json({success: false, message: "missing email"});
        }

        const result = await participantsService.updateParticipant(email, fieldsToUpdate);
        res.json({success: true, message: result});

    }catch(err){
        res.json({success: false, message: err});
    }
});

module.exports = router;