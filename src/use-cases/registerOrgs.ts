import { hash } from 'bcryptjs'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists'


interface RegisterOrgsUseCaseRequest {

    email:            string,
    city:             string,
    password:         string,
    description:      string,
    phone:            string,
    latitude:         number,
    longitude:        number
}


export class RegisterOrgsUseCase {
    constructor(private orgRepository: OrgsRepository) {}
    
    async execute ({
        email,
        city,
        password,
        phone,
        latitude,
        longitude,
        description,

    }: RegisterOrgsUseCaseRequest) {

    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgRepository.findByEmail(email)

    if (orgWithSameEmail) {
        throw new OrgAlreadyExistsError()
    }


    await this.orgRepository.create({
        email,
        city,
        password_hash,
        phone,
        latitude,
        longitude,
        description,
    })
  }
}