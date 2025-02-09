"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Switch } from "@/components/ui/switch";
import { createLinkSchema } from "@/schemas";
import { LinkAlertDialog } from "./success-modal";
import { useDialog } from "@/hooks/use-dialog";
import apiInstance from "@/utils/apiInstance";
import axios from "axios";
import { useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";

export default function LinkCreate() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const { isOpen, openDialog, closeDialog } = useDialog();
  const form = useForm<z.infer<typeof createLinkSchema>>({
    resolver: zodResolver(createLinkSchema),
  });
  const [data, setData] = useState({
    shortURL: "",
    qrCode: "",
  });

  const onSubmit = async (values: z.infer<typeof createLinkSchema>) => {
    startTransition(async () => {
      try {
        const payload = {
          link: values.link,
          title: values?.title || null,
          tags: [],
          isQrCode: values.isQrCode,
          customAlias: values?.customAlias || null,
        };
        const response = await apiInstance.post("/url/create", payload);

        console.log("Response:", response.data);

        if (response.status === 201) {
          setData(response.data.data);
          openDialog();
        }
      } catch (error) {
        console.error("API Request Error:", error);
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.data
        ) {
          const { message } = error.response.data;
          if (message === "Custom alias already exists") {
            form.setError("customAlias", {
              type: "server",
              message: message,
            });
          } else {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
            });
          }
        }
      }
    });
  };
  console.log(data);
  return (
    <div className="">
      <LinkAlertDialog
        isOpen={isOpen}
        closeDialog={closeDialog}
        shortUrl={data?.shortURL}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <div>
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/my-long-link"
                        type="text"
                        className="w-full py-3 px-3 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primary focus:border-primary"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your title"
                    type="text"
                    className="w-full py-3 px-3 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-primary focus:border-primary"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customAlias"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custom Alias (Optional)</FormLabel>
                <FormControl>
                  <div className="w-full p-2 rounded border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 shadow-sm">
                    <div className="flex flex-nowrap items-center gap-2">
                      <span className="text-muted-foreground mx-3">
                        doma.in/
                      </span>
                      <Input
                        placeholder="Enter custom back-half"
                        type="text"
                        className="w-full py-1 px-0 focus:outline-none border-none outline-none focus-visible:ring-0 shadow-none"
                        {...field}
                      />
                    </div>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="tags"
            render={() => (
              <FormItem>
                <FormLabel>Tags (optional)</FormLabel>
                <FormControl>
                  <MultipleTagSelector
                    name="tags"
                    placeholder="Add a tags..."
                    maxTags={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="isQrCode"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-300 p-4 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>QR Code</FormLabel>
                  <FormDescription>
                    Generate a QR Code to share anywhere people can see it
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex gap-5">
            <Button className="px-16" type="submit" disabled={isPending}>
              Create your link
            </Button>{" "}
            <Button className="px-16" variant="outline" type="button">
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
