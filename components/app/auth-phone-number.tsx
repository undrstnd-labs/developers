"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { isValidPhoneNumber } from "react-phone-number-input"
import { z } from "zod"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { PhoneInput } from "@/components/ui/phone-input"

const FormSchema = z.object({
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
})

export function AuthPhoneNumber() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="phone"
          disabled
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormControl className="w-full">
                <PhoneInput
                  defaultCountry="TN"
                  placeholder="Votre numéro de téléphone"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid}
        >
          Continuer
          <Icons.chevronRight className="ml-2 size-4 stroke-[3px]" />
        </Button>
      </form>
    </Form>
  )
}
