import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    // 1. Extract the token from the request headers
    const { token } = req.headers;

    // 2. If no token is provided, block the request
    if (!token) {
        return res.json({ success: false, message: "Not authorized log again" });
    }

    try {
        // 3. Decode the token using the secret key from your .env file
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        // 4. Extract the user ID from the decoded token and attach it to the request body
        req.body.userId = token_decode.id;
        
        // 5. Pass control to the next middleware or controller function
        next();
        
    } catch (error) {
        // 6. If the token is invalid or expired, return an error
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export default authMiddleware;


