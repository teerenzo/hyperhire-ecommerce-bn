// src/service/UserService.ts
import bcrypt from "bcrypt";
import { UserRepository } from '../repository/userRepository';


export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public getAllUsers = async (): Promise<any> => {
    return this.userRepository.getAll();
  };

  public getUserById = async (id: string): Promise<any> => {
    return this.userRepository.findUserById(id);
  };

  public createUser = async (userData: any): Promise<any> => {

    // check if user already exists
    const user = await this.userRepository.getUserByEmail(userData.email);
    if (user) {
      throw new Error('User already exists');
    }
    // Hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    return this.userRepository.createUser(userData);
  }

  public login = async (userData: any): Promise<any> => {
    const user = await this.userRepository.getUserByEmail(userData.email);
    if (!user) {
      throw new Error('Invalid login credentials');
    }
    const validPassword = await bcrypt.compare(userData.password, user.password);
    if (!validPassword) {
      throw new Error('Invalid login credentials');
    }
    return user;
  }
}
