import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from 'bcryptjs'
import { CheckIn } from '@prisma/client'
import { CheckInRepository } from "@/repositories/check-ins-repository";

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
        private checkInsRepository: CheckInRepository) {}

    async execute({
        petId,
        orgId,
    }: CheckInUseCaseRequest): Promise <CheckInUseCaseResponse> {
        const checkInOnSameDay = await this.checkInsRepository.findByOrgIdOnDate(
            orgId,
            new Date(),
        )

        if (checkInOnSameDay) {
            throw new Error()
        }

        const checkIn = await this.checkInsRepository.create({
            pet_id: petId,
            org_id: orgId,
            
        })

        return {
            checkIn,
        }
    } 
}

