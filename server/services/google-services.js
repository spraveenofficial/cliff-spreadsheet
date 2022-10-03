import { google } from 'googleapis';
class GoggleServices {
    constructor() {
        this.name = this;
        this.google = google;
        this.client = new this.google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URL
        );
        this.scopes = [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
            // Access Google sheets
            // 'https://www.googleapis.com/auth/spreadsheets.readonly',
            // Access Google drive
            'https://www.googleapis.com/auth/drive',
        ];


    }
    async getAuthUrl() {
        return this.client.generateAuthUrl({
            access_type: 'offline',
            scope: this.scopes,
            prompt: 'consent',
        });
    }
    async googleCallBack(queryParams) {
        const { tokens } = await this.client.getToken(queryParams);
        this.client.setCredentials(tokens);
        const oauth2 = this.google.oauth2({
            auth: this.client,
            version: 'v2'
        });
        const { data } = await oauth2.userinfo.get();
        return { data, tokens };

    }
}



export default new GoggleServices();