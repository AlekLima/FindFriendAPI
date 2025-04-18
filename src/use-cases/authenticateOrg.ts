import { OrgsRepository } from "@/repositories/orgs-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { Org } from "@prisma/client";
import { compare } from "bcryptjs";

interface AuthenticateOrgUseCaseRequest {
    email:string
    password: string
}

interface AuthenticateOrgUseCaseResponse {
    org: Org
}

export class AuthenticateOrgUseCase {
    constructor(
        private orgRepository: OrgsRepository,
    ) {}

    async execute({
        email,
        password
    }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
        const org = await this.orgRepository.findByEmail(email)

        if (!org) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, org.password_hash)

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError()
        }

        return {
            org,
        }
    }
}