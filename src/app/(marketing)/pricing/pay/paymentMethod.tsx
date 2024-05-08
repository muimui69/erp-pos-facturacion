import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroupItem, RadioGroup } from '@/components/ui/radio-group';
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Payment() {
  return (
    <Card>
    <CardHeader>
      <CardTitle>Payment Method</CardTitle>
      <CardDescription>
        Add a new payment method to your account.
      </CardDescription>
    </CardHeader>
    <CardContent className="grid gap-8">
      <RadioGroup defaultValue="card" className="flex-1">
        {/* Opción de tarjeta de crédito */}
        <Label
          htmlFor="card"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary h-full"
        >
          <RadioGroupItem value="card" id="card" className="sr-only" />
          <CreditCard className="mb-3 h-6 w-6" />
          Card
        </Label>
      </RadioGroup>
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="First Last" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="number">Card number</Label>
        <Input id="number" placeholder="" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="month">Expires</Label>
          <Select>
            <SelectTrigger id="month">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i} value={i + 1}>
                  {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="year">Year</Label>
          <Select>
            <SelectTrigger id="year">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => (
                <SelectItem key={i} value={new Date().getFullYear() + i}>
                  {new Date().getFullYear() + i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cvc">CVC</Label>
          <Input id="cvc" placeholder="CVC" />
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full">Continue with Membership Purchase</Button>
    </CardFooter>
  </Card>
  );
}
