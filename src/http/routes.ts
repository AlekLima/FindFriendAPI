import { FastifyInstance } from 'fastify'
import { registerOrg } from './controllers/registerOrgs'
import { registerPet } from './controllers/registerPets'
import { authenticate } from './controllers/authenticateOrg'

export async function appRoutes(app: FastifyInstance) {
    //Org
    app.post('/orgs', registerOrg )
    app.post('/session', authenticate)



    //Pet
    app.post('/pets', registerPet )
}