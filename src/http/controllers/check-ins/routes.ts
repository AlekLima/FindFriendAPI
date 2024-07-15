import { FastifyInstance } from 'fastify'
import { verifyjwt } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { validate } from './validate'
import { history } from './history'
import { metrics } from './metrics'

export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyjwt)

    app.get('/check-ins/history', history)
    app.get('/check-ins/metrics', metrics)

    app.post('/orgs/:orgId/check-ins', create)
    app.patch('/check-ins/:checkInId/validate', validate)
}