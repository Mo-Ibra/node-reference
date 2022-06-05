const express = require('express');

const router = express.Router();

const db = require('../models');
const User = db.users;

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const jwtSecretKey = require('../config/jwt');
const verifyToken = require('../middlewares/auth.middleware');

/**
 * Register Route
*/
router.post('/register', async (req, res) => {

    try {

        const { firstName, lastName, email, password } = req.body;

        // Static Validation
        if (!email) {
            return res.status(400).json({ message: 'You must type your email' });
        }

        if (!password) {
            return res.status(400).json({ message: 'You must type your password' });
        }

        const findUser = await User.findOne({ where: { email: email } });

        if (findUser) {
            return res.json({ message: 'Email is already exsits.' });
        }

        const encryptedPassword = await bcrypt.hash(password.toString(), 10);

        const userData = {
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: encryptedPassword,
        }

        // Create User
        await User.create(userData).then(async user => {
            return res.status(201).json({ user });
        }).catch(err => {
            return res.status(403).json({ err: err.message });
        });
    } catch (err) {
        return res.status(403).json({ message: err.message });
    }
});

/**
 * Login Route 
*/
router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;

        // Static Validation
        if (!email) {
            return res.status(400).json({ message: 'You must type your email' });
        }

        if (!password) {
            return res.status(400).json({ message: 'You must type your password' });
        }

        const user = await User.findOne({ where: { email: email } });

        if (user) {

            const comparePassword = await bcrypt.compare(password, user.password);

            if (comparePassword) {

                const token = jwt.sign({ id: user.id, email: user.email }, jwtSecretKey, { expiresIn: '3m' });

                // Update User for add the token.
                await User.update({ token: token }, {
                    where: {
                        id: user.id
                    }
                }).then(async updated => {
                    
                    if (updated > 0) {
                        const updatedUser = await User.findOne({ where: { id: user.id } });
                        return res.status(202).json({ user: updatedUser });
                    }

                }).catch(err => res.json({ err: err.message }));

            } else {
                return res.status(400).json({ message: 'Password is wrong' });
            }

        } else {
            return res.json({ message: 'Email or password is invalid' });
        }

    } catch (err) {
        return res.status(403).json({ message: err.message });
    }
});

/**
 * Profile Route
*/
router.post('/profile', verifyToken, (req, res) => {
    const email = req.user.email;
    res.status(200).send(`Hello from your profile your email is ${email}`);
});

module.exports = router;