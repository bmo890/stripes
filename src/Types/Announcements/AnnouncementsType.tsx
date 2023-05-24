import { VideoType } from "../../Stripe Playlist/index";


export interface Announcement {
    id: number;
    owner: Coach;
    entry: string;
    date: string;
    tags: string[]
    videos?: VideoType[];
  }

 export enum Coach {
      Gal = 'Gal',
      Yam = 'Yam',
      Amiram = 'Amiram'
  }