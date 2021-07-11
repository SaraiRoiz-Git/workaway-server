const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verify = require('./verifyToken')
const util = require('../utility')
const cors = require('cors')

//signup routh

router.post('/signup', async (req, res) => {

    //checking if mail exist
    const emailExist = await util.checkIfMailExist(req)
    if (emailExist) {
        return res.status(400).send('Email is alredy exist')
    }

    //hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = util.createNewUser(req,hashPassword)
    try {
       user.save()
       const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
       res.header('auth-token', token).send(token)
    } catch (error) {
        res.status(400).send(err)
    }
});

//login
router.post('/login', cors(), async (req, res) => {

    const user = await util.checkIfMailExist(req)
    if (!user) {
        return res.status(400).send('Email or password is worng')
    }

    //validate password
    const validPass = await util.validatePassword(req,user)
    if (!validPass) {
        return res.status(400).send('Email or password is worng')
    }

    //create and assign token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
})

//logout route
router.post("/logout", verify, (req, res) => {
    res.sendStatus(200);
});


router.get("/data", verify, (req, res) => {
    return res.send("ok").sendStatus(200);
});

module.exports = router;