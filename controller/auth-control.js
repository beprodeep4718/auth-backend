
const User = require("../models/auth-schema");


// @route POST api/auth/register
//^ Register
const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userExist = await User.find({ username });
        if (userExist.length > 0) {
          return res.status(400).json({ message: "User already exists" });
        }
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: "User created successfully" });
      } catch (error) {
        res.status(500).json({ message: "Error creating user" });
        console.log(error);
      }
}

// @route POST api/auth/login
//^ Login

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
          return res.status(400).json({ message: "User does not exist" });
        }
        
        if (user.password != password) {
          return res.status(400).json({ message: "Incorrect password" });
        }
        res.status(200).json({ message: "User logged in successfully" });
      } catch (error) {
        res.status(500).json({ message: "Error logging in user" });
        console.log(error);
      }
}

module.exports = {register, login}