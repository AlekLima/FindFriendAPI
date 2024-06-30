import fastify from "fastify";
import { ZodError } from 'zod';
import { appRoutes } from "./http/routes";
import { env } from './env'
import fastifyJwt from "@fastify/jwt";


export const app = fastify()

app.register(appRoutes)

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
})

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation error.', issues: error.format() })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error)
    } else {
        //To do: JUST GONNA STAND AND HEAR MY CRY? 
    }

    return reply.status(500).send({ message: 'Internal server error.' })
})


//ORM - Object Relational MapperS