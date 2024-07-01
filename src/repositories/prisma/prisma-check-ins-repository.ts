import { CheckIn, Prisma } from '@prisma/client'
import { CheckInRepository } from '../check-ins-repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements CheckInRepository {
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = await prisma.checkIn.create({
            data,
        })

        return checkIn
    }
    async save(data: CheckIn) {
        const checkIn = await prisma.checkIn.update({
            where: {
                id: data.id,
            },
            data: data,
        })

        return checkIn
    }

    //May be the orgId, if error turn this to async func in orgId
    async countByPetId(petId: string) {
        const count = await prisma.checkIn.count({
            where: {
                pet_id: petId,
            },
        })

        return count
    }

    async countByOrgId(orgId: string) {
        const count = await prisma.checkIn.count({
            where: {
                org_id: orgId,
            },
        })

        return count
    }

    async findById(id: string) {
        const checkIn = await prisma.checkIn.findUnique({
            where: {
                id,
            },
        })

        return checkIn
    }

    async findManyByOrgId(orgId: string, page:number) {
        const checkIns = await prisma.checkIn.findMany({
            where: {
                org_id: orgId,
            },
            take: 20,
            skip:(page -1) * 20,
        })

        return checkIns
    }

    async findByOrgIdOnDate(orgId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkIn = await prisma.checkIn.findFirst({
            where: {
                org_id: orgId,
                created_at: {
                    gte: startOfTheDay.toDate(),
                    lte: endOfTheDay.toDate()
                }
            }
        })

        return checkIn
    }


}