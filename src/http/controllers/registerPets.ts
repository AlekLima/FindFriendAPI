import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'

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
        const registerPetUseCase = makeRegisterPetUseCase()

        await registerPetUseCase.execute({
            name,
            characteristics,
            description,
        })
    } catch (err) {
        return reply.status(409).send()
    }
        return reply.status(201).send()
}