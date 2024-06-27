import {CheckIn, Prisma } from '@prisma/client'

export interface CheckInRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    countByPetId(petId: string): Promise<number>
    save(checkIn: CheckIn): Promise<CheckIn>
    findById(id: string): Promise<CheckIn | null>
    findManyByOrgId(orgId: string, page: number): Promise<CheckIn[]>
    findByOrgIdOnDate(orgId: string, date: Date): Promise <CheckIn | null>
}