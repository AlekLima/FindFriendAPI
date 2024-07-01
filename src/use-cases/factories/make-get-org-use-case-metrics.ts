import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { GetOrgProfileUseCase } from "../get-org-profile";

export function makeGetOrgProfileUseCase() {
    const orgRepository = new PrismaOrgsRepository()
    const UseCase = new GetOrgProfileUseCase(orgRepository)

    return UseCase
}