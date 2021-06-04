import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/file";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    user_id: string;
    avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository") // passa o nome colocado no container no index.ts
        private userRepository: IUsersRepository
    ) {}

    async execute({ user_id, avatarFile }: IRequest): Promise<void> {
        const user = await this.userRepository.finById(user_id);

        if (user.avatar) {
            await deleteFile(`./tmp/avatar/${user.avatar}`);
        }
        user.avatar = avatarFile;

        await this.userRepository.create(user);
    }
}

export { UpdateUserAvatarUseCase };
