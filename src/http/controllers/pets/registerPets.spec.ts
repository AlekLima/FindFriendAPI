import  request  from 'supertest'
import { describe, it } from 'vitest'
import { afterAll,beforeAll, expect } from 'vitest'
import { app } from '@/app'

describe('Register Pet (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })
    
    it('should be able to register Pet', async() => {
        const response = await request(app.server)
        .post('/pets')
        .send({
            name:  'Roberto',
            characteristics: 'Legalzão',
            description: 'Pastor Alemão',
        })

        expect(response.statusCode).toEqual(201)
    })
})