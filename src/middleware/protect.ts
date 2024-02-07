import jwt from "jsonwebtoken";
import { Response } from "express";
import { User } from '../entity/User'

export const protect = async (req: any, res: Response, next: any) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];
            // Verify token
            const decoded: any = jwt.verify(token, 'secret');
            // Get user from the token
            req.user = await User.findByPk(decoded.id, {
                attributes: { exclude: ["password"] },
            });
            next();
        } catch (error) {
            console.log(error);
            return res.status(401).json({ message: "Not authorized" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};
