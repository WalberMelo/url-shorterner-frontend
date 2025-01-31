import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";

import { formatDate, handleError, handleSuccess } from "@/lib/utils";
import { urlService } from "@/services/urlService";
import { useUrlStore } from "@/store/useUrlStore";

import { CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IHistoryProps } from "./types";

const HistoryPage: React.FC = () => {
  const queryClient = useQueryClient();
  const setShowShortUrlCard = useUrlStore((state) => state.setShowShortUrlCard);

  useEffect(() => {
    setShowShortUrlCard(false);
  }, [setShowShortUrlCard]);

  //Fetching url history
  const {
    data: historyUrls,
    isLoading,
    isError,
    error,
  } = useQuery<IHistoryProps[], Error>({
    queryKey: ["historyUrls"],
    queryFn: urlService.getHistory,
  });

  // Delete url process
  const deleteUrl = useMutation<void, Error, number>({
    mutationFn: urlService.deleteHistory,
    onSuccess: (_, id) => {
      handleSuccess(`URL with ID ${id} deleted successfully!`);
      queryClient.setQueryData<IHistoryProps[]>(["historyUrls"], (oldData) => {
        return oldData?.filter((url) => url.id !== id) || [];
      });
    },
    onError: (err: Error) => {
      handleError(err.message);
    },
  });

  const handleDelete = (id: number) => {
    deleteUrl.mutate(id);
  };

  if (isLoading) {
    return <h2>Loading history...</h2>;
  }

  if (isError && error) {
    handleError(error.message);
    return <h2>Error: {error.message}</h2>;
  }

  if (
    !historyUrls ||
    (Array.isArray(historyUrls) && historyUrls.length === 0)
  ) {
    return <h2>No history available.</h2>;
  }

  const latestUrls = (historyUrls as IHistoryProps[]).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <>
      <CardTitle className="text-center mb-4">URL History</CardTitle>
      <Table>
        <TableCaption>A list of your recent urls created.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Created</TableHead>
            <TableHead className="text-middle">Web title</TableHead>
            <TableHead className="text-middle w-1">Original Url</TableHead>
            <TableHead className="text-middle">Short Url</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {latestUrls.slice(0, 13).map((url: IHistoryProps) => (
            <TableRow key={url.id}>
              <TableCell className="w-[100px]">
                {formatDate(url.createdAt)}
              </TableCell>
              <TableCell>{url.description}</TableCell>

              <TableCell className="text-left">{url.originalUrl}</TableCell>

              <TableCell className="text-left w-1/3">
                <a
                  href={url.shortUrl} // Directly use the stored full URL
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {url.shortUrl}
                </a>
              </TableCell>

              <TableCell>
                <button onClick={() => handleDelete(url.id)}>
                  <span className="material-symbols-outlined hover:text-red-700">
                    delete
                  </span>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default HistoryPage;
