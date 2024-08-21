import { useEffect, useState } from "react";
import { serverRoutes } from "../server/server-routes";
import { IHeaderBadgeCounts } from "../types/IHeaderBadgeCounts";

export default function useHeaderBadges() {
  const [counts, setCounts] = useState<IHeaderBadgeCounts>({ videos: 0, events: 0 });

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const baseUrl = import.meta.env.VITE_BASE_URL;
      const path = serverRoutes.others.getHeaderBadgeCounts;
      const response = await fetch(baseUrl + path);
      if (!response.ok) {
        throw new Error('Network error');
      }

      const badges: IHeaderBadgeCounts = await response.json();
      setCounts(badges);
    } catch (error) {
      console.error('Error fetching header badges:', error);
    }
  }

  return { videos: counts.videos, events: counts.events }
}