const UserModel = require('../../models/Users.model');
const CustomUserModel = require('../users/users.model');
const to = require('await-to-js').to;
const JWT = require('jsonwebtoken');
const {JWT_SECRET} = require('../../config');

signToken = user => {
    return JWT.sign({
      iss: 'CodeWorkr',
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, JWT_SECRET);
}

const signup = async (req, res, next) => {
    const { email, password } = req.value.body;
    
    // Check if there is a user with the same email
    const foundUser = await UserModel.findOne({ "local.email": email });
    if (foundUser && foundUser.is_deleted) { 
        return res.status(403).json({ error: 'Email is already in use'});
    }

    if(foundUser && foundUser.is_deleted){
        const updateUser = await UserModel.findByIdAndUpdate(foundUser.id, {is_deleted: false})
    }
    
    // Create a new user
    const newUser = new UserModel({ 
        method: 'local',
        local: {
            email: email, 
            password: password
        }
    });
    
    await newUser.save();
    
    // Generate the token
    const token = signToken(newUser);
    // Respond with token
    res.status(200).json({ token });
}

const signin = async (req, res, next) => {
    // Generate token
    const user = await UserModel.findById(req.user.id)
    if(user){
        const token = signToken(user);
        res.status(200).json({ token });
    }
    else{
        res.status(500).json({error: 'user not found'});
    }
}

const checkIfAlreadyLinked = async (req, res, next) => {
    if(req.body && req.body.email){
        const user = await CustomUserModel.findByEmail(req.body.email)
        if(user){
            if(user.method !== 'local')
            res.status(500).json({error: 'already linked'})
        }
        else
            next();
    }
    else{
        next();
    }
}

module.exports = {
    signup,
    signin,
    checkIfAlreadyLinked
};