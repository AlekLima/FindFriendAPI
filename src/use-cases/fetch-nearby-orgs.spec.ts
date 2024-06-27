import { expect, describe, it, beforeEach } from 'vitest'
import { inMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { FetchNearbyOrgsUseCase } from './fetch-nearby-org'

let orgRepository: inMemoryOrgsRepository
let sut: FetchNearbyOrgsUseCase

describe('Fetch Nearby Orgs Use Case', () => {
    beforeEach(async () => {
        orgRepository = new inMemoryOrgsRepository()
        sut = new FetchNearbyOrgsUseCase(orgRepository)
    })

    it('should be able to fetch nearby orgs', async () => {
        await orgRepository.create({
            email: 'close@email.com',
            city: 'Fortaleza',
            password_hash: '123456',
            description: 'blablalba',
            phone: '8599643848',
            latitude:  -3.7234697,
            longitude: -38.569525
        })

        await orgRepository.create({
            email: 'far@email.com',
            city: 'Fortaleza',
            password_hash: '123456',
            description: 'blablalba',
            phone: '8599643848',
            latitude:  -3.4958054,
            longitude: -39.1482525
        })

        const { orgs } = await sut.execute({
            orgLatitude: -3.7234697,
            orgLongitude:  -38.569525,
            
        })
     

        

        expect(orgs).toHaveLength(1)
        expect(orgs).toEqual([expect.objectContaining({ email: 'close@email.com' })])
    })
})