import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { CheckInUseCase } from "../check-in";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeCheckInUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const orgsRepository = new PrismaOrgsRepository()
    const UseCase = new CheckInUseCase(checkInsRepository, orgsRepository)

    return UseCase
}