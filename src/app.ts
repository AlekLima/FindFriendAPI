import fastify from "fastify";
import { PrismaClient } from '@prisma/client'
import { z } from 'zod';
import { prisma } from '@/lib/prisma'


export const app = fastify()


//ORM - Object Relational MapperS