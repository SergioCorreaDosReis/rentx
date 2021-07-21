import { ICreateUsersTokenDTO } from "../dtos/ICreateUsersTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokensRepository {
	create({
		user_id,
		expires_date,
		refresh_token,
	}: ICreateUsersTokenDTO): Promise<UserTokens>;
}

export { IUsersTokensRepository };
