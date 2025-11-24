"use client"

import { LogoutButton } from "./logout"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const Page =  () => {
  
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const {data} = useQuery(trpc.getWorkflows.queryOptions())

  const testAi = useMutation(trpc.testAi.mutationOptions({
    onSuccess: () => {
      toast.success("Job Queued")
    }
  }))

  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      // queryClient.invalidateQueries(trpc.getWorkflows.queryOptions())
      toast.success("Job Queued")
    }
  }))

  return ( 
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      Protected client component
      <div>
        {JSON.stringify(data)}
      </div>
      <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
        Test AI
      </Button>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create Workflow
      </Button>
      <LogoutButton />
    </div> 
  )
}

export default Page