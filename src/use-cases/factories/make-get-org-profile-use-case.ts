import { GetOrgMetricsUseCase } from "../get-org-metric";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeGetOrgMetricsUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const UseCase = new GetOrgMetricsUseCase(checkInsRepository)

    return UseCase
}