import { QueryClient } from "@tanstack/react-query";
import { IVideo } from "../../types/IVideo";
import { IVideoStatusMutationProps } from "./mutateVideoStatus";
import { IVideosFilters } from "../../types/IVideosFilters";
import { VideoMutaion } from "../../enums/VideoMutation";
import { IVideoEventMutationProps } from "./mutateVideoEvent";

export const videoOnMutate = async (
  mutation: IVideoStatusMutationProps | IVideoEventMutationProps,
  queryClient: QueryClient,
  filters: IVideosFilters,
  type: VideoMutaion
) => {
  // Cancel any outgoing refetches
  // (so they don't overwrite our optimistic update)
  await queryClient.cancelQueries({ queryKey: ['videos', mutation.videoId] });
  // Snapshot the previous value
  const videosData = queryClient.getQueryData<IVideo[]>(['videos', filters]);
  const previousVideo = videosData?.find((v) => v.id === mutation.videoId);
  if (!previousVideo) return null;
  let updatedVideo: IVideo | undefined;
  if (type === VideoMutaion.Status) {
    if ('status' in mutation) {
      updatedVideo = { ...previousVideo, status: mutation.status };
    }
  } else {
    if ('newEventId' in mutation) {
      updatedVideo = { ...previousVideo, eventId: mutation.newEventId };
    }
  }
  if (!updatedVideo) return null;
  // Optimistically update to the new value
  queryClient.setQueryData(['videos', filters], (previousVideos: IVideo[]) => {
    return (previousVideos || []).map((vid: IVideo) =>
      vid.id === mutation.videoId ? updatedVideo : vid
    );
  });
  // Return a context with the previous and new video
  return { previousVideo, updatedVideo };
};
