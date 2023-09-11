
const jwt = require("jsonwebtoken");
const CreateAsyncError = require("../CreateAsyncError");

const verifyToken = (req, res, next) => {

  const authHeader = req.headers.authorization;
  
  const token = authHeader && authHeader.split(" ")[1];

    const SECRET_KEY = process.env.SECRET_KEY;
 
    if (!token) {
   
      return next(CreateAsyncError(401, " authenticated failed."));
    }
    
    jwt.verify(token, SECRET_KEY, (err, payload) => {
      if (err) {
    
        return next(CreateAsyncError(403, "Token is not valid."));
      }
      
      req.userId = payload.id;
      
      next();
    });
  };
  
module.exports = verifyToken;

