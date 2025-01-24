("use client");

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { IUrlProps } from './types';

const formSchema = z.object({
  originalUrl: z.string().url("Invalid URL"),
  description: z.string().max(50, "Limit 50 characters").optional(),
});

const HomePage: React.FC = () => {
  const [longUrl, setOriginalUrl] = useState<IUrlProps>({
    originalUrl: "",
    description: "",
  });
  const [shortUrl, setShortUrl] = useState<IUrlProps>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalUrl: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    console.log(values);
    setOriginalUrl(values);
    // Send to API server component
    setShortUrl({
      originalUrl: "https://shorturl.com/123",
      description: "Pedro Martinez sales website",
    });
    // Add Toast to it
  }

  const ShortUrlDisplay = () => {
    return (
      <div className="space-y-2">
        <a href="">Short URL: {shortUrl?.originalUrl}</a>
        <p>Description: {shortUrl?.description}</p>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold">URL Shortener Maker</h1>
      {shortUrl && <ShortUrlDisplay />}
      <div className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="originalUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="E.g: https://longurlintheworl.com"
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
                  <FormLabel>Short description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Pedro Martinez sales website"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Optionally type a short description about your url.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Generate</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default HomePage;
