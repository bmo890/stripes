export interface StripePlaylist {
  index: number;
  nameEN: string;
  nameHEB: string;
  playlist: VideoType[];
}

export interface VideoType {
  id: number;
  url: string;
  titleHEB: string;
  titleEN: string;
  descriptionHEB: string;
  descriptionEN: string;
}
