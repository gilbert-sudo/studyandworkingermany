const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let clientId;
    let isUnique = false;
    // Generate a unique 4-character clientId
    while (!isUnique) {
      clientId = crypto.randomBytes(2).toString('hex').toUpperCase();
      const existingId = await User.findOne({ clientId });
      if (!existingId) {
        isUnique = true;
      }
    }

    const newUser = new User({ name, clientId, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET || 'secret123', {
      expiresIn: '1h'
    });

    res.status(201).json({ 
      message: 'User created successfully',
      token,
      user: { id: newUser._id, clientId: newUser.clientId, name: newUser.name, email: newUser.email, hasCompletedVocationalTest: newUser.hasCompletedVocationalTest, vocationalTestResults: newUser.vocationalTestResults }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during signup' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret123', {
      expiresIn: '1h'
    });

    res.json({ 
      message: 'Logged in successfully',
      token,
      user: { id: user._id, clientId: user.clientId, name: user.name, email: user.email, hasCompletedVocationalTest: user.hasCompletedVocationalTest, vocationalTestResults: user.vocationalTestResults }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
};
