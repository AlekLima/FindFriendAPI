import { Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface FetchNearbyOrgsUseCaseRequest {
    orgLatitude: number
    orgLongitude: number
}

interface FetchNearbyOrgsUseCaseResponse {
    orgs: Org[]
}

export class FetchNearbyOrgsUseCase {
    constructor(private orgRepository: OrgsRepository) {}

    async execute({
        orgLatitude,
        orgLongitude,
    }:FetchNearbyOrgsUseCaseRequest): Promise <FetchNearbyOrgsUseCaseResponse> {
        
        const orgs = await this.orgRepository.findManyNearby({
            latitude: orgLatitude,
            longitude: orgLongitude,
        })

       


        return {
            orgs,
        }
    }
}