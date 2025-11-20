import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { requireAuth } from "@/lib/auth-utils"
import { caller } from "@/trpc/server"
import { LogoutButton } from "./logout"

const Page = async () => {
  // Makes this page protected, but should be rely for better user experience
  // Inorder for better protection it is always better to use 
  // trpc protected procedure on data access layer

  await requireAuth()
 
  const data = await caller.getUsers()

  return ( 
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      Protected server component
      <div>
        {JSON.stringify(data)}
      </div>
      <LogoutButton />
    </div> 
  )
}

export default Page