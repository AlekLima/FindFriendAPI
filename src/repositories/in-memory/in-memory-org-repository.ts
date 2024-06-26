import { Org, Prisma} from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'crypto'

export class inMemoryOrgsRepository implements OrgsRepository {
    public items: Org[] = []

    async findById(id: string) {
        const org = this.items.find((item) => item.id === id)

        if (!org) {
            return null
        }

        return org
    }

    async findByEmail(email: string) {
        const org = this.items.find(item => item.email === email)

        if (!org) {
            return null
        }

        return org
    }

    async searchMany(query: string, page: number) {
        return this.items
            .filter((item) => item.email.includes(query))
            .slice((page - 1) * 20, page * 20)

    }

    async create(data: Prisma.OrgCreateInput) {
        const org = {
            id: 'user-1',
            email: data.email,
            city: data.city,
            password_hash: data.password_hash,
            description: data.description,
            phone: data.phone,
            latitude:  data.latitude,
            longitude: data.longitude,
            created_at: new Date()        
        }

        this.items.push(org)

        return org
    }
}