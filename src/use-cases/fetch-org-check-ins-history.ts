import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/check-ins-repository'
import { inMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

interface FetchOrgCheckInsHistoryUseCaseRequest {
    petId: string
    page: number
}

interface FetchOrgCheckInsHistoryUseCaseResponse {
    checkIns: CheckIn[]
}

export class FetchOrgCheckInsHistoryUseCase {
     constructor(private checkInsRepository: inMemoryCheckInsRepository,) {}

     async execute({
        petId,
        page,
     }: FetchOrgCheckInsHistoryUseCaseRequest): Promise<FetchOrgCheckInsHistoryUseCaseResponse> {
        const checkIns = await this.checkInsRepository.findManyByOrgId(petId, page)


        return {
            checkIns,
        }
     }
}