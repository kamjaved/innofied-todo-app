const User = require('../model/user')
const jwt = require('jsonwebtoken')
const { promisify } = require('util');
const bcrypt = require('bcrypt')

//REGISTER A NEW USER

exports.signup = async (req, res, next) => {
    const newUser = await User.create(req.body);

    res.json({ newUser })
    next();

    // JWT TOKEN GENERATION
    const payload = {
        user: {
            id: user.id
        }
    };

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN },
        (err, token) => {
            if (err) throw err;
            res.json({ token })
        }
    )

}


// --LOGIN USER----

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    //1. Check if email and password exist
    if (!email || !password) {
        res.json({ Error: "Please provide email and password!" });
    }

    //2. check if user exist and password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.json({ Error: "Incorrect email or password" });
    }

    //3. if everything is ok, send token to client

    const payload = {
        user: {
            id: user._id
        }
    };

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '10d' },
        (err, token) => {
            if (err) throw err;
            res.json({ token });

        }
    );
};



exports.protect = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {

        res.json({ Error: "You are not logged in! Please login to get access" });
    }
    //2. Verification of the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //3. Check if user still exists
    const currentUser = await User.findById(decoded.user.id);

    if (!currentUser) {

        res.json({ Error: "The user belonging to this token does no longer exist" });

    }
    //GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
};
