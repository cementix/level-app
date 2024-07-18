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
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import createTask from "@/app/api/task/createTask";
import { usePathname } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1)
});

const CreateDayForm = () => {
  const pathname = usePathname();
  const dayId = pathname.split("/").pop();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: ""
    },
  });


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    if (!dayId) {
      toast({
        title: "Day ID not found",
        description: "Unable to find the day ID in the URL parameters.",
      });
      setIsLoading(false);
      return;
    }

    try {
      const { title, description } = values;
      await createTask(title, description, dayId);
      toast({
        title: "Task Created",
        description: "Your task has been successfully created.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while creating the task.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter a title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Code for 1 hour"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter a description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Explain the task"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <ClipLoader /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateDayForm;
