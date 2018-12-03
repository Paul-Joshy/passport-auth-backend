const Router = require('express').Router;
const UserModel = require('../../models/Users.model').UserModel;
const to = require('await-to-js').to;

const router = new Router();

router.get('/', (req, res) => {
    return res.json({
        success: true,
        body: []
    })
})

router.post('/signup', async (req, res) => {
    console.log('sdf');
    const [err, user] = await to(UserModel.findOne({email: req.body.email}));
    if(err){
        req.status(500).json(err);
    }
    if(user){
        res.status(500).json({
            success: false,
            message: "User already Exists"
        });   1
    }
    else{
        const newUser = new UserModel();
        newUser.email = req.body.email;
        newUser.password = newUser.hashPassword(req.body.password);
        newUser.save((err, data) => {
            console.log('sdf');
            if(err)
                return res.status(500).json(err);
            else{
                return res.status(200).json(data);
            }
        })
        // [err, user] = await to(newUser.save());
        // if(err)
        //     return res.status(500).json(err);
        // else
        //     return res.status(200).json({
        //         success: true,
        //         userDetails: user
        //     })
        // const newUser = new UserModel({
        //     email: req.body.email
        // })
    }
});

router.post('/login', (req, res) => {

});

module.exports = router;