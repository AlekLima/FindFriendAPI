import { Prisma, CheckIn } from '@prisma/client'
import { randomUUID } from 'crypto'
import { CheckInRepository } from '../check-ins-repository'
import  dayjs  from 'dayjs'

export class inMemoryCheckInsRepository implements CheckInRepository {
    public items: CheckIn[] = []

    async findByOrgIdOnDate(orgId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkOnSameDate = this.items.find((checkIn) => {
            const checkInDate = dayjs(checkIn.created_at)
            const isOnSameDate = 
            checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

            return checkIn.org_id === orgId && isOnSameDate
        })

        if (!checkOnSameDate) {
            return null
        }

        return checkOnSameDate
    }

    async findById(id: string) {
        const checkIn = this.items
        .find((item) => item.id === id)

        if (!checkIn) {
            return null
        }

        return checkIn
    }

    async save(checkIn: CheckIn) {
        const checkInIndex = this.items.findIndex(item => item.id === checkIn.id)

        if (checkInIndex >= 0) {
            this.items[checkInIndex] = checkIn
        }

        return checkIn
    }

    async countByPetId(petId: string) {
        return this.items
        .filter((item) => item.pet_id === petId).length
    }

    async countByOrgId(orgId: string) {
        return this.items
        .filter((item) => item.pet_id === orgId).length
    }

    async findManyByOrgId(petId: string, page: number) {
        return this.items
        .filter((checkIn) => checkIn.pet_id === petId)
        .slice((page -1) * 20, page * 20)
    }

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            pet_id: data.pet_id,
            org_id: data.org_id,
            validated_at: data.validated_at? new Date(data.validated_at): null,
            created_at: new Date()
        }

        this.items.push(checkIn)

        return checkIn
    }
}