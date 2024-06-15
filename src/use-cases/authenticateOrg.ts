import { OrgsRepository } from "@/repositories/orgs-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateOrgUseCaseRequest {
    email:string
    password: string
}

type AuthenticateOrgUseCaseResponse = void

export class AuthenticateOrgUseCase {
    constructor(
        private orgRepository: OrgsRepository,
    ) {}

    async execute({
        email,
        password
    }: AuthenticateOrgUseCaseRequest): Promise <AuthenticateOrgUseCaseResponse> {
        const org = await this.orgRepository.findByEmail(email)

        if (!org) {
            throw new InvalidCredentialsError()
        }
    }
}