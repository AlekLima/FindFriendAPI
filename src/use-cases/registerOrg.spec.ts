import { expect, it, describe } from 'vitest'
import { RegisterOrgsUseCase } from './registerOrgs'
import { compare } from 'bcryptjs'



describe('Register Org Use Case', () => {
    it('should hash org password upon registration', async () => {
        
        const registerOrgUseCase = new RegisterOrgsUseCase({
            async findByEmail(email) {
                return null
            },

            async create(data) {
                return {
                    id:'user-1',
                    email: data.email,
                    city: data.city,
                    password_hash: data.password_hash,
                    description: data.description,
                    phone: data.phone,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    created_at: new Date()   
                }
            },
            
        })

        const { org } = await registerOrgUseCase.execute({
            email: 'johndoe@example.com',
            city: 'Fortaleza',
            password: '123456',
            description: 'blablalba',
            phone: '8599643848',
            latitude:  -3.702784,
            longitude: -38.6433024
        })

        const isPasswordCorrectlyHashed = await compare(
                '123456',
                org.password_hash,
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })
})
