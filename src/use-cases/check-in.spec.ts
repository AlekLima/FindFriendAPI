import { expect, describe, it, beforeEach } from 'vitest'
import { inMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

let checkInsRepository: inMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
    beforeEach(() => {
        checkInsRepository = new inMemoryCheckInsRepository()
        sut = new CheckInUseCase(checkInsRepository)
    })

    it ('should be able to check-in', async () => {
        const { checkIn } = await sut.execute({
            orgId: 'org-01',
            petId: 'pet-01',
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})