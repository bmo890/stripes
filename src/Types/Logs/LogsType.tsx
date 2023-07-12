import { VideoType } from "../../Stripe Playlist/index";

export interface Log {
    id: number;
    title: string;
    owner: Coach | string
    entry: string;
    date: string;
    arboxGenerated?: boolean;
    tags: string[]
    // tags: Tag[];
    videos?: VideoType[];
  }
  
  export enum Coach {
    Gal = 'Gal',
    Yam = 'Yam',
    Amiram = 'Amiram'
}