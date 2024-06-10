import { prisma } from '@/lib/prisma'
import { PetsRepository } from '@/repositories/pets-repository'


interface RegisterPetsUseCaseRequest {
    name:              string;
    characteristics:   string;
    description:       string;
}


export class RegisterPetsUseCase {
    constructor(private petRepository: PetsRepository) {}

    async execute ({
    name,
    characteristics,
    description,
    
}: RegisterPetsUseCaseRequest) {
    
    await this.petRepository.create({
        name,
        characteristics,
        description,     
    })
  }
}