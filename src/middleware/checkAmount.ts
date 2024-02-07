import { User } from "../entity/User";
import { Response } from "express";

const checkAmount = async (req: any, res: Response, next: any) => {

const user:any = await User.findOne({ where: { id: req.user.id } });
console.log(user.points);
console.log(req.body.amount);
    if (user.points < req.body.amount) {
        console.log('Not enough points');
        res.status(400).json({ message: 'Not enough points' });
        return;
    }
    next();
}

export default checkAmount;