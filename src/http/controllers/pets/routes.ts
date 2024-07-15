import { FastifyInstance } from "fastify";
import { registerPet } from "./registerPets";

export async function petsRoutes(app: FastifyInstance) {
    app.post('/pets', registerPet)
}