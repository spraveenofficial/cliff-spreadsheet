import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TrackingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Authentication',
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    sheetId: {
        type: String,
        required: true
    },
    sheetName: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters: true,
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.updatedAt;
            return ret;
        },
    }
});

const Tracking = mongoose.model('Tracking', TrackingSchema);

export default Tracking;