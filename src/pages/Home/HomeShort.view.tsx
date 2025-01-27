import { handleCopy } from "@/lib/utils";
import { IShortenUrlProps } from "@/pages/Home/types";
import { useUrlStore } from "@/store/useUrlStore";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const ShortUrlCard = (props: IShortenUrlProps) => {
  const { originalUrl, shortUrl, description } = props;
  const setShowShortUrlCard = useUrlStore((state) => state.setShowShortUrlCard);

  const handleDone = () => {
    setShowShortUrlCard(false);
  };
  return (
    <Card className="flex flex-col p-10 w-full md:max-w-md lg:max-w-lg">
      <CardHeader className="text-center">
        <CardTitle data-testid="short-url-title">Shorter URL</CardTitle>
        <CardDescription className="text-center">
          <a href={originalUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex justify-around">
        <Button onClick={() => handleCopy(originalUrl)}>Copy</Button>
        <Button onClick={handleDone}>Done</Button>
      </CardContent>

      <CardContent className="text-left space-y-2">
        {description && (
          <CardDescription>
            {" "}
            <span className="text-card-foreground">Description: </span>
            {description}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
};
