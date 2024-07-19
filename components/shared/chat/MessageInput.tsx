"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";
import createMessage from "@/app/api/message/createMessage";

const formSchema = z.object({
  message: z.string().max(50),
});

const MessageInput = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

   function onSubmit(values: z.infer<typeof formSchema>) {
    createMessage(values.message).then(data => data)
  }
  return (
    <div className="bg-zinc-100 h-24 flex items-center justify-center rounded-b-xl">
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Type something" className="rounded-full w-64 bg-white" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="text-white rounded-full"><SendIcon size={20} /></Button>
        </form>
      </Form>
    </div>
  );
};

export default MessageInput;
