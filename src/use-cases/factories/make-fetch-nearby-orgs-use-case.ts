import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { FetchNearbyOrgsUseCase } from "../fetch-nearby-org";

export function makeFetchNearbyOrgsUseCase() {
    const orgRepository = new PrismaOrgsRepository()
    const UseCase = new FetchNearbyOrgsUseCase(orgRepository)

    return UseCase
}