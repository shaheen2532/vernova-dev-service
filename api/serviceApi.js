const Histories = require("../models/history");
const env = require('dotenv').config();
const bcrypt = require('bcryptjs');


exports.createHistory = async(req, res, next) => {
    const { user_id, doctor_id, diagnosis_name, diagnosis_date, follow_up, 
        severity, status, doctor_name, description, symptoms, prescription } = req.body;
    
    if( !user_id || !doctor_id || !diagnosis_name || !diagnosis_date || !follow_up || 
        !severity || !status || !doctor_name || !description || !symptoms || !prescription ){
        return res.status(404).json({
            message: "Field left empty!"
        })
    }
    const History = await Histories.create({
        user_id: user_id,
        doctor_id: doctor_id,
        diagnosis_name: diagnosis_name,
        diagnosis_date: diagnosis_date,
        follow_up: follow_up,
        severity: severity,
        status: status,
        doctor_name: doctor_name,
        description: description,
        symptoms: symptoms,
        prescription: prescription
    }).then((hist) => {
        return res.status(201).json({
            message: "Entry created!",
            data: hist
        })
    }).catch((err) => {
        return res.status(505).json({
            message: "Error",
            error: err
        })
    })
}