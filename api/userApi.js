const Users = require("../models/users");
const Histories = require("../models/history");
const env = require('dotenv').config();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

let challenges = [];

exports.renderHome = (req, res, next) => {
    res.render('index', { title: 'Express' });
}

exports.createChallenge = async(req, res, next) => {
    const {email} = req.body;
    try {
        if(!email) return res.status(404).json({error: "email field is null"})
        else{
            const gen_challenge = crypto.randomBytes(10).toString('hex');
            challenges.push({email: email, challenge: gen_challenge});
            return res.status(201).json({
                message: "Challenge generated successfully",
                challenge: challenges.filter((item) => item.email == email)[0].challenge,
            });
        }
    }catch(err){
        return res.status(505).json({
            error: err
        })
    }
}

exports.registerUser = async(req, res, next) => {
    const { firstName, lastName, email, dob, blood_group, height, weight } = req.body;

    if(!firstName || !lastName || !email || !dob || !blood_group || !height || !weight){
        res.status(404).json({
            message: "Field left empty"
        })
    }else{
        bcrypt.hash(email, 10).then(async(hash) => {
            await Users.create({
                first_name: firstName,
                last_name: lastName,
                email: email,
                date_of_birth: dob,
                blood_group,
                height,
                weight,
                cookie: hash
            }).then((user) => {
                res.status(201).json({
                    message: "User created!",
                    user: user
                })
            })
        }).catch((error) => {
            res.status(501).json({
                message: "Internal server error",
                error: error
            })
        })
    }
}

exports.saveCredentials = async(req, res, next) => {
    const { credential, email } = req.body;

    if(!credential) return res.status(404).json({
        message: "credentials not provided!",
        credential: credential || "not accessible"
    })
    else{
        const User = await Users.findOneAndUpdate({email: email}, {credential: credential})
        .then(() => {
            challenges = challenges.filter((item) => item.email != email);
            return res.status(201).json({
                message: "credentials updated!"
            })
        }).catch((err) => {
            return res.status(505).json({
                message: "credential update failed!",
                error: err
            })
        })
    }
}

exports.getUsers = async(req, res) => {

    let query = "SELECT * FROM users";

    db.query(query, (err, result) => {
        if(err) return res.status(400).json({error: err})
        else return res.status(201).json({success: result})
    })
}

exports.getUser = async(req, res) => {
    const {email} = req.body;

    const User = await Users.findOne({email: email})
    .then((user) => {
        if(!user){
            return res.status(404).json({
                message: "User does not exist!"
            })
        }
        return res.status(201).json({
            message: "User found",
            user: user
        })
    }).catch((err) => {
        return res.status(505).json({
            message: "Server Error",
            error: err
        })
    })
}

exports.loginUser = async(req, res) => {
    const { email } = req.body;
}

//medical entry apis
exports.getEntries = async(req, res) => {
    const { user_id } = req.body;

    if(!user_id) {
        return res.status(403).json({
            message: "Please provide valid user id"
        })
    }
    const entries = await Histories.find({user_id: user_id}).then((entries) => {
        if(entries.length == 0){
            return res.status(404).json({
                message: "No entries for user"
            })
        }
        return res.status(201).json({
            message: "Retreived all entries!",
            data: entries
        })
    }).catch((err) => {
        return res.status(505).json({
            message: "Entries not loaded",
            error: err
        })
    })
}