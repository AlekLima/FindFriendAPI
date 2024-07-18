import  request  from 'supertest'
import { describe, it } from 'vitest'
import { afterAll,beforeAll, expect } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'


describe('Register (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })
    
    it('should be able to register Org', async() => {
        const { token } = await createAndAuthenticateOrg(app)

        const response = await request(app.server)
        .post('/orgs')
        .set('Authorization', `Bearer ${token}`)
        .send({
            email: 'johndoeeee@example.com',
            city: 'Fortaleza',
            password: '1234567',
            description: 'blablalba',
            phone: '8599643848',
            latitude:  -3.702784,
            longitude: -38.6433024
        })

        expect(response.statusCode).toEqual(201)
    })
})