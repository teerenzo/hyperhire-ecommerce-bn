import { Request, Response } from 'express';
import { UserService } from '../service/userService';
import jwt from 'jsonwebtoken';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }


  public getUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    const user = await this.userService.getUserById(userId);
    res.json(user);
  };

  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData = req.body;
      const newUser = await this.userService.createUser(userData);
      res.json({
        message: 'User created', data: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          points: newUser.points,
          token: generateToken(newUser.id)
        }
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public userLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData = req.body;
      const user = await this.userService.login(userData);
      if (!user) {
        res.status(400).json({ message: 'Invalid login credentials' });
        return;
      }
      res.json({
        message: 'Login successful', data: {
          id: user.id,
          name: user.name,
          email: user.email,
          points: user.points,
          token: generateToken(user.id)
        }
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
      
    }
 
  }
}
function generateToken(id: any) {
  return jwt.sign({ id }, 'secret', { expiresIn: "30d" });
}

