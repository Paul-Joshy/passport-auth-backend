const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new mongoose.Schema({
    'email': {
        type: String,
        required: true
    },
    'password': {
        type: String
    }
});

UserSchema.methods.hashPassword = (password) => {
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    return passwordHash;
}

UserSchema.methods.comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

const UserModel = mongoose.model('users', UserSchema)

module.exports = {
    UserModel,
    UserSchema
};