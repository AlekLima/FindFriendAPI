import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from 'bcryptjs'
import { CheckIn } from '@prisma/client'
import { CheckInRepository } from "@/repositories/check-ins-repository";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordenates } from "@/utils/get-distance-between-coordenates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-in";

interface CheckInUseCaseRequest {
    petId: string
    orgId: string
    orgLatitude: number
    orgLongitude: number
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase { 
    constructor(
        private checkInsRepository: CheckInRepository,
        private orgsRepository: OrgsRepository,
    ) {} 


    async execute({
        petId,
        orgId,
        orgLatitude,
        orgLongitude,
    }: CheckInUseCaseRequest): Promise <CheckInUseCaseResponse> {
        const org = await this.orgsRepository.findById(orgId)

        if (!org) {
            throw new ResourceNotFoundError()
        }

        const distance = getDistanceBetweenCoordenates(
            { latitude: orgLatitude, longitude: orgLongitude },
            {
                latitude: org.latitude.toNumber(),
                longitude: org.longitude.toNumber(),
            },
        )

        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if (distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new MaxDistanceError()
        }

        const checkInOnSameDay = await this.checkInsRepository.findByOrgIdOnDate(
            orgId,
            new Date(),
        )

        if (checkInOnSameDay) {
            throw new MaxNumberOfCheckInsError()
        }

        const checkIn = await this.checkInsRepository.create({
            org_id: orgId,
            pet_id: petId,
        })

        return {
            checkIn,
        }
    } 
}

