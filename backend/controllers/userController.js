const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const crypto = require('crypto');

require('dotenv').config();

const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN;

const saltRounds = 10;

var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d65f193806db84",
    pass: "64a6057853a503"
  }
});

const getAllUsers = async (req, res) => { 
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addUser = async (req, res) => { 
  try {
    // Get the details from the request body
    const { user_name, email, password, is_verified = false } = req.body;
    
    // Check if the necessary fields are provided
    if (!user_name || !email || !password) {
      return res.status(400).json({ error: 'User name, email, and password are required' });
    }
    
    // Hash the password
    const password_hash = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Now use the hashed password and other details to create a new user
    const user = await userModel.addUser({ user_name, email, password_hash ,is_verified});
    
    res.status(201).json({ id: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const updateUser = async (req, res) => { 
  try {
    await userModel.updateUser(req.params.id, req.body);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => { 
  try {
    await userModel.deleteUser(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { user_name, email, password ,is_verified = false} = req.body;
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const user = await userModel.addUser({ user_name, email, password_hash, is_verified });
    console.log('User ID after creation:', user);

    // Assign a default role to a new user (1 is the role_id for the 'user' role)
    await userModel.assignRoleToUser(user, 1);
    
    const token = jwt.sign({ id: user }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(token)

    // Send welcome email using nodemailer
    await transporter.sendMail({
      from: '"Steamify" <no-reply@steamify.com>', 
      to: req.body.email, 
      subject: "Welcome to Steamify!",
      text: "Unlimited hours of watching your favorite shows. Please verify your account at : ",
    });
    
    // Set a cookie with the JWT
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // set to true in production, requires https
      maxAge: 3600000, // 1 hour, adjust as necessary
      sameSite: 'Strict', // protection against CSRF attacks
    });
    
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const login = async (req, res) => {
  try {
    const user = await userModel.getUserByEmail(req.body.email);
    console.log('User:', user);
    if (user && await bcrypt.compare(req.body.password, user.password_hash)) {
      console.log(user.user_id);
      const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      const token2 = jwt.sign({ test: "hello world" }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log(token);
      console.log(token2);
      // Get user roles
      const roles = await userModel.getUserRolesByUserId(user.id);

      res.status(200).json({ token, roles });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const isUsernameTaken = async (req, res) => {
  try {
    const isTaken = await userModel.isUsernameTaken(req.params.username);
    res.status(200).json({ isTaken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserRoles = async (req, res) => {
  try {
    const roles = await userModel.getUserRolesByUserId(req.params.id);
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const assignRoleToUser = async (req, res) => {
  try {
    await userModel.assignRoleToUser(req.params.userId, req.body.roleId);
    res.status(200).json({ message: 'Role assigned successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const initiatePasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(`Received email: ${email}`); // Debugging line

    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).send('No user associated with that email.');
    }
    console.log(`User found: ${JSON.stringify(user)}`); // Debugging line

    const resetToken = await userModel.createResetToken(user.user_id);
    console.log(`Reset token created: ${resetToken}`); // Debugging line

    const resetUrl = `${FRONTEND_DOMAIN}/password-change?token=${resetToken}`;  // replace with your frontend domain
    const emailContent = `To reset your password, click <a href="${resetUrl}">here</a>`;

    // ... send the email using nodemailer
    const emailResult = await transporter.sendMail({
      to: email,
      subject: 'Steamify Password Reset',
      html: emailContent,
    });
    console.log(`Email sent: ${JSON.stringify(emailResult)}`); // Debugging line

    res.status(200).send('Password reset link sent.');
  } catch (error) {
    console.error(`Error: ${error.message}`); // Debugging line
    res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    const userId = await userModel.getUserIdByResetToken(resetToken);
    if (!userId) {
      return res.status(400).send('Invalid or expired reset token.');
    }

    const passwordHash = await bcrypt.hash(newPassword, saltRounds);
    await userModel.updateUser(userId, { password_hash: passwordHash });

    await userModel.invalidateResetToken(resetToken);

    res.status(200).send('Password reset successful.');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  register,
  login,
  isUsernameTaken,
  getUserRoles, 
  assignRoleToUser, 
  initiatePasswordReset,
  resetPassword,
};
