import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { registerPetsUseCase } from '@/use-cases/registerPets'

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
        await registerPetsUseCase({
            name,
            characteristics,
            description,
        })
    } catch (err) {
        return reply.status(409).send()
    }
        return reply.status(201).send()
}