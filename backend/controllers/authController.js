import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const genToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) {
        return res.status(400).json({ message: 'Email already in use' });
    }

    const user = await User.create({ 
                                    username, 
                                    email, 
                                    password 
                                   });
    return res.status(201).json({ 
        token: genToken(user._id), 
        user: { 
                id: user._id, 
                email: user.email, 
                username: user.username 
              } 
            });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    return res.json({ 
        token: genToken(user._id), 
        user: { 
                id: user._id, 
                email: user.email, 
                username: user.username 
               } 
        });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}