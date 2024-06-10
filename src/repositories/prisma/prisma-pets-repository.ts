import { prisma } from "@/lib/prisma";
import {Prisma, Pet } from "@prisma/client"
import { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
    async findById(id: string) {
        const pet = await prisma.pet.findUnique({
            where: {
                id,
            }
        })

        return pet
    }

    async create(data: Prisma.PetCreateInput) {
        const pet = await prisma.pet.create({
            data,
        })

        return pet
    }
}