import { useState } from "react";
import { serverRoutes } from "../server/server-routes";

export function useUpdateVideoStatus() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [isError, setIsError] = useState<boolean | null>(null);

  let fetchController = new AbortController();

  async function update(id: string, status: number) {
    setIsLoading(true);
    fetchController.abort('Newer fetch called');
    fetchController = new AbortController();
    const { signal } = fetchController;
    try {
      const requestPath = serverRoutes.videos.updateVideoStatus(id, status);
      const response = await fetch(baseUrl + requestPath, { method: 'PUT', signal });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  }

  return { isLoading, isError, update };
}
