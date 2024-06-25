/**
 * v0 by Vercel.
 * @see https://v0.dev/t/qCS9S8LF1lV
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup } from "@/components/ui/select"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Create New Box</CardTitle>
        <CardDescription>Enter the details for your new box.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Box Name</Label>
            <Input id="name" placeholder="Enter box name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="branch">Branch</Label>
            <Select>
              <SelectTrigger id="branch">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent position="popper" className="max-h-[200px] overflow-auto">
                <SelectGroup>
                  <Command>
                    <CommandInput placeholder="Search branches..." className="h-9 px-4" />
                    <CommandList>
                      <CommandEmpty>No branches found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem value="main">Main</CommandItem>
                        <CommandItem value="develop">Develop</CommandItem>
                        <CommandItem value="feature/new-design">Feature/new-design</CommandItem>
                        <CommandItem value="hotfix/bug-fix">Hotfix/bug-fix</CommandItem>
                        <CommandItem value="release/v1.0">Release/v1.0</CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit">Create Box</Button>
      </CardFooter>
    </Card>
  )
}