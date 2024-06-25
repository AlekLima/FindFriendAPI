import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists'

interface CreateOrgUseCaseRequest {
    email:            string,
    city:             string,
    password:         string,
    description:      string,
    phone:            string,
    latitude:         number,
    longitude:        number
    
}

interface CreateOrgUseCaseResponse {
    org: Org
}

export class CreateOrgUseCase {
    constructor(private orgsRepository: OrgsRepository) {}

    async execute({
        email,
        city,
        password,
        phone,
        description,
        latitude,
        longitude,
    }: CreateOrgUseCaseRequest): Promise <CreateOrgUseCaseResponse> {

    const password_hash = await hash(password, 6)


    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
        throw new OrgAlreadyExistsError()
    }
    

    const org = await this.orgsRepository.create({
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