import { FastifyInstance } from "fastify";
import { registerOrg } from './registerOrgs'
import { authenticate } from "./authenticateOrg";
import { profile } from "./profile";
import { search } from "./search";
import { nearby } from "./nearby";
import { verifyjwt } from "@/http/middlewares/verify-jwt";

export async function orgsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyjwt)

    app.get('/org/search', search)
    app.get('/orgs/nearby', nearby)

    app.post('/orgs', registerOrg)
    app.post('/session', authenticate)


    /**Authenticated */
    app.get('/me', { onRequest: [verifyjwt] } , profile )
}