import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { registerOrgsUseCase } from '@/use-cases/registerOrgs'

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
        await registerOrgsUseCase({
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