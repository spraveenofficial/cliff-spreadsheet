import jwt from "jsonwebtoken";

class TokenServices {
    generateAuthToken(id) {
        const token = jwt.sign({id}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        return token;
    }
}


export default new TokenServices();