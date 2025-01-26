import { IHistoryProps } from '@/pages/History/types';
import { IShortenUrlProps, IUrlProps } from '@/pages/Home/types';
import api from '@/services/api';
import { ENDPOINTS } from '@/services/endpoints';

export const urlService = {
  shortenUrl: async (data: IUrlProps): Promise<IShortenUrlProps> => {
    const response = await api.post<IShortenUrlProps>(
      ENDPOINTS.SHORTEN_URL,
      data
    );
    return response.data;
  },

  getHistory: async (): Promise<IHistoryProps[]> => {
    const response = await api.get(ENDPOINTS.GET_HISTORY);
    return response.data;
  },
};
