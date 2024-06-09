import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterPetsUseCaseRequest {
    name:              string;
    characteristics:   string;
    description:       string;
}


export async function registerPetsUseCase({
    name,
    characteristics,
    description,
}: RegisterPetsUseCaseRequest) {

    await prisma.pet.create({
        data: {
            name,
            characteristics,
            description,
        }
    })
}