export interface Log {
    id: number;
    title: string;
    entry: string;
    date: string;
    arboxGenerated?: boolean;
    tags: string[]
    // tags: Tag[];
    // videos?: VideoType[];
  }
  