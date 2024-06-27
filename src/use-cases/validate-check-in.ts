import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/check-ins-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { getDistanceBetweenCoordenates } from '@/utils/get-distance-between-coordenates'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-in'
import { MaxDistanceError } from './errors/max-distance-error'

interface ValidateCheckInUseCaseRequest {
    checkInId: string
}

interface ValidateCheckInUseCaseResponse {
    checkIn: CheckIn
}

export class ValidateCheckInUseCase {
    constructor(private checkInsRepository: checkInsRepository) {}

    async execute({
        checkInId,
    }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
        const checkIn = await this.checkInsRepository.findById(checkInId)

        if (!checkIn) {
            throw new ResourceNotFoundError()
        }

        checkIn.validated_at = new Date()

        await this.checkInsRepository.save(checkIn)

        return {
            checkIn,
        }
    }
}