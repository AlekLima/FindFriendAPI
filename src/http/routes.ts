import { FastifyInstance } from 'fastify'
import { registerOrg } from './controllers/registerOrgs'
import { registerPet } from './controllers/registerPets'
import { authenticate } from './controllers/authenticateOrg'
import { profile } from './controllers/profile'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
    //Org
    app.post('/orgs', registerOrg )
    app.post('/session', authenticate)

    //** Authenticated */
    app.get('/me',{ onRequest: [verifyJWT] } ,profile)



    //Pet
    app.post('/pets', registerPet )
}