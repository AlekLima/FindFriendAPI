import { FastifyInstance } from 'fastify'
import { registerOrg } from './controllers/registerOrgs'
import { registerPet } from './controllers/registerPets'

export async function appRoutes(app: FastifyInstance) {
    app.post('/orgs', registerOrg )
    app.post('/pets', registerPet )
}