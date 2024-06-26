import { CheckInRepository } from '@/repositories/check-ins-repository'

interface GetPetMetricsUseCaseRequest {
    petId: string
}

interface GetPetMetricsUseCaseResponse {
    checkInsCount: number
}


export class GetPetMetricsUseCase {
    constructor(private checkInsRepository: CheckInRepository,) {}

    async execute({
        petId,
    }: GetPetMetricsUseCaseRequest): Promise<GetPetMetricsUseCaseResponse> {
        const checkInsCount = await this.checkInsRepository.countByPetId(petId)

        return { 
            checkInsCount,
         }
    }
}