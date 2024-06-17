import { expect, it, describe } from 'vitest'
import { RegisterPetsUseCase } from './registerPets'
import { compare } from 'bcryptjs'
import { inMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { beforeEach } from 'node:test'


let petRepository: inMemoryPetsRepository
let sut: RegisterPetsUseCase


describe('Register Pet Use Case', () => {
    beforeEach(() => {
        petRepository = new inMemoryPetsRepository ()
        sut = new RegisterPetsUseCase(petRepository)
    })

    it('should register Pet', async () => {
        
        


        const { pet } = await sut.execute({
            name: '0',
            characteristics: 'mofongo',
            description: 'blablalba',    
        })

        
        await expect(pet.id).toEqual(expect.any(String))
    })
})
