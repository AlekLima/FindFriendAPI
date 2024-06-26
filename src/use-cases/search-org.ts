import { Org } from "@prisma/client";
import { OrgsRepository } from "@/repositories/orgs-repository";

interface SearchOrgUseCaseRequest {
    query: string
    page: number
}

interface SearchOrgUseCaseResponse {
    orgs: Org[]
}

export class SearchOrgUseCase {
    constructor(private orgsRepository: OrgsRepository) {}

    async execute({
        query,
        page,
    }: SearchOrgUseCaseRequest): Promise <SearchOrgUseCaseResponse> {

        const orgs = await this.orgsRepository.searchMany(query,page)

        return {
            orgs,
        }
    }
}