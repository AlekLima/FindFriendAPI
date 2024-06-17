import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticateOrgUseCase } from "../authenticateOrg";

export function makeAuthenticateOrgUseCase() {
    const orgRepository = new PrismaOrgsRepository()
    const authenticateOrgUseCase = new AuthenticateOrgUseCase(orgRepository)

    return authenticateOrgUseCase
}