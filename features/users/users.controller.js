const {getProp} = require('../../helpers/props');
const UserModel = require('./../../models/Users.model');
const getUserDetails = (req, res) => {
    if(req.user){
        const {local, google, facebook} = req.user;
        id = req.user._id;
        return res.status(200).json({local, google, facebook, id})
    }
    else{
        return res.status(500).json({message: "User not found"})
    }
}

const unlinkFacebook = async(req, res) => {
    if(req.user){
        if(req.user.method === 'mixed'){
            docs = await UserModel.findByIdAndUpdate(req.user.id, {facebook: {}});
            if(docs)
                return res.status(200).json(docs)
        }
        else
            return res.status(500).json({error: "You will have to delete the account to unlink from facebook"})
    }
}

const unlinkGoogle = async(req, res) => {
    if(req.user){
        if(req.user.method === 'mixed'){
            docs = await UserModel.findByIdAndUpdate(req.user.id, {facebook: {}});
            if(docs)
                return res.status(200).json(docs)
        }
        else
            return res.status(500).json({error: "You will have to delete the account to unlink from google"})
    }
}

const updateUserEmail = async(req, res) => {
    if(req.user){
        const updatedUser = await UserModel.findByIdAndUpdate(req.user.id, {"local.email": req.body.email})
        if(updatedUser){
            return res.status(200).json(updatedUser)
        }
    }
}

const deleteAccount = async(req, res) => {
    if(req.user){
        const updatedUser = await UserModel.findByIdAndUpdate(req.user.id, {"is_deleted": true})
        if(updatedUser){
            return res.status(200).json(updatedUser)
        }
    }
}



module.exports = {
    getUserDetails,
    unlinkFacebook,
    unlinkGoogle,
    updateUserEmail
}