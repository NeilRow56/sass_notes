'use client'

import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { UserValidation } from '@/lib/validations/user'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { ChangeEvent } from 'react'
import { Textarea } from '../ui/textarea'

interface AccountProfileProps {
  user: {
    id: string
    objectId: string
    username: string
    name: string
    bio: string
    image: string
  }
  btnTitle: string
}

const AccountProfile = ({ user, btnTitle }: AccountProfileProps) => {
  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: '',
      name: '',
      username: '',
      bio: '',
    },
  })

  const handleImage = (
    e: ChangeEvent,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault()
  }

  const onSubmit = (values: z.infer<typeof UserValidation>) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="  w-[30px] rounded-full bg-slate-800">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile_icon"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt="profile_icon"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="text-semibold flex-1 text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Add profile photo"
                  className="cursor-pointer border-none bg-transparent outline-none file:text-primary"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormDescription>Add a profile image</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col  gap-3">
              <FormLabel className="w-[75px]">Name</FormLabel>
              <FormControl className="text-semibold flex-1 text-gray-200">
                <Input
                  type="text"
                  className="border-dark-4 bg-dark-3 text-light-1 !important no-focus border"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="   w-[75px]">Username</FormLabel>
              <FormControl className="text-semibold flex-1 text-gray-200">
                <Input
                  type="text"
                  className="border-dark-4 bg-dark-3 text-light-1 !important no-focus border"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col  gap-3">
              <FormLabel className="w-[75px]   ">Bio</FormLabel>
              <FormControl className="text-semibold flex-1 text-gray-200">
                <Textarea
                  rows={10}
                  className="border-dark-4 bg-dark-3 text-light-1 !important no-focus border"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default AccountProfile
