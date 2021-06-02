import { ICreateUsersDTO } from "../dtos/ICreateUsersDTO";
// import {Users} from "../modules/accounts/entities/Users";

interface IUsersRepository {
    create(data: ICreateUsersDTO): Promise<void>;
}

export { IUsersRepository };
