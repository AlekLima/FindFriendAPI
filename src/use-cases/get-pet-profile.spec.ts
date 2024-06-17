import { inMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { expect, describe, it, beforeEach } from 'vitest'
import { GetPetProfileUseCase } from "./get-pet-profile";

let petRepository: inMemoryPetsRepository
let sut: GetPetProfileUseCase


describe('Get Pet Profile Use Case', () => {
    beforeEach(() => {
        petRepository = new inMemoryPetsRepository()
        sut = new GetPetProfileUseCase(petRepository)
    })

    it ('should be able to get pet profile', async () => {

        const createdPet = await petRepository.create({
            name: '0',
            characteristics: 'mofongo',
            description: 'blablalba',   
        })

        const { pet } = await sut.execute({
            petId: createdPet.id,
        })

        expect(pet.characteristics).toEqual('mofongo')
    })
})