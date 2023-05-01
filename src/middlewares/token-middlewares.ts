import jwt from "jsonwebtoken";

export default function (req:any, res:any, next:any) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(403).send("Access denied.");

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};