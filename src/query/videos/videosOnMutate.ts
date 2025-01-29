import { QueryClient } from '@tanstack/react-query';
import { IVideosFilters } from '../../types/IVideosFilters';
import { IMutateVideosEventProps } from './mutateVideosEvent';
import { IVideo } from '../../types/IVideo';

export const videosOnMutate = async (
  mutation: IMutateVideosEventProps,
  queryClient: QueryClient,
  filters: IVideosFilters
) => {
  // Cancel any outgoing refetches
  // (so they don't overwrite our optimistic update)
  await queryClient.cancelQueries({ queryKey: ['videos', mutation.videoIds] });
  // Snapshot the previous value
  const videosData = queryClient.getQueryData<Array<IVideo>>([
    'videos',
    filters,
  ]);

  const previousVideos = videosData?.filter((v) =>
    mutation.videoIds.includes(v._id)
  );
  if (!previousVideos) return null;

  const updatedVideos: Array<IVideo> = previousVideos.map((video) => {
    return { ...video, eventId: mutation.eventId };
  });

  if (!updatedVideos) return null;
  // Optimistically update to the new value
  queryClient.setQueryData(
    ['videos', filters],
    (previousVideos: Array<IVideo>) => {
      return (previousVideos || []).map(
        (vid: IVideo) => updatedVideos.find((v) => v._id === vid._id) || vid
      );
    }
  );
  // Return a context with the previous and new video
  return { previousVideos, updatedVideos };
};
