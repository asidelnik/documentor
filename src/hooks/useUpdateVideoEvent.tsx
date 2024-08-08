import { useState } from "react";
import { serverRoutes } from "../server/server-routes";

export function useUpdateVideoEvent() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [isEventLoading, setIsEventLoading] = useState<boolean | null>(null);
  const [isEventError, setIsEventError] = useState<boolean | null>(null);

  let fetchController = new AbortController();

  async function updateVideoEvent(id: string, newEventId: string | null, oldEventId: string | null) {
    setIsEventLoading(true);
    fetchController.abort('Newer fetch called');
    fetchController = new AbortController();
    const { signal } = fetchController;
    try {
      const requestPath = serverRoutes.videos.videoSetEvent(id, newEventId, oldEventId);
      const response = await fetch(baseUrl + requestPath, { method: 'PUT', signal });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setIsEventLoading(false);
      setIsEventError(false);
    } catch (error) {
      // console.log(error);
      setIsEventLoading(false);
      setIsEventError(true);
    }
  }

  return { isEventLoading, isEventError, updateVideoEvent };
}