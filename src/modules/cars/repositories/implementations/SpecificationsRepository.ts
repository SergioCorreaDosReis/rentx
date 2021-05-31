import { getRepository, Repository } from "typeorm";

import { Specification } from "../../entities/Specification";
import {
    ISpecificationsRepository,
    ICreateSpecificationDTO,
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }
    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<void> {
        const specifications = this.repository.create({
            name,
            description,
        });

        await this.repository.save(specifications);
    }
    async findByName(name: string): Promise<Specification> {
        const specifications = this.repository.findOne({
            name,
        });
        return specifications;
    }
}
export { SpecificationsRepository };
