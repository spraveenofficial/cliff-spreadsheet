import Subscriptions from "../models/subscriptions.js";
import Tracking from "../models/trackings.js";
class SubscriptionDB {
    constructor() {
        this.Subscriptions = Subscriptions;
        this.Tracking = Tracking;
    }
    async updateAccessToken(email, tokens) {
        const { access_token, scope, token_type, expiry_date, id_token } = tokens;
        return await this.Subscriptions.findOneAndUpdate({ email }, {
            access_token,
            scope,
            token_type,
            expiry_date,
            id_token
        }, { new: true });
    }

    
    async getUserSubscriptions(userId) {
        return await this.Subscriptions.find({ userId }).select("name email picture createdAt");
    }

    
    async removeTrackings(email, userId) {
        return await this.Tracking.deleteMany({ email, userId });
    }
}


export default new SubscriptionDB();