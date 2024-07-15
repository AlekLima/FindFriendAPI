import { FastifyInstance } from "fastify";
import { registerOrg } from './registerOrgs'
import { authenticate } from "./authenticateOrg";
import { profile } from "./profile";
import { verifyjwt } from "@/http/middlewares/verify-jwt";

export async function orgsRoutes(app: FastifyInstance) {
    app.post('/orgs', registerOrg)
    app.post('/session', authenticate)


    /**Authenticated */
    app.get('/me', { onRequest: [verifyjwt] } , profile )
}