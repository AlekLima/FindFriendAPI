import { FetchOrgCheckInsHistoryUseCase } from "../fetch-org-check-ins-history";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeFetchOrgCheckInsHistoryUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const UseCase = new FetchOrgCheckInsHistoryUseCase(checkInsRepository)

    return UseCase
}