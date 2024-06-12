import { hash } from 'bcryptjs'
import { Org } from '@prisma/client'
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

interface RegisterOrgsUseCaseResponse {
    org: Org
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

    }: RegisterOrgsUseCaseRequest): Promise <RegisterOrgsUseCaseResponse> {

    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgRepository.findByEmail(email)

    if (orgWithSameEmail) {
        throw new OrgAlreadyExistsError()
    }


    const org = await this.orgRepository.create({
        email,
        city,
        password_hash,
        phone,
        latitude,
        longitude,
        description,
    })

    return {
        org,
    }
  }
}