import {CheckIn, Prisma } from '@prisma/client'

export interface CheckInRepository {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findManyByOrgId(orgId: string, page: number): Promise<CheckIn[]>
    findByOrgIdOnDate(orgId: string, date: Date): Promise <CheckIn | null>
}