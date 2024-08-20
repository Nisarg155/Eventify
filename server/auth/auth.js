const jwt = require("jsonwebtoken");

const createJWT = (user) => {
    const token = jwt.sign({
        email: user.email,
        role: user.role || 'none',
        organisation_id: user.organisation_id || 'none',
    }, process.env.JWT_SECRET)

    return token;
}

const protect = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) return res.status(401).send({
        'message': 'No Token Provided',
    });

    const [, token] = bearer.split(' ');
    if (!token) return res.status(401).send({
        message: 'No token provided'
    });

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        next()
    }
    catch (e)
    {
        console.error("Invalid Token provided");
        return  res.status(401).send({
            "message": "Invalid Token provided"
        });
    }

}

module.exports = {createJWT, protect}