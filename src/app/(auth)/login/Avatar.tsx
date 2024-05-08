import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
export default function AvatarDemo(){
    return (
        <>
              <Avatar>
          <AvatarImage />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        
        </>
      
      )
}