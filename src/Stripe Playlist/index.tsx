import {
  W1_PLAYLIST,
  W2_PLAYLIST,
  W3_PLAYLIST,
} from "./WhiteBelt/WhiteBeltPlaylist";

export const WHITE_PLAYLIST: BeltPlaylist = [
  W1_PLAYLIST,
  W2_PLAYLIST,
  W3_PLAYLIST,
];
export enum SectionName {
  S1_1 = "S1_1",
  S1_2 = "S1_2",
  S1_3 = "S1_3",
  S1_4 = "S1_4",
  S1_5 = "S1_5",
  S2_1 = "S2_1",
  S2_2 = "S2_2",
  S2_3 = "S2_3",
  S2_4 = "S2_4",
  S3_1 = "S3_1",
  S3_2 = "S3_2",
}

export enum StripeLevel {
  S2,
  S1,
  S3,
  S4,
}

//BeltPlaylist > Stripe > Section > Video Type 
export type BeltPlaylist = Stripe[];

export interface Stripe {
  stripe: StripeLevel;
  playlist: Section[];
}

export interface Section {
  index: number;
  stripe: StripeLevel;
  section: SectionName;
  nameEN: string;
  nameHEB: string;
  playlist: VideoType[];
}

export interface VideoType {
  id: number;
  stripe: StripeLevel;
  section: SectionName;
  url: string;
  titleHEB: string;
  titleEN: string;
  descriptionHEB: string;
  descriptionEN: string;
}

export interface SavedLevel {}

export interface SavedPlaylist {
  level: Section;
  saved: number[];
}
export interface UserBookmarks {
  savedItems: SavedPlaylist[];
}
