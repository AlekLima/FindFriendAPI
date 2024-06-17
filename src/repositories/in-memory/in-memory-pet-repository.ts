import { Pet, Prisma} from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export class inMemoryPetsRepository implements PetsRepository {
    public items: Pet[] = []

    async findById(id: string) {
        const pet = this.items.find((item) => item.id === id)

        if (!pet) {
            return null
        }

        return pet
    }


    async create(data: Prisma.PetCreateInput) {
        const pet = {
            id: 'pet-1',
            name: data.name,
            description: data.description,
            characteristics: data.characteristics,
            created_at: new Date()        
        }

        this.items.push(pet)

        return pet
    }
}