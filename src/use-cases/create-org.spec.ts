import { inMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-org-repository";
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateOrgUseCase } from "./create-org";

let orgsRepository: inMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
    beforeEach(() => {
        orgsRepository = new inMemoryOrgsRepository()
        sut = new CreateOrgUseCase(orgsRepository)
    })

    it('should be able to create gym', async () => {

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
})