import { SearchOrgUseCase } from "../search-org";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";

export function makeSearchOrgUseCase() {
    const orgRepository = new PrismaOrgsRepository()
    const UseCase = new SearchOrgUseCase(orgRepository)

    return UseCase
}