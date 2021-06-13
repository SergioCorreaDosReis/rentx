import { ICreateUsersDTO } from "../dtos/ICreateUsersDTO";
import { User } from "../infra/typeorm/entities/User";
// import {Users} from "../modules/accounts/entities/Users";

interface IUsersRepository {
	create(data: ICreateUsersDTO): Promise<void>;
	findByEmail(email: string): Promise<User>;
	finById(id: string): Promise<User>;
}

export { IUsersRepository };
