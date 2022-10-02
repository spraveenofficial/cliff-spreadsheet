import Users from "../models/auth.js"
import TokenService from "../services/token-services.js";
import Error from "../handlers/error.js"


// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public

const register = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        console.log(req.body);
        if (!username || !password) {
            return next(new Error("Please fill all the fields", 400));
        }
        const user = await Users.create({ username, password });
        res.status(201).json({
            success: true,
            message: "Signup successful",
            data: user,
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


export { register };