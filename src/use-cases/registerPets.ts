import { Pet } from '@prisma/client';
import { PetsRepository } from '@/repositories/pets-repository'


interface RegisterPetsUseCaseRequest {
    name:              string;
    characteristics:   string;
    description:       string;
}

interface RegisterPetsUseCaseResponse { 
    pet: Pet
}


export class RegisterPetsUseCase {
    constructor(private petRepository: PetsRepository) {}

    async execute ({
    name,
    characteristics,
    description,
    
}: RegisterPetsUseCaseRequest): Promise <RegisterPetsUseCaseResponse> {
    
    const pet = await this.petRepository.create({
        name,
        characteristics,
        description,     
    })

    return {
        pet,
    }
  }
}