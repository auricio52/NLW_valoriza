import { EntityRepository, Repository } from "typeorm";
import { Compliment } from "../database/entities/Compliment";


@EntityRepository()
class ComplimentRepository extends Repository<Compliment> {

}

export { ComplimentRepository }