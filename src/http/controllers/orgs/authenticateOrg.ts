import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeAuthenticateOrgUseCase } from '@/use-cases/factories/make-authenticate-org-use-case'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

export async function authenticate (request: FastifyRequest, reply:FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { email, password  } = authenticateBodySchema.parse(request.body)

    try {
        const authenticateOrgUseCase = makeAuthenticateOrgUseCase()

        const { org } = await authenticateOrgUseCase.execute({
            email,
            password,
        })

        const token = await reply.jwtSign(
            {},
            {
            sign: {
                sub:org.id,
            },
          },
        )

        return reply.status(200).send({
            token,
        })

    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message   })
        }

        throw err
    }

        
}