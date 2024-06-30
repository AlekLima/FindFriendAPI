import { GetPetMetricsUseCase } from "../get-pet-metric";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeGetPetMetricsUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const UseCase = new GetPetMetricsUseCase(checkInsRepository)

    return UseCase
}