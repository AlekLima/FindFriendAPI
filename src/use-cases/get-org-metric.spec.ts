import { expect, describe, it, beforeEach } from 'vitest'
import { inMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetOrgMetricsUseCase } from './get-org-metric'

let checkInsRepository: inMemoryCheckInsRepository
let sut: GetOrgMetricsUseCase

describe('Get pet Metrics use Case', () => {
    beforeEach(async () => {
        checkInsRepository = new inMemoryCheckInsRepository()
        sut = new GetOrgMetricsUseCase(checkInsRepository)
    })

    it('should be able to get check-ins count from metrics', async () => {
        await checkInsRepository.create({
            org_id: 'org-01',
            pet_id: 'pet-01'
        })

        await checkInsRepository.create({
            org_id: 'org-02',
            pet_id: 'pet-01'
        })

        const { checkInsCount } = await sut.execute({
            orgId: 'pet-01',
        })

        expect(checkInsCount).toEqual(2)
    })
})