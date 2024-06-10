import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterOrgsUseCase } from '@/use-cases/registerOrgs'

export async function registerOrg (request: FastifyRequest, reply: FastifyReply) {
    const  registerOrgBodySchema = z.object({
        email: z.string().email(),
        city: z.string(),
        password: z.string().min(6),
        phone: z.string(),
        latitude: z.number(),
        longitude: z.number(),
        description: z.string(),
    })

    const {
        email,
        city,
        password,
        phone,
        latitude,
        longitude,
        description
     } = registerOrgBodySchema.parse(request.body)

    try {
        const OrgsRepository = new PrismaOrgsRepository()
        const registerOrgsUseCase = new RegisterOrgsUseCase(OrgsRepository)

        await registerOrgsUseCase.execute({
            email,
            city,
            password,
            phone,
            latitude,
            longitude,
            description
        })
    } catch (err) {
        return reply.status(409).send()
    }
        return reply.status(201).send()
}