import fastify from "fastify";
import { PrismaClient } from '@prisma/client'

export const app = fastify()

const prisma = new PrismaClient()

prisma.org.create({
    data: {
        email: 'alekteles@gmail.com',
        city: 'Fortaleza',
        password:'1234567',
        latitude: '-3.7366387',
        longitude:'-38.5389083',
    },
})

//ORM - Object Relational Mapper