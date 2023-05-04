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
  Blue,
}

export enum StripeLevel {
  S1,
  S2,
  S3,
  S4,
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

export interface Section {
  index: number;
  stripe: StripeLevel;
  section: SectionName;
  nameEN: string;
  nameHEB: string;
  playlist: VideoType[];
}

export interface Stripe {
  belt: BeltLevel;
  stripe: StripeLevel;
  sections: Section[];
}

//BeltPlaylist > Stripe > Section > Video Type
export type BeltPlaylist = {
  belt: BeltLevel;
  stripes: Stripe[];
};




export interface BookmarkedItem {
  belt: BeltLevel;
  stripe: StripeLevel;
  section: SectionName;
  video: VideoType;
}


export interface UserBookmarks {
  savedItems: BookmarkedItem[];
}


