import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateOrgUseCase } from '@/use-cases/authenticateOrg'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

export async function authenticate (request: FastifyRequest, reply:FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { email, password  } = authenticateBodySchema.parse(request.body)

    try {
        const orgRepository = new PrismaOrgsRepository()
        const authenticateOrgUseCase = new AuthenticateOrgUseCase(orgRepository)

        await authenticateOrgUseCase.execute({
            email,
            password,
        })
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message   })
        }

        throw err
    }

        return reply.status(200).send()
}