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
export enum BeltLevel {
  White,
  Blue
}

export enum StripeLevel {
  S1,
  S2,
  S3,
  S4,
}

//BeltPlaylist > Stripe > Section > Video Type 
export type BeltPlaylist = Stripe[];

export interface Stripe {
  belt: BeltLevel;
  stripe: StripeLevel;
  section: Section[];
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


export interface UserBookmarks {
  savedItems: BookmarkedItem[];
}

export interface BookmarkedItem {
  belt: BeltLevel;
  stripe: StripeLevel;
  section: SectionName;
  video: VideoType
}

