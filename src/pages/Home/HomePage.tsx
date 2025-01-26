import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { useForm } from 'react-hook-form';

import { handleError, handleSuccess } from '@/lib/utils';
import { urlService } from '@/services/urlService';
import { useUrlStore } from '@/store/useUrlStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { ShortUrlCard } from '@/components/custom/ShortUrlCard';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
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
import { IShortenUrlProps, IUrlProps } from './types';

const formSchema = z.object({
  originalUrl: z.string().url("Invalid URL"),
  description: z.string().max(50, "Limit 50 characters").optional(),
});

const HomePage: React.FC = () => {
  const [shortUrl, setShortUrl] = useState<IShortenUrlProps>();
  const showShortUrlCard = useUrlStore((state) => state.showShortUrlCard);
  const setShowShortUrlCard = useUrlStore((state) => state.setShowShortUrlCard);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalUrl: "",
      description: "",
    },
  });

  const mutation = useMutation<IShortenUrlProps, Error, IUrlProps>({
    mutationFn: (data: IUrlProps) => urlService.shortenUrl(data),

    onSuccess: (data: IShortenUrlProps) => {
      console.log("shorterUrl: ", data);
      setShortUrl(data);
      setShowShortUrlCard(true);
      handleSuccess("URL shortened successfully!");
      form.reset();
    },

    onError: (error: Error) => {
      handleError(error);
    },
  });

  async function onSubmit(originalUrl: z.infer<typeof formSchema>) {
    mutation.mutate(originalUrl);
  }

  return (
    <section className="flex items-center justify-center pt-20">
      {showShortUrlCard ? (
        <div>
          <Confetti />
          {shortUrl && <ShortUrlCard {...shortUrl} />}
        </div>
      ) : (
        <Card className="w-full md:max-w-md lg:max-w-lg bg-slate-200">
          <CardHeader>
            <CardTitle>URL Shortener Maker</CardTitle>
            <CardDescription>Generate a shorter url</CardDescription>
          </CardHeader>
          <div className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="originalUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-slate-10"
                          placeholder="https://cryptoexchangetoken.com"
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
                          className="bg-slate-10"
                          placeholder="Crypto exchange website"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-left">
                        *Provide optional description
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Generate</Button>
              </form>
            </Form>
          </div>
        </Card>
      )}
    </section>
  );
};

export default HomePage;
