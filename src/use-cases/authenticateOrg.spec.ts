import { inMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-org-repository";
import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateOrgUseCase } from "./authenticateOrg";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let orgRepository: inMemoryOrgsRepository
let sut: AuthenticateOrgUseCase


describe('Authenticate Org Use Case', () => {

    beforeEach(() => {
        orgRepository = new inMemoryOrgsRepository()
        sut = new AuthenticateOrgUseCase(orgRepository)
    })

    it('should be ablew to authenticate', async () => {
        const orgRepository = new inMemoryOrgsRepository()
        const sut = new AuthenticateOrgUseCase(orgRepository)

        await orgRepository.create({
            email: 'johndoe@gmail.com',
            password_hash:  await hash('123456', 6),
            city: 'Fortaleza',
            latitude: -3.702784,
            longitude: -38.6433024,
            phone: '8599643848'    
        })

        const { org } = await sut.execute({
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        expect(org.id).toEqual(expect.any(String))
    })
    
    it ('should not be able to authenticate with wrong email', async() => {
        const orgRepository = new inMemoryOrgsRepository()
        const sut = new AuthenticateOrgUseCase(orgRepository)

       

        expect ( sut.execute({
            email: 'johndoe@gmail.com',
            password: '12345789',
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
      })

    it ('should not be able to authenticate with wrong password', async() => {
        const orgRepository = new inMemoryOrgsRepository()
        const sut = new AuthenticateOrgUseCase(orgRepository)

        await orgRepository.create({
            email: 'johndoe@gmail.com',
            password_hash:  await hash('123456', 6),
            city: 'Fortaleza',
            latitude: -3.702784,
            longitude: -38.6433024,
            phone: '8599643848'    
        })

        expect ( sut.execute({
            email: 'johndoe@gmail.com',
            password: '12345789',
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
      })
})