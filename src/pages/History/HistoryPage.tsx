import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { formatDate, handleError } from '@/lib/utils';
import { urlService } from '@/services/urlService';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { IHistoryProps } from './types';

const HistoryPage: React.FC = () => {
  const {
    data: historyUrls,
    isLoading,
    isError,
    error,
  } = useQuery<IHistoryProps[], Error, IHistoryProps[]>({
    queryKey: ["historyUrls"],
    queryFn: urlService.getHistory,
    onError: (err: Error) => handleError(err.message),
  });

  if (isLoading) {
    return <p>Loading history...</p>;
  }

  if (isError && error) {
    return <p>Error: {error.message}</p>;
  }

  if (!historyUrls || historyUrls.length === 0) {
    return <p>No history available.</p>;
  }

  const latestUrls = historyUrls.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.updatedAt).getTime()
  );

  return (
    <>
      <Table>
        <TableCaption>A list of your recent urls created.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-middle">Original Url</TableHead>
            <TableHead className="text-middle">Short Url</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {latestUrls.slice(0, 13).map((url: IHistoryProps) => (
            <TableRow key={url.id}>
              <TableCell className="w-[80px] font-small">{url.id}</TableCell>
              <TableCell className="w-1/3">
                {formatDate(url.createdAt)}
              </TableCell>
              <TableCell className="text-middle">{url.originalUrl}</TableCell>
              <TableCell className="text-middle">
                <a
                  href={url.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {url.shortUrl}{" "}
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default HistoryPage;
