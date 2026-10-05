import jwt from "jsonwebtoken";

//it is a middleware to verify the token sent by the client in the request header. If the token is valid, it allows the request to proceed to the next middleware or route handler. If the token is invalid or missing, 
// it sends an error response.
export const verifyToken = (req, res, next) => {
    //the cookie sent by browser when we hit '/check-auth' route, is stored in req.cookies object. So we can access the token from req.cookies.token
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Access Denied. No token provided." });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.status(400).json({ message: "Invalid token." });
        req.userId = verified.userId;
        //if the token is valid we call next(),
        //in userRouter router.get('/check-auth', verifyToken, checkAuth);
        //when verifyToken calls next(), it will call checkAuth function in userController.js
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }

}