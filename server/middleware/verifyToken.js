const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).send({
            success: false,
            message: 'Token is blank'
        });
    }
    var doneToken = token.split(' ')[1];
    jwt.verify(doneToken, 'rnw4', (err, decoded) => { 
        if (err) {
            return res.status(403).send({
                success: false,
                message: 'Token is not valid'
            });
        }
        req.user = decoded; // Store user data in the request object
        next();
    });
}

//only admin route
const isAdmin = async(req,res,next) => {
    try{
        if(req.user.user.role != "admin"){
            return res.status(403).send({
                success: false,
                message: 'Unauthorised access'
            });
        }
        return next();
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    verifyToken,isAdmin
}  