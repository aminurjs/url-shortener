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
import { MultipleTagSelector } from "@/components/ui/multi-select";
import { Switch } from "@/components/ui/switch";
import { createLinkSchema } from "@/schemas";
import { LinkAlertDialog } from "./success-modal";
import { useDialog } from "@/hooks/use-dialog";
import apiInstance from "@/utils/apiInstance";

export default function LinkCreate() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isOpen, openDialog, closeDialog } = useDialog();
  const form = useForm<z.infer<typeof createLinkSchema>>({
    resolver: zodResolver(createLinkSchema),
  });

  const onSubmit = async (values: z.infer<typeof createLinkSchema>) => {
    try {
      const response = await apiInstance.post("/links/create", values);

      console.log("Response:", response.data);
    } catch (error) {
      console.error("API Request Error:", error);
    }
  };

  return (
    <div className="">
      <LinkAlertDialog
        isOpen={isOpen}
        closeDialog={closeDialog}
        url="https://example.com/long-url"
        shortUrl="bit.ly/42CcR2q"
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
          />

          <FormField
            control={form.control}
            name="qrCode"
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
            <Button className="px-16" type="submit">
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
