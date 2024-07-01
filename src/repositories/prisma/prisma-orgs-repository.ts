import { prisma } from "@/lib/prisma";
import { Prisma, Org } from "@prisma/client"
import { OrgsRepository, findManyNearbyParams } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
    async findById(id: string)  {
        const org = await prisma.org.findUnique({
            where: {
                id,
            }
        })

        return org
    }

    async findByEmail(email: string) {
        const org = await prisma.org.findUnique({
            where: {
                email,
            },
        })

        return org
    }

    async findManyNearby({ latitude, longitude }: findManyNearbyParams) {
        const orgs = await prisma.$queryRaw<Org[]>`
        SELECT * from orgs
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `

        return orgs
    }

    async searchMany(query: string, page: number) {
        const orgs =await prisma.org.findMany({
            where: {
                email: {
                    contains: query,
                },
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return orgs
    }
    
    

    async create(data: Prisma.OrgCreateInput) {
        const org = await prisma.org.create({
            data,
        })

        return org
    }
}