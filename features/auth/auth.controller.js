const UserModel = require('../../models/Users.model');
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
    if (foundUser) { 
        return res.status(403).json({ error: 'Email is already in use'});
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
    const token = signToken(req.user);
    res.status(200).json({ token });
}

module.exports = {
    signup,
    signin
};