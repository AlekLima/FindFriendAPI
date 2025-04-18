import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchNearbyOrgsUseCase } from '@/use-cases/factories/make-fetch-nearby-orgs-use-case'

export async function nearby (request: FastifyRequest, reply: FastifyReply) {
    const nearbyOrgsQuerySchema = z.object({
        latitude: z.coerce.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine((value) => {
            return Math.abs(value) <= 180
        }),
    })

    const { latitude, longitude } = 
    nearbyOrgsQuerySchema.parse(request.query)

    const fetchNearbyOrgsUseCase = makeFetchNearbyOrgsUseCase()

    const { orgs } = await fetchNearbyOrgsUseCase.execute({
        orgLatitude: latitude,
        orgLongitude: longitude,
    })

    return reply.status(201).send({
        orgs,
    })
}