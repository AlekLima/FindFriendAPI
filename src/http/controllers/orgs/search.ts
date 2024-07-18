import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeSearchOrgUseCase } from '@/use-cases/factories/make-search-orgs-use-case'

export async function search (request: FastifyRequest, reply: FastifyReply) {
    const searchOrgsQuerySchema = z.object({
        q: z.string(),
        page: z.coerce.number().min(1).default(1),
    })

    const { q, page } = 
    searchOrgsQuerySchema.parse(request.query)

    const searchOrgsUseCase = makeSearchOrgUseCase()

    const { orgs } = await searchOrgsUseCase.execute({
        query: q,
        page
    })

    return reply.status(200).send({
        orgs,
    })
}