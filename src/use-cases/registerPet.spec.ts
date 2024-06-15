import { expect, it, describe } from 'vitest'
import { RegisterPetsUseCase } from './registerPets'
import { compare } from 'bcryptjs'
import { inMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pet-repository'



describe('Register Pet Use Case', () => {
    it('should register Pet', async () => {
        
        const petRepository = new inMemoryPetsRepository ()
        const registerPetUseCase = new RegisterPetsUseCase(petRepository)


        const { pet } = await registerPetUseCase.execute({
            name: '0',
            characteristics: 'mofongo',
            description: 'blablalba',    
        })

        
        await expect(pet.id).toEqual(expect.any(String))
    })
})
