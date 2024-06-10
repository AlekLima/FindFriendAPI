import { prisma } from '@/lib/prisma'
import { PrismaPetsRepository } from '@/repositories/prisma-pets-repository'


interface RegisterPetsUseCaseRequest {
    name:              string;
    characteristics:   string;
    description:       string;
}


export class RegisterPetsUseCase {
    constructor(private petRepository: any) {}

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