import { QueryClient } from "@tanstack/react-query";
import { IVideo } from "../types/IVideo";
import { IVideoStatusMutationProps } from "./mutateVideoStatus";
import { IVideosFilters } from "../types/IVideosFilters";

export const videoStatusOnMutate = async (
  statusMutation: IVideoStatusMutationProps,
  queryClient: QueryClient,
  filters: IVideosFilters
) => {
  // Cancel any outgoing refetches
  // (so they don't overwrite our optimistic update)
  await queryClient.cancelQueries({ queryKey: ['videos', statusMutation.videoId] });
  // Snapshot the previous value
  const videosData = queryClient.getQueryData<IVideo[]>(['videos', filters]);
  const previousVideo = videosData?.find((v) => v.id === statusMutation.videoId);
  if (!previousVideo) return null;
  const updatedVideo = { ...previousVideo, status: statusMutation.status };
  // Optimistically update to the new value
  queryClient.setQueryData(['videos', filters], (previousVideos: IVideo[]) => {
    return (previousVideos || []).map((vid: IVideo) =>
      vid.id === statusMutation.videoId ? updatedVideo : vid
    );
  });
  // Return a context with the previous and new video
  return { previousVideo, updatedVideo };
};
