import { expect, describe, it, beforeEach, } from 'vitest'
import { inMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { inMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { FetchOrgCheckInsHistoryUseCase } from './fetch-org-check-ins-history'

let checkInsRepository: inMemoryCheckInsRepository
let orgRepository: inMemoryOrgsRepository
let sut: FetchOrgCheckInsHistoryUseCase

describe('Fetch Org Check-in History Use Case', () => {
    beforeEach(async () => {
        checkInsRepository = new inMemoryCheckInsRepository()
        orgRepository = new inMemoryOrgsRepository
        sut = new FetchOrgCheckInsHistoryUseCase(checkInsRepository)
    })


    it('should be able to fetch check-in', async () => {
        await checkInsRepository.create({
            org_id: 'org-01',
            pet_id: 'pet-01'
        })

        await checkInsRepository.create({
            org_id: 'org-02',
            pet_id: 'pet-01'
        })

        const { checkIns } = await sut.execute({
            petId: 'pet-01',
            page: 1,
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ org_id: 'org-01' }),
            expect.objectContaining({ org_id: 'org-02' })
        ])
    })

    it('should be able to fetch paginated check-in history', async () => {
        for (let i = 1; i <= 22; i++) {
            await checkInsRepository.create({
                org_id: `org-${i}`,
                pet_id: 'pet-01'
            })
        }

        const { checkIns } = await sut.execute({
            petId: 'pet-01',
            page: 2
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ org_id: 'org-21' }),
            expect.objectContaining({ org_id: 'org-22' })
        ])
    })
})