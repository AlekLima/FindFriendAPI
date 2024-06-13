import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { RegisterPetsUseCase } from '@/use-cases/registerPets'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PetAlreadyExistsError } from '@/use-cases/errors/pet-already-exists'

export async function registerPet (request: FastifyRequest, reply: FastifyReply) {
    const  registerPetBodySchema = z.object({
        name: z.string(),
        characteristics: z.string(),
        description: z.string(),
    })

    const {
        name,
        characteristics,
        description ,
     } = registerPetBodySchema.parse(request.body)

    try {
        const PetsRepository = new PrismaPetsRepository()
        const registerPetsUseCase = new RegisterPetsUseCase(PetsRepository)

        await registerPetsUseCase.execute({
            name,
            characteristics,
            description,
        })
    } catch (err) {
        if (err instanceof (PetAlreadyExistsError))
        return reply.status(409).send({ message: err.message  })
    }
        return reply.status(201).send()
}