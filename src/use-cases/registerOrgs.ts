import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'


interface RegisterOrgsUseCaseRequest {

    email:            string,
    city:             string,
    password:         string,
    description:      string,
    phone:            string,
    latitude:         number,
    longitude:        number
}


export async function registerOrgsUseCase({
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

    await prisma.org.create({
        data: {
            email,
            city,
            password_hash,
            phone,
            description,
            latitude,
            longitude,
        }
    })
}