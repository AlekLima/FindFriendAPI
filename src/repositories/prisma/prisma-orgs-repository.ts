import { prisma } from "@/lib/prisma";
import { Prisma, Org } from "@prisma/client"
import { OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
    async findById(id: string): Promise<Org | null> {
        throw new Error('Method not implemented.')
    }

    async findByEmail(email: string) {
        const org = await prisma.org.findUnique({
            where: {
                email,
            }
        })

        return org
    }

    async create(data: Prisma.OrgCreateInput) {
        const org = await prisma.org.create({S
            data,
        })

        return org
    }
}