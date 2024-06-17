import { prisma } from "@/lib/prisma";
import { Prisma, Pet } from "@prisma/client"
import { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
    async findById(id: string): Promise<Pet | null> {
        throw new Error('Method not implemented')
    }

    async create(data: Prisma.PetCreateInput) {
        const pet = await prisma.pet.create({
            data,
        })

        return pet
    }
}