import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function create (request: FastifyRequest, reply: FastifyReply) {
    const createCheckInParamsSchema = z.object ({
        orgId: z.string().uuid(),
    })

    const createCheckInBodySchema = z.object({
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180
        }),
    })

    const { orgId } = createCheckInParamsSchema.parse(request.params)
    const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

    const checkInUseCase = makeCheckInUseCase()


    //may break 
    await checkInUseCase.execute({
        petId: request.user.sub,
        orgId,
        orgLatitude: latitude,
        orgLongitude: longitude,
    })

    return reply.status(201).send()
}