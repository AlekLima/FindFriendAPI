import { FastifyInstance } from 'fastify'
import { registerOrg } from './controllers/registerOrgs'
import { registerPet } from './controllers/registerPets'
import { authenticate } from './controllers/authenticateOrg'
import { profile } from './controllers/profile'
import { verifyjwt } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
    //Org
    app.post('/orgs', registerOrg )
    app.post('/session', authenticate)

    //** Authenticated */
    app.get('/me',{ onRequest: [verifyjwt] } ,profile)



    //Pet
    app.post('/pets', registerPet )
}