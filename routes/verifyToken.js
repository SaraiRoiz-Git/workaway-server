const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token)
    if (!token) {
        return res.status(401).send('access Denied');
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        console.log("verified", verified)
        req.user = verified;
        next();
    } catch (err) {
        return res.status(400).send('Invalid Token');
    }
}