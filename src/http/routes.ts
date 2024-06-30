import { FastifyInstance } from 'fastify'
import { registerOrg } from './controllers/registerOrgs'
import { registerPet } from './controllers/registerPets'
import { authenticate } from './controllers/authenticateOrg'
import { profile } from './controllers/profile'

export async function appRoutes(app: FastifyInstance) {
    //Org
    app.post('/orgs', registerOrg )
    app.post('/session', authenticate)

    //** Authenticated */
    app.get('/me', profile)



    //Pet
    app.post('/pets', registerPet )
}