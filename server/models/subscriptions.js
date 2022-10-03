import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'Authentication',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        access_token: {
            type: String,
            required: true,
        },
        refresh_token: {
            type: String,
            required: true,
        },
        scope: {
            type: String,
            required: true,
        },
        expiry_date: {
            type: Number,
            required: true,
        },
        id_token: {
            type: String,
            required: true,
        }
    },
    {
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
    }
)

const SubscriptionModel = mongoose.model("Subscriptions", SubscriptionSchema);


export default SubscriptionModel;
