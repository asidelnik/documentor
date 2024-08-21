import { serverRoutes } from '../../server/server-routes';
import { IHeaderBadgeCounts } from '../../types/IHeaderBadgeCounts';

export const fetchBadges = async (
  signal: AbortSignal
): Promise<IHeaderBadgeCounts> => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const path = serverRoutes.others.getHeaderBadgeCounts;
  const response = await fetch(baseUrl + path, { signal });
  if (!response.ok) {
    throw new Error('Network error');
  }
  return response.json();
};
