import { expect, describe, it, beforeEach } from "vitest";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { inMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { inMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-org-repository";

let checkInsRepository: inMemoryCheckInsRepository
let sut:ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
    beforeEach(() => {
        checkInsRepository = new inMemoryCheckInsRepository()
        sut = new ValidateCheckInUseCase(checkInsRepository)
    })

    it('should be able to validate the check-in', async () => {
        const createdCheckIn = await checkInsRepository.create({
            org_id: 'org-01',
            pet_id: 'pet-01'
        })

        const { checkIn } = await sut.execute({
            checkInId:createdCheckIn.id
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
    })

    it('should not be able to validate an inexistent check-in', async () => {
        await expect(() => sut.execute({
            checkInId:'inexistent-check-in-id'
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})