import { inMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-org-repository";
import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { GetOrgProfileUseCase } from "./get-org-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let orgRepository: inMemoryOrgsRepository
let sut: GetOrgProfileUseCase


describe('Get Org Profile Use Case', () => {
    beforeEach(() => {
        orgRepository = new inMemoryOrgsRepository()
        sut = new GetOrgProfileUseCase(orgRepository)
    })

    it ('should be able to get org profile', async () => {

        const createdOrg = await orgRepository.create({
            email: 'johndoe@example.com',
            city: 'Fortaleza',
            password_hash: await hash('123456',6),
            description: 'blablalba',
            phone: '8599643848',
            latitude:  -3.702784,
            longitude: -38.6433024
        })

        const { org } = await sut.execute({
            orgId: createdOrg.id,
        })

        expect(org.email).toEqual('johndoe@example.com')
    })
})