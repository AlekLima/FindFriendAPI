import { CheckInRepository } from '@/repositories/check-ins-repository'

interface GetOrgMetricsUseCaseRequest {
    orgId: string
}

interface GetOrgMetricsUseCaseResponse {
    checkInsCount: number
   
}


export class GetOrgMetricsUseCase {
    constructor(private checkInsRepository: CheckInRepository,) {}

    async execute({
        orgId,
    }: GetOrgMetricsUseCaseRequest): Promise<GetOrgMetricsUseCaseResponse> {
        const checkInsCount = await this.checkInsRepository.countByOrgId(orgId)

        return { 
            checkInsCount,
         }
    }
}