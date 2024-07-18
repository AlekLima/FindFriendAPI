import request from 'supertest'
import { FastifyInstance } from 'fastify'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
    await request(app.server).post('/orgs')
    .send({
        email: 'johndoe@example.com',
        city: 'Fortaleza',
        password: '123456',
        description: 'blablalba',
        phone: '8599643848',
        latitude:  -3.702784,
        longitude: -38.6433024
    })
    
    const authResponse = await request(app.server).post('/session')
        .send({
            email: 'johndoe@example.com',
            password: '123456',
        })

    const { token } = authResponse.body

    return { 
        token,
    }
}