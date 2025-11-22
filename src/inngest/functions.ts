import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {

    // scrape data
    await step.sleep("scraping...", "5s");

    // arrange data in order
    await step.sleep("arranging...", "5s");

    // paginate data
    await step.sleep("paginating...", "5s");

    await step.run("create worflow", () => {
        return prisma.workflow.create({
            data: {
                name: "workflow-from-inngest"
            }
        })
    })

    return { message: `Hello ${event.data.email}!` };
  },
);