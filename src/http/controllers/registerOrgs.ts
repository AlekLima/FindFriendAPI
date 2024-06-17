import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org-use-case'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists'

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
        const registerOrgUseCase = makeRegisterOrgUseCase()

        await registerOrgUseCase.execute({
            email,
            city,
            password,
            phone,
            latitude,
            longitude,
            description
        })
    } catch (err) { 
        if ( err instanceof OrgAlreadyExistsError) {
            return reply.status(409).send({ message: err.message  })
        }

        throw err
    }
        return reply.status(201).send()
}