import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"; 
import { RegisterPetsUseCase } from "../registerPets";

export function makeRegisterPetUseCase() {
    const petRepository = new PrismaPetsRepository()
    const registerPetUseCase = new RegisterPetsUseCase(petRepository)

    return registerPetUseCase
}