import { google } from 'googleapis'
import Users from "../models/auth.js"
import Subscription from "../models/subscriptions.js"
import Tracking from '../models/trackings.js';
import googleServices from '../services/google-services.js';


// @desc    Get Each Account Sheets
// @route   POST /api/v1/sheets/data
// @access  Private

const getEachAccountSheets = async (req, res, next) => {
    const { id } = req.user;
    const { email } = req.body;
    try {
        const user = await Users.findById(id);
        if (!user) {
            return next(new Error("User Not Found", 404));
        }
        var subscription = await Subscription.findOne({ userId: user._id, email });
        if (!subscription) {
            return next(new Error("You are not subscribed", 401));
        }
        const oAuth2Client = await googleServices.OauthClient(subscription);
        const drive = google.drive({ version: 'v3', auth: oAuth2Client });
        // Get all files who is belongs to that user and is a spreadsheet public and shared with that user
        const files = await drive.files.list({
            q: "mimeType='application/vnd.google-apps.spreadsheet'",
            fields: 'files(id, name, createdTime, modifiedTime, webViewLink, iconLink, thumbnailLink)',
        });
        if (files.data.files.length === 0) {
            return next(new Error("No files found", 404));
        }
        const sheetsData = await Promise.all(files.data.files.map(async (file) => {
            const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });
            const sheetsResponse = await sheets.spreadsheets.get({
                spreadsheetId: file.id,
                includeGridData: true,
                fields: 'sheets.properties.title',
            });
            return {
                id: file.id,
                name: file.name,
                createdTime: file.createdTime,
                modifiedTime: file.modifiedTime,
                webViewLink: file.webViewLink,
                iconLink: file.iconLink,
                thumbnailLink: file.thumbnailLink,
                sheets: sheetsResponse.data.sheets.map((sheet) => sheet.properties.title)
            }
        }));
        return res.status(200).json({
            success: true,
            message: "Files fetched successfully",
            data: sheetsData
        });
    } catch (err) {
        return next(new Error(err.message, 500));
    }
}

// @desc    Add Tracking for each sheet
// @route   POST /api/v1/sheets/add
// @access  Private

const addTracking = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { email, sheetId, sheetName, spreadsheetName } = req.body;
        const user = await Users.findById(id);
        if (!user) {
            return next(new Error("User Not Found", 404));
        }
        const subscription = await Subscription.findOne({ userId: user._id, email });
        if (!subscription) {
            return next(new Error("You are not subscribed", 401));
        }
        const tracking = await Tracking.findOne({ userId: user._id, email, sheetId, sheetName });
        if (tracking) {
            return next(new Error("Already tracking", 400));
        }
        // Check if that sheet is belongs to that user
        const oAuth2Client = await googleServices.OauthClient(subscription);
        const drive = google.drive({ version: 'v3', auth: oAuth2Client });
        const files = await drive.files.list({
            q: "mimeType='application/vnd.google-apps.spreadsheet'",
            fields: 'files(id, name, createdTime, modifiedTime, webViewLink, iconLink, thumbnailLink, owners, permissions, shared)',
        });
        const file = files.data.files.find((file) => file.id === sheetId);
        if (!file) {
            return next(new Error("Sheets not found", 404));
        }
        // const isShared = file.permissions?.find((permission) => {
        //     if (permission.type === "user" && permission.emailAddress === email) {
        //         return true;
        //     }
        //     if (permission.type === "anyone" && permission.role === "reader") {
        //         return true;
        //     }
        //     if (permission.type === "user" && permission.role === "reader" && permission.emailAddress === email) {
        //         return true;
        //     }
        //     return false;
        // });
        // if (!isShared) {
        //     return next(new Error("Sheet is not public", 401));
        // }
        const trackingData = await Tracking.create({
            userId: user._id,
            email,
            sheetId,
            sheetName,
            spreadsheetName
        });

        return res.status(200).json({
            success: true,
            message: "Tracking added successfully",
            data: trackingData
        });
    } catch (err) {
        return next(new Error(err.message, 500));
    }
}

// @desc    Get 
// @route   POST /api/v1/sheets/trackings
// @access  Private

const getAllTracking = async (req, res, next) => {
    try {
        const { id } = req.user;
        const user = await Users.findById(id);
        if (!user) {
            return next(new Error("User Not Found", 404));
        }
        const tracking = await Tracking.find({ userId: user._id });
        if (tracking.length === 0) {
            return next(new Error("No trackings found", 404));
        }
        const trackingData = await Promise.all(tracking.map(async (track) => {
            const subscription = await Subscription.findOne({ userId: user._id, email: track.email });
            if (!subscription) {
                return next(new Error("You are not subscribed", 401));
            }
            const oAuth2Client = await googleServices.OauthClient(subscription);
            const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });
            try {
                const sheetsResponse = await sheets.spreadsheets.get({
                    spreadsheetId: track.sheetId,
                    includeGridData: true,
                    fields: 'properties.title',
                });
                const sheetData = await sheets.spreadsheets.values.get({
                    spreadsheetId: track.sheetId,
                    range: `${track.sheetName}!A1:Z1000`,
                });
                const sheetUrl = `https://docs.google.com/spreadsheets/d/${track.sheetId}/edit#gid=0`;
                return {
                    id: track._id,
                    isTracking: true,
                    email: track.email,
                    spreadSheetName: sheetsResponse.data.properties.title,
                    sheetId: track.sheetId,
                    sheetName: track.sheetName,
                    columnLength: sheetData.data.values ? sheetData.data.values.length : 0,
                    sheetUrl,
                    createdAt: track.createdAt,
                }
            } catch (error) {
                return {
                    id: track._id,
                    isTracking: false,
                    email: track.email,
                    spreadSheetName: track.spreadsheetName,
                    sheetId: track.sheetId,
                    sheetName: track.sheetName,
                    columnLength: 0,
                    sheetUrl: "",
                    createdAt: track.createdAt,
                }
            }
        }));
        return res.status(200).json({
            success: true,
            message: "Tracking fetched successfully",
            data: trackingData,
        });
    } catch (err) {
        return next(new Error(err.message, 500));
    }
}

// @desc    Delete Tracking 
// @route   DELETE /api/v1/sheets/trackings:id
// @access  Private

const deleteTracking = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { trackingId } = req.params;
        const user = await Users.findById(id);
        if (!user) {
            return next(new Error("User Not Found", 404));
        }
        const tracking = await Tracking.findById(trackingId);
        if (!tracking) {
            return next(new Error("Tracking not found", 404));
        }
        await tracking.remove();
        return res.status(200).json({
            success: true,
            message: "Tracking deleted successfully",
            data: tracking,
        });
    } catch (err) {
        return next(new Error(err.message, 500));
    }
}


export { getEachAccountSheets, addTracking, getAllTracking, deleteTracking }