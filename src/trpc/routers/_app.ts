import { inngest } from '@/inngest/client';
import { createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { email } from 'zod';


// data access layer
export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(async ({ctx}) => {
      return prisma.workflow.findMany()
    }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "test@gmail.com"
      }
    })  

      return {
        success: true,
        message: "Job Queued"
      }
  })  
});
// export type definition of API
export type AppRouter = typeof appRouter;