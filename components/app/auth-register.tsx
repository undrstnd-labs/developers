"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserType } from "@prisma/client"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { AuthDetailsType } from "@/types/auth"

import { siteConfig } from "@/config/site"
import { authRegisterSchema } from "@/config/validation"
import { cn } from "@/lib/utils"

import { AuthEmail } from "@/components/app/auth-email"
import { AuthPhoneNumber } from "@/components/app/auth-phone-number"
import { AuthRegisterProviders } from "@/components/app/auth-register-providers"
import { Icons } from "@/components/shared/icons"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

export function AuthRegister() {
  const router = useRouter()
  const [details, setDetails] = React.useState<AuthDetailsType>()

  const form = useForm<z.infer<typeof authRegisterSchema>>({
    resolver: zodResolver(authRegisterSchema),
  })

  async function onSubmit(data: z.infer<typeof authRegisterSchema>) {
    setDetails(data)

    console.log(data)
  }

  return (
    <Form {...form}>
      {details ? (
        <div className="flex w-full flex-col gap-4 space-y-8 pt-4">
          <div className="pointer-events-auto my-6 flex flex-col">
            <AuthEmail /* data={details} */ />
            <Accordion type="single" collapsible className="mt-6 border-t pt-2">
              <AccordionItem value="item-1" className="border-0">
                <AccordionTrigger className="flex justify-center space-x-2 text-sm">
                  <span>More options</span>
                </AccordionTrigger>
                <AccordionContent className="mt-4">
                  <div className="flex flex-col space-y-4">
                    <AuthRegisterProviders />
                    <Separator />
                    <AuthPhoneNumber />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      ) : (
        <form
          className="flex w-full flex-col gap-4 space-y-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex w-full flex-col gap-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <Label className="hover:bg-secondary [&:has(:checked)]:border-primary relative flex w-full cursor-pointer flex-col justify-center rounded-lg border p-6 transition-all duration-300">
                          <RadioGroupItem
                            value={UserType.DEVELOPER}
                            className="peer sr-only"
                          />
                          <div className="space-y-1 text-left">
                            <h4 className="font-medium">Developer</h4>
                            <p className="text-muted-foreground text-sm">
                              For personal projects and learning
                            </p>
                          </div>
                          <div className="absolute right-2 top-2 rounded-full p-1">
                            {form.watch("type") === UserType.DEVELOPER ? (
                              <Icons.circleCheck className="text-primary size-4" />
                            ) : (
                              <Icons.circle className="text-muted size-4" />
                            )}
                          </div>
                        </Label>
                      </FormControl>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <Label className="hover:bg-secondary [&:has(:checked)]:border-primary relative flex w-full cursor-pointer flex-col justify-center rounded-lg border p-6 transition-all duration-300">
                          <RadioGroupItem
                            value={UserType.ORGANIZATION}
                            className="peer sr-only"
                          />
                          <div className="space-y-1 text-left">
                            <h4 className="font-medium">Organization</h4>
                            <p className="text-muted-foreground text-sm">
                              For teams and entreprises
                            </p>
                          </div>
                          <div className="absolute right-2 top-2 rounded-full p-1">
                            {form.watch("type") === UserType.ORGANIZATION ? (
                              <Icons.circleCheck className="text-primary size-4" />
                            ) : (
                              <Icons.circle className="text-muted size-4" />
                            )}
                          </div>
                        </Label>
                      </FormControl>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("type") && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button
            type="submit"
            className={cn(
              "w-full",
              !form.formState.isValid &&
                "bg-secondary-foreground text-secondary cursor-not-allowed"
            )}
            disabled={!form.formState.isValid}
          >
            Continue
            <Icons.chevronRight className="ml-2 size-4 stroke-[3px]" />
          </Button>
        </form>
      )}
    </Form>
  )
}
