import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';

import { ENDPOINTS } from '@/services/endpoints';
import nock from 'nock';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import HistoryPage from '@/pages/History/History.view';

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Avoid automatic retries in tests
      },
    },
  });

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={createQueryClient()}>
    {children}
  </QueryClientProvider>
);

// Mock API Response

describe("History url component", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it("Should renders url history correctly", async () => {
    nock("http://localhost:3333")
      .get(ENDPOINTS.GET_HISTORY)
      .reply(200, [
        {
          id: 1,
          createdAt: "2024-01-01T12:00:00Z",
          originalUrl: "http://example.com/1",
          shortUrl: "exmpl1",
          description: "Test 1",
        },
        {
          id: 2,
          createdAt: "2024-01-02T12:00:00Z",
          originalUrl: "http://example.com/2",
          shortUrl: "exmpl2",
          description: "Test 2",
        },
      ]);
    render(<HistoryPage />, { wrapper });

    expect(screen.getByText(/Loading history/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/URL History/i)).toBeInTheDocument();
    });
    expect(screen.getByText("Test 1")).toBeInTheDocument();
    expect(screen.getByText("Test 2")).toBeInTheDocument();
  });

  it("Should display no history data", async () => {
    nock("http://localhost:3333").get(ENDPOINTS.GET_HISTORY).reply(200, []);
    render(<HistoryPage />, { wrapper });

    expect(screen.getByText(/Loading history/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/No history available./i)
    ).not.toBeInTheDocument();
  });

  it("Should delete url history", async () => {
    nock("http://localhost:3333")
      .get(ENDPOINTS.GET_HISTORY)
      .reply(200, [
        {
          id: 1,
          createdAt: "2024-01-01T12:00:00Z",
          originalUrl: "http://example.com/1",
          shortUrl: "exmpl1",
          description: "Test 1",
        },
      ]);

    nock("http://localhost:3333")
      .delete(`${ENDPOINTS.DELETE_HISTORY}1`)
      .reply(200);

    render(<HistoryPage />, { wrapper });

    expect(screen.getByText(/Loading history/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/URL History/i)).toBeInTheDocument();
    });
    expect(screen.getByText("Test 1")).toBeInTheDocument();
    screen.getByText("Test 1").closest("tr")?.querySelector("button")?.click();

    await waitFor(() => {
      expect(screen.queryByText("Test 1")).not.toBeInTheDocument();
    });
  });
});
