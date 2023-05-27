import { VideoType } from "../../Stripe Playlist/index";
import { W1_PLAYLIST } from "../../Stripe Playlist/WhiteBeltPlaylist";
import {Log} from '../../Types/Logs/LogsType'
import {Tag} from '../../Types/Tags/TagsType'

const date1 = new Date();
date1.setFullYear(2023, 3, 11); // Sets the date to May 11, 2023
date1.setHours(10, 30, 0); // Sets the time to 10:30:00

const date2 = new Date();
date2.setFullYear(2023, 4, 12); // Sets the date to May 12, 2023
date2.setHours(12, 0, 0); // Sets the time to 12:00:00

const date3 = new Date();
date3.setFullYear(2023, 4, 126); // Sets the date to May 13, 2023
date3.setHours(14, 15, 0); // Sets the time to 14:15:00

export const fakeTags: Tag[] = [
  { name: "armbar", id: 1 },
  { name: "kimura", id: 2 },
  { name: "kneeslide", id: 3 },
];

export const fakeLogs: Log[] = [
  {
    id: 1,
    title: "",
    date: date1.toISOString(),
    entry:
      "Had a great training session this morning!\nWorked on my armbars.\n\nFeeling strong and ready for the next one!",
    tags: ['armbar'],
    // videos: [
    //   W1_PLAYLIST.sections[0].playlist[1],
    //   W1_PLAYLIST.sections[1].playlist[1],
    // ],
  },
  {
    id: 2,
    title: "Kimura Day",
    date: date2.toISOString(),
    entry:
      "Today was all about drilling.\nKneeslides are improving but need more work.\n\nAlso practiced some kimura setups.",
    tags: ['kimura', 'kneeslide'],
    // videos: [],
  },
  {
    id: 3,
    title: "Conditioning",
    date: date3.toISOString(),
    entry:
      "Evening session done. Focused on conditioning.\n\nNo specific techniques worked on. \n\n Had some good rolling sessions and didn't get too tired out. Managed to hit a round with Gal without tapping. \n\nReady for a good night’s sleep and another day of training tomorrow!",
    tags: [],
    // videos: [W1_PLAYLIST.sections[2].playlist[2]],
  },
];
