import { Prisma, Org } from '@prisma/client'

export interface findManyNearbyParams {
    latitude: number,
    longitude: number,
}

export interface OrgsRepository {
    findById(id: string): Promise <Org | null>
    findByEmail(email: string): Promise <Org | null>
    findManyNearby(params: findManyNearbyParams): Promise<Org[]>
    searchMany(query: string, page: number): Promise<Org[]>
    create(data: Prisma.OrgCreateInput): Promise<Org>
}