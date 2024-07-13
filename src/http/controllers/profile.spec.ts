import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('Profile (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get Org profile', async () => {
        await request(app.server).post('/orgs')
        .send({
            email: 'e@example.com',
            city: 'Fortaleza',
            password: '1234567',
            description: 'blablalba',
            phone: '8599643848',
            latitude:  -3.702784,
            longitude: -38.6433024
        })

        const authResponse = await  request(app.server).post('/session')
        .send({
            email: 'e@example.com',
            password: '1234567'
        })

        const { token } = authResponse.body

        const profileResponse = await request(app.server)
        .get('/me')
        .set('Authorization', `Bearer ${token}`)
        .send()

        expect(profileResponse.statusCode).toEqual(200)
        expect(profileResponse.body.org).toEqual(
            expect.objectContaining({
                email: 'e@example.com'
            }),
        )
    })
})