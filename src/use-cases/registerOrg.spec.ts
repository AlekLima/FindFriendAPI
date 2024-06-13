import { expect, it, describe } from 'vitest'
import { RegisterOrgsUseCase } from './registerOrgs'
import { compare } from 'bcryptjs'
import { inMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists'



describe('Register Org Use Case', () => {
    it('should be able to register', async () => {
        const orgRepository = new inMemoryOrgsRepository()
        const registerOrgUseCase = new RegisterOrgsUseCase(orgRepository)
       

        const { org } = await registerOrgUseCase.execute({
            email: 'johndoe@example.com',
            city: 'Fortaleza',
            password: '123456',
            description: 'blablalba',
            phone: '8599643848',
            latitude:  -3.702784,
            longitude: -38.6433024
        })

        expect(org.id).toEqual(expect.any(String))
    })

    it ('should hash org password upon registration', async () => {
        const orgRepository = new inMemoryOrgsRepository()
        const registerOrgUseCase = new RegisterOrgsUseCase(orgRepository)

        const { org } = await registerOrgUseCase.execute({
            email: 'johndoe@example.com',
            city: 'Fortaleza',
            password: '123456',
            description: 'blablalba',
            phone: '8599643848',
            latitude:  -3.702784,
            longitude: -38.6433024
        })
        

        const isPasswordCorrectlyHashed = await compare (
            '123456',
            org.password_hash,
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        const orgRepository = new inMemoryOrgsRepository()
        const registerOrgUseCase = new RegisterOrgsUseCase(orgRepository)

        const email = 'johndoe@example.com'

        await registerOrgUseCase.execute({
            city: 'Fortaleza',
            email,
            password: '123456',
            description: 'blablalba',
            phone: '8599643848',
            latitude:  -3.702784,
            longitude: -38.6433024
        })

        expect (() =>
        registerOrgUseCase.execute({
            city: 'Fortaleza',
            email,
            password: '123456',
            description: 'blablalba',
            phone: '8599643848',
            latitude:  -3.702784,
            longitude: -38.6433024
        }),
        ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
    })
})
