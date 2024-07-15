import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchOrgCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-org-check-ins-historyt-use-case'

export async function history (request: FastifyRequest, reply: FastifyReply) {
    const checkInHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
    })

    const { page } =
    checkInHistoryQuerySchema.parse(request.query)

    const fetchOrgCheckInsHistoryUseCase = makeFetchOrgCheckInsHistoryUseCase()

    const { checkIns } = await fetchOrgCheckInsHistoryUseCase.execute({
        petId: request.user.sub,
        page
    })

    return reply.status(201).send({
        checkIns,
    })
}