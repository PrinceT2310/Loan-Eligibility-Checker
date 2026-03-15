import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// REGISTER USER:
export const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        //Validation:
        if(!name || !email || !password){
            return res.status(400).json({message : "All Feild Required"});
        }

        //Check existing User:
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User Is Already Exist"});
        }

        //hash password:
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        //Create User:
        const user = await User.create({
            name, email, password: hashpassword,
        });

        //response:
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        })

    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}



// LOGIN USER:
// export const loginUser = async (req, res) => {
//     try{
//         const {email, password} = req.body;

//         //Validation:
//         if(!email || !password){
//             return res.status(400).json({message : "All Fieled required"});
//         }

//         //Find User:
//         const user = await User.findOne({email});
//         if(!user){
//             return res.status(400).json({message: "Invalid User"});
//         }

//         //Compare Password:
//         const isMatch = await bcrypt.compare(password, user.password);
//         if(!isMatch){
//             return res.status(400).json({message: "Wrong Password"});
//         }

//         //Create Token:
//         const token = jwt.sign(
//             {id: user._id, role: user.role},
//             process.env.JWT_SECRET,
//             {expiresIn: "7D"}
//         );

//         //Response:
//         res.json({
//             message: "Login Successful",
//             token,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//             },
//         });
//     }
//     catch(error){
//         res.status(500).json({message: error.message});
//     }
// }

export const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All Field required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid User" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong Password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role   // ⭐ FIX
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
