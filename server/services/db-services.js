import Subscriptions from "../models/subscriptions.js";
class SubscriptionDB {
    constructor() {
        this.Subscriptions = Subscriptions;
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
}


export default new SubscriptionDB();