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