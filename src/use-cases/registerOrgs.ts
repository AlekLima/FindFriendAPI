import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { PrismaOrgsRepository } from '@/repositories/prisma-orgs-repository'


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
    constructor(private orgRepository: any) {}
    
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

    const orgWithSameEmail = await prisma.org.findUnique({
        where: {
            email,
        },
    })

    if (orgWithSameEmail) {
        throw new Error('E-mail already exists')
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