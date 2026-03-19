import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { logger } from './logging'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prismaClient = new PrismaClient({ 
  adapter,
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'warn',
    },
     {
      emit: 'event',
      level: 'info',
    }
  ]
})

prismaClient.$on("query", (e) => {
  logger.info(`Query: ${e.query}`)
})

prismaClient.$on("error", (e) => {
  logger.error(`Error: ${e.message}`)
})

prismaClient.$on("warn", (e) => {
  logger.warn(`Warning: ${e.message}`)
})

prismaClient.$on("info", (e) => {
  logger.info(`Info: ${e.message}`)
})

export default prismaClient
