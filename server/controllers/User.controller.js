const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CreateAsyncError = require("../CreateAsyncError");


const Register = async(req, res, next)=>{
    const Hashpassword = await bcrypt.hash(req.body.password, 5);
    if (!req.body.email || !req.body.username || !req.body.password) {
    return  res.status(400).send("Please fill in all the required fields correctly");
    }
    try {
      const ExistUser = await User.findOne({ email: req.body.email });
    if (ExistUser) {
        return res.status(403).send("user already exist");  
    }
    else{
        const NewUser = new User({ ...req.body,  password: Hashpassword });
        await NewUser.save();
        return res.status(201).send("user created successfully");
              
    }

        
    } catch (error) {
    return  next(CreateAsyncError(500,"something went wrong"))
    }
    
}

const Login = async (req, res, next) => {
  if (!req.body.email && !req.body.password ) {    
    return res.status(400).send("Please fill in all the required fields correctly");
  }

  const ExistUser = await User.findOne({ email: req.body.email });
  try {
   
    if (!ExistUser) {
      return res.status(404).send("user not found")
    } else {
      const Iscorrect = bcrypt.compareSync(req.body.password,ExistUser.password);

      if (!Iscorrect) {
        return res.status(400).send("please check password or username");
      }
    

      const token = jwt.sign({id:ExistUser._id}, process.env.SECRET_KEY)
      const { password, ...info } = ExistUser._doc;
      res.cookie("accesstoken",token,{ httpOnly:true});
      const data = { token, info };
      res.status(200).json(data);
      res.status(200).send({info,token});
    }
  } catch (error) {
    return next(CreateAsyncError(500,"something went wrong"));
  }
};




const Logout = async (req,res) => {
    try {
      res
        .clearCookie("accesstoken", {
          samesite: "none",
          secure: true,
        })
        .status(200)
        .send("user has logged out succesfully");
    } catch (err) {
      res.status(500).send(err.message)
    }
  };
  

module.exports = {Login, Register, Logout}









// const User = require("../models/Usermodel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const CreateError = require("../error/CreateError");
// const SECERET_KEY = process.env.SECERET_KEY;

//* register
// const register = async (req, res, next) => {
//   try {
//     const Hashpassword = await bcrypt.hash(req.body.password, 10);
//     const ExistUser = await User.findOne({ email: req.body.email });

   
//     if (ExistUser) {
//      return res.status(403).send("user already exist");
//     } else {
//       const NewUser = new User({
//         ...req.body,
//         password: Hashpassword,
//       });
  
//       await NewUser.save();
  
//       return res.status(201).send("user created successfully");
//     }
//   } catch (error) {
//    next(CreateError(500,error.message));
//   }
// };
// //* login
// const login = async (req, res, next) => {
//   try {
//     const ExistUser = await User.findOne({ username: req.body.username });
  
//     if (!ExistUser) {
//       return next(CreateError(404,"user not found"));
//     } else {
//       const Iscorrect = bcrypt.compareSync(req.body.password,ExistUser.password);

//       if (!Iscorrect) {
//         return next(CreateError(400,"wrong password and username"));
//       }
//       const token =   jwt.sign({id:ExistUser._id,isSeller:ExistUser.isSeller},SECERET_KEY)
//       const { password, ...info } = ExistUser._doc;
//       res.cookie("accesstoken",token,{ httpOnly:true});
//       res.status(200).send(info);
//     }
//   } catch (error) {
//     next(CreateError(500,error.message));
//   }
// };

// //logout

// const logout = async () => {
//   try {
//     res
//       .clearCookie("accesstoken", {
//         samesite: "none",
//         secure: true,
//       })
//       .status(200)
//       .send("user has logged out succesfully");
//   } catch (error) {}
// };

// module.exports = { login, logout, register };
