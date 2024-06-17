import { expect, it, describe, beforeEach } from 'vitest'
import { RegisterOrgsUseCase } from './registerOrgs'
import { compare } from 'bcryptjs'
import { inMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists'

let orgRepository: inMemoryOrgsRepository
let sut: RegisterOrgsUseCase



describe('Register Org Use Case', () => {
    beforeEach(() => {
        orgRepository = new inMemoryOrgsRepository()
        sut = new RegisterOrgsUseCase(orgRepository)
    })

    it('should be able to register', async () => {
       
        const { org } = await sut.execute({
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
       

        const { org } = await sut.execute({
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
       

        const email = 'johndoe@example.com'

        await sut.execute({
            city: 'Fortaleza',
            email,
            password: '123456',
            description: 'blablalba',
            phone: '8599643848',
            latitude:  -3.702784,
            longitude: -38.6433024
        })

        await expect (() =>
        sut.execute({
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
