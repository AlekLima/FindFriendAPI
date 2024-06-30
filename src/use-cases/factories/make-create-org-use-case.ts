import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { CreateOrgUseCase } from "../create-org";

export function makeCreateOrgUseCase() {
    const orgRepository = new PrismaOrgsRepository()
    const UseCase = new CreateOrgUseCase(orgRepository)

    return UseCase
}