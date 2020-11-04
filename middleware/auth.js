const jwt = require('jsonwebtoken');
const config = require('config');

//the following only pertains to protected routes
//next moves onto the next piece of middleware
module.exports = function(req, res, next){

    //get token from header
    //you can get .header from the req object being passed through the function
    // x-auth-token is the key to the token
    const token = req.header('x-auth-token');

    //check if not token
    if(!token){
        return res.status(401).json({
            
        
            msg:'No token, authorization denied'

        });
    }

    try{
        //stores payload in the variable decoded
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        //assign user to request object
        //when middleware is called itll have the verified token in the user object
        req.user = decoded.user;
        next();
    }
    catch (err) {
        res.status(401).json({msg: 'Token is not valid'});
    }

}