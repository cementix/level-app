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
import createDay from "./api/day/createDay";
import { ClipLoader } from "react-spinners";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  title: z.string().min(1).max(50),
});

const CreateDayForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { title } = values;
    createDay(title)
      .then(() => {
        setIsLoading(false);
        toast({
          title: "Success!",
          description: `Day ${title} has successfully been created!`,
        });
      })
      .catch(() => {
        setIsLoading(false);
        toast({
          title: "Error!",
          description: `Unexpected error creating day ${title} occured!`,
          variant: "destructive"
        });
      });
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
                  placeholder="June 11 - a day when i started developing level-app"
                  {...field}
                />
              </FormControl>
              <FormDescription>Type some legendary stuff.</FormDescription>
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
