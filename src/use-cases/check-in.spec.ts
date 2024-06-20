import { expect, describe, it, vi, afterEach , beforeEach } from 'vitest'
import { inMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { inMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: inMemoryCheckInsRepository
let orgsRepository: inMemoryOrgsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
    beforeEach(() => {
        checkInsRepository = new inMemoryCheckInsRepository()
        orgsRepository = new inMemoryOrgsRepository
        sut = new CheckInUseCase(checkInsRepository, orgsRepository)

        orgsRepository.items.push({
            id: 'org-01',
            email: 'johndoe@example.com',
            city: 'Fortaleza',
            password_hash: '123456',
            description: 'blablalba',
            phone: '8599643848',
            latitude:  new Decimal(-3.702784),
            longitude: new Decimal(-38.6433024),
        })

        vi.useFakeTimers()
    })
    
    afterEach(() => {
        vi.useRealTimers()
    })

    it ('should be able to check-in', async () => {
        
        
        const { checkIn } = await sut.execute({
            orgId: 'org-01',
            petId: 'pet-01',
            orgLatitude: -3.702784,
            orgLongitude: -38.6433024
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it ('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            orgId: 'org-01',
            petId: 'pet-01',
            orgLatitude: -3.702784,
            orgLongitude: -38.6433024
        })

        await expect (() => sut.execute({
            orgId: 'org-01',
            petId: 'pet-01',
            orgLatitude: -3.702784,
            orgLongitude: -38.6433024
        })).rejects.toBeInstanceOf(Error)
    })

    it ('should be able to check in twice in diferent days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            orgId: 'org-01',
            petId: 'pet-01',
            orgLatitude: -3.702784,
            orgLongitude: -38.6433024
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0 ,0))

        const { checkIn } = await sut.execute({
            orgId: 'org-01',
            petId: 'pet-01',
            orgLatitude: -3.702784,
            orgLongitude: -38.6433024
        })

        expect(checkIn.id).toEqual(expect.any(String))
            
    })

    it ('should not be able to check in on distant gym', async () => {
        orgsRepository.items.push({
            id: 'org-02',
            email: 'johndo@example.com',
            city: 'Fortaleza',
            password_hash: '123456',
            description: 'blablalba',
            phone: '8599643848',
            latitude:  new Decimal(-3.702784),
            longitude: new Decimal(-38.6433024),
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0 ,0))

        expect (() => sut.execute({
            orgId: 'org-02',
            petId: 'pet-02',
            orgLatitude: -27.2092052,
            orgLongitude: -49.6401091,       
        })).rejects.toBeInstanceOf(Error)
    })
})