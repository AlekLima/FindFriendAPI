import { expect, describe, it, beforeEach } from 'vitest'
import { inMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { SearchOrgUseCase } from './search-org'

let orgsRepository: inMemoryOrgsRepository
let sut: SearchOrgUseCase

describe('Search Orgs Use Case', () => {
    beforeEach(async () => {
        orgsRepository = new inMemoryOrgsRepository()
        sut = new SearchOrgUseCase(orgsRepository)
    })

    it('should be able to search for gyms', async() => {
        await orgsRepository.create({
            email: 'OrgPetLivre@example.com',
            city: 'Fortaleza',
            password_hash: '123456',
            description: 'blablalba',
            phone: '8599643848',
            latitude:  -3.702784,
            longitude: -38.6433024
        })

        await orgsRepository.create({
            email: 'OrgPetPreso@example.com',
            city: 'Fortaleza',
            password_hash: '123456',
            description: 'blablalba',
            phone: '8599643848',
            latitude:  -3.702784,
            longitude: -38.6433024
        })

        const { orgs } = await sut.execute({
            query: 'OrgPetLivre@example.com',
            page: 1,
        })

        expect(orgs).toHaveLength(1)
        expect(orgs).toEqual([expect.objectContaining({ email: 'OrgPetLivre@example.com' })])

    })

    it('should be able to fetch paginated orgs search', async () => {
        for (let i = 1; i <= 22; i++) {
            await orgsRepository.create({
                email: `OrgPetLivre@example.com ${i}`,
                city: 'Fortaleza',
                password_hash: '123456',
                description: 'blablalba',
                phone: '8599643848',
                latitude:  -3.702784,
                longitude: -38.6433024
            })
        }

        const { orgs } = await sut.execute({
            query: 'OrgPetLivre@example.com',
            page: 2
        })

        expect(orgs).toHaveLength(2)
        expect(orgs).toEqual([
            expect.objectContaining({ email: 'OrgPetLivre@example.com 21' }),
            expect.objectContaining({ email: 'OrgPetLivre@example.com 22' })
        ])
    })
})