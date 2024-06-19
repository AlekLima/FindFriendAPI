import { expect, describe, it, vi, afterEach , beforeEach } from 'vitest'
import { inMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

let checkInsRepository: inMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
    beforeEach(() => {
        checkInsRepository = new inMemoryCheckInsRepository()
        sut = new CheckInUseCase(checkInsRepository)
        vi.useFakeTimers()
    })
    
    afterEach(() => {
        vi.useRealTimers()
    })

    it ('should be able to check-in', async () => {
        const { checkIn } = await sut.execute({
            orgId: 'org-01',
            petId: 'pet-01',
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it ('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            orgId: 'org-01',
            petId: 'pet-01',
        })

        await expect (() => sut.execute({
            orgId: 'org-01',
            petId: 'pet-01',
        })).rejects.toBeInstanceOf(Error)
    })

    it ('should be able to check in twice in diferent days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            orgId: 'org-01',
            petId: 'pet-01',
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0 ,0))

        const { checkIn }= sut.execute({
            orgId: 'org-01',
            petId: 'pet-01'
        })

        expect(checkIn.id).toEqual(expect.any(String))
            

    })
})