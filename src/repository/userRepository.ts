import { User } from "../entity/User";
export class UserRepository {

  public getAll = async (): Promise<any> => {
    return await User.findAll();
  };

  public findUserById = async (id: string): Promise<any> => {
    return await User.findByPk(id);
  };

  public createUser = async (userData: any): Promise<any> => {
    return await User.create(userData);
  };

  public getUserByEmail = async (email: string): Promise<any> => {
    return await User.findOne({ where: { email } });
  }

  public getPoints = async (id: string): Promise<any> => {
    return await User.findByPk(id, { attributes: ['points'] });
  }



}
