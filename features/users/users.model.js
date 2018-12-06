const UserModel = require('../../models/Users.model');

const createOrUpdateByEmail = async (email, updateData, done) => {
    const user = await UserModel.findOne({
        $or:[
            {'local.email': email},
            {'google.email': email},
            {'facebook.email': email}
        ]
    })
    if(user){
        // use if only one social media account is allowed
        // if(user.method === "facebook" || user.method === 'google'){
        //     done(null, user)
        // }
        // else{
            
        updateData.method = 'mixed';
        updateData.is_deleted = false;
        const docs = await UserModel.findByIdAndUpdate(user.id, updateData);
        if(docs)
        done(null, docs);
        // }
        
    }
    
    else{
        const newUser = new UserModel(updateData);
        await newUser.save();
        done(null, newUser);
    }
}

const findByEmail = async (email) => {
    const user = await UserModel.findOne({
        $or:[
            {'local.email': email},
            {'google.email': email},
            {'facebook.email': email}
        ]
    })
    return user;
}

module.exports = {
    createOrUpdateByEmail,
    findByEmail
}