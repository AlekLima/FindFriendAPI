import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetOrgProfileUseCase } from '@/use-cases/factories/make-get-org-use-case-metrics'



export async function profile(request: FastifyRequest, reply: FastifyReply) {

    const getOrgProfile = makeGetOrgProfileUseCase()

    const { org } = await getOrgProfile.execute({
        orgId: request.user.sub,
    })

    return reply.status(200).send({
        org: {
            ...org,
            password_hash: undefined,
        }
    })
} 