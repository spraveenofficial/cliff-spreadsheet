import Users from "../models/auth.js"
import TokenService from "../services/token-services.js";
import dbServices from "../services/db-services.js";
// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public

const register = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return next(new Error("Please fill all the fields", 400));
        }
        const user = await Users.create({ username, password });
        res.status(201).json({
            success: true,
            message: "Signup successful",
            data: {
                ...user._doc,
                subscriptions: [],
            },
            token: TokenService.generateAuthToken(user._id),
        });
    } catch (error) {
        // Check if user is already registered with same username
        if (error.code === 11000) {
            return next(new Error("User Already Exist", 401));
        }
        return next(new Error(error.message, 500));
    }
}

// @desc    Login user
// @route   POST /api/v1/auth/register
// @access  Public

const login = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return next(new Error("Please fill all the fields", 400));
    }
    try {
        const user = await Users.findOne({ username }).select("-__v -updatedAt");
        if (!user) {
            return next(new Error("User Not Found", 404));
        }
        // Match Password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new Error("Invalid Password", 401));
        }
        const subscriptions = await dbServices.getUserSubscriptions(user.id);
        return res.status(200).json({
            success: true,
            message: "Successfully logged in",
            data: {
                ...user._doc,
                subscriptions,
            },
            token: TokenService.generateAuthToken(user._id),
        });
    } catch (error) {
        return next(new Error(error.message, 500));
    }
}

// @desc    Check Username Availability
// @route   POST /api/v1/auth/username
// @access  Public

const checkUsername = async (req, res, next) => {
    const { username } = req.body;
    if (!username) {
        return next(new Error("Please fill all the fields", 400));
    }
    try {
        const regex = /^[a-zA-Z0-9]+$/;
        if (!regex.test(username)) {
            return next(new Error("Username should not contain any special characters"));
        }
        const user = await Users.findOne({ username });
        if (user) {
            return next(new Error("Username already taken", 401));
        }
        return res.status(200).json({
            success: true,
            message: "Username available",
        });
    } catch (error) {
        return next(new Error(error.message, 500));
    }
}


// @desc    Load Profile
// @route   GET /api/v1/auth/profile
// @access  Private

const getProfile = async (req, res, next) => {
    const { id } = req.user;
    try {
        const user = await Users.findById(id).select("-password -__v -updatedAt");
        if (!user) {
            return next(new Error("User Not Found", 404));
        }
        const userSubscriptions = await dbServices.getUserSubscriptions(user.id);
        return res.status(200).json({
            success: true,
            message: "Profile loaded",
            data: {
                ...user._doc,
                subscriptions: userSubscriptions,
            }
        });
    } catch (error) {
        return next(new Error(error.message, 500));
    }
}


export { register, login, checkUsername, getProfile };