import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetProfileUseCase } from "../get-pet-profile";

export function makeGetPetProfileUseCase() {
    const petRepository = new PrismaPetsRepository()
    const UseCase = new GetPetProfileUseCase(petRepository)

    return UseCase
}