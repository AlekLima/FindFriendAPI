import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetOrgMetricsUseCase } from '@/use-cases/factories/make-get-org-profile-use-case'

export async function metrics (request: FastifyRequest, reply: FastifyReply) {
    const getOrgMetricsUseCase = makeGetOrgMetricsUseCase()

    const { checkInsCount } = await getOrgMetricsUseCase.execute({
        orgId: request.user.sub
    })

    return reply.status(201).send({
        checkInsCount,
    })
}