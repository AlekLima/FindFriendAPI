import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { RegisterOrgsUseCase } from "../registerOrgs";

export function makeRegisterOrgUseCase() {
    const orgRepository = new PrismaOrgsRepository()
    const registerOrgUseCase = new RegisterOrgsUseCase(orgRepository)

    return registerOrgUseCase
}