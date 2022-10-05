import Users from "../models/auth.js"
import Subscription from "../models/subscriptions.js"
import googleServices from "../services/google-services.js";
import dbServices from "../services/db-services.js";
// @desc    Add Google Account
// @route   POST /api/v1/google/add
// @access  Private

const addGoogleAccount = async (req, res, next) => {
    const { id } = req.user;
    try {
        const user = await Users.findById(id);
        if (!user) {
            return next(new Error("User Not Found", 404));
        }
        return res.status(200).json({
            success: true,
            message: "You are ready to add your google account",
            data: await googleServices.getAuthUrl()
        })
    } catch (error) {
        return next(new Error(error.message, 500));
    }
}


// @desc    Google Callback
// @route   POST /api/v1/google/callback
// @access  Private

const googleCallback = async (req, res, next) => {
    const { id } = req.user;
    const { code } = req.query;
    try {
        const user = await Users.findById(id);
        if (!user) {
            return next(new Error("User Not Found", 404));
        }
        const { tokens, data } = await googleServices.googleCallBack(code);
        const { email, name, picture } = data;
        const subscription = await Subscription.findOne({ email, userId: id });
        if (subscription) {
            return next(new Error("You have already added this account", 400));
        }
        const googleData = {
            email,
            name,
            picture,
            ...tokens,
        }
        const newSubscription = await Subscription.create({ userId: id, ...googleData });
        return res.status(200).json({
            success: true,
            message: "Google Account Added Successfully",
            data: newSubscription,
        })
    } catch (error) {
        return next(new Error(error.message, 500));
    }
}


// @desc    Remove Google Account
// @route   POST /api/v1/google/remove
// @access  Private

const removeGoogleAccount = async (req, res, next) => {
    const { id } = req.user;
    const { email } = req.body;
    try {
        const user = await Users.findById(id);
        if (!user) {
            return next(new Error("User Not Found", 404));
        }
        const subscription = await Subscription.findOne({ email, user: id });
        if (!subscription) {
            return next(new Error("You have not added this account", 400));
        }
        await dbServices.removeTrackings(email, user.id);
        await subscription.remove();
        return res.status(200).json({
            success: true,
            message: "Account Removed Successfully",
        })
    } catch (err) {
        return next(new Error(err.message, 500));
    }
}

export { addGoogleAccount, googleCallback, removeGoogleAccount }