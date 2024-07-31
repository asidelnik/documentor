import { useState } from "react";
import { serverRoutes } from "../server/server-routes";

export function useUpdateVideoStatus() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [isStatusLoading, setIsStatusLoading] = useState<boolean | null>(null);
  const [isStatusError, setIsStatusError] = useState<boolean | null>(null);

  let fetchController = new AbortController();

  async function updateVideoStatus(id: string, status: number) {
    setIsStatusLoading(true);
    fetchController.abort('Newer fetch called');
    fetchController = new AbortController();
    const { signal } = fetchController;
    try {
      const requestPath = serverRoutes.videos.videoSetStatus(id, status);
      const response = await fetch(baseUrl + requestPath, { method: 'PUT', signal });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setIsStatusLoading(false);
      setIsStatusError(false);
    } catch (error) {
      // console.log(error);
      setIsStatusLoading(false);
      setIsStatusError(true);
    }
  }

  return { isStatusLoading, isStatusError, updateVideoStatus };
}
