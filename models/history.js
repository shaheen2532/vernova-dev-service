const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    doctor_id: {
        type: String,
        required: true
    },
    diagnosis_name: {
        type: String,
        required: true
    },
    diagnosis_date: {
        type: Date,
        required: true
    },
    follow_up: {
        type: Date,
        required: true
    },
    severity: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    doctor_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    symptoms: {
        type: String,
        required: true
    },
    prescription: {
        type: String,
        required: true
    }
}) 

const History = mongoose.model("History", historySchema);
module.exports = History;