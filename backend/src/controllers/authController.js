const User = require("../models/User");
const Role = require("../models/Role");
const { generateToken } = require("../services/authService");
const { sendVerificationEmail } = require("../services/emailService");
const { generateVerificationToken } = require("../services/tokenService");

// Register User
exports.register = async (req, res) => {
    const { fullName, username, email, password } = req.body;
    const name = fullName;
    console.log(req.body);
    console.log("name=>",name);  

    try {
      // Check if user already exists
      const existingUserByEmail = await User.findOne({ email });
      if (existingUserByEmail) {
        return res.status(400).json({ message: "Email already Exist" });
      }

      const existingUserByUsername = await User.findOne({ username });
      if (existingUserByUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }

      // Create new user
      const user = new User({ name, username, email, password });
      await user.save();
      
      // Generate verification token
      const verificationToken = generateVerificationToken(user.email);

      // Generate verification URL
      const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

      // Send verification email
      await sendVerificationEmail(user.email, verificationUrl);

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed', error });
    }
};



// Login User
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = generateToken(user);
        res.status(200).json({ token });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed', error });
    }
};