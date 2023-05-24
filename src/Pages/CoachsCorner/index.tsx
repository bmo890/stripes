import { VideoType } from "../../Stripe Playlist/index";
import { W1_PLAYLIST } from "../../Stripe Playlist/WhiteBeltPlaylist";
import {Tag} from '../../Types/Tags/TagsType'
import { Announcement, Coach } from '../../Types/Announcements/AnnouncementsType'



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

export const fakeAnnouncements: Announcement[] = [
  {
    id: 1,
    owner: Coach.Gal,
    date: date1.toISOString(),
    entry:
    "Hello team! 🥋\n\nI hope you're all ready for an exciting week of training ahead. This week, we're going to focus on a few key techniques:\n\n1. **White Belts:** We will be covering basics of guard passing, specifically the Knee Slice and the X-Pass. Make sure to revisit the instructional videos on these topics.\n\n2. **Blue Belts:** We're going to delve into more complex guard play this week, focusing on the Spider Guard and Butterfly Guard. The instructional videos have been updated in the app.\n\nAs usual, we'll start every class with a thorough warm-up and end with some good rounds of sparring.\n\nRemember, the key to success in Jiu-Jitsu is consistency and mindful practice. Let's make the most of this week! 💪\n\nDon't forget to check the 'Coach's Corner' section in our app for detailed breakdowns and video links for these techniques.\n\nSee you all on the mat!\n\nCoach",
    tags: ['armbar'],
    // videos: [
    //   W1_PLAYLIST.sections[0].playlist[1],
    //   W1_PLAYLIST.sections[1].playlist[1],
    // ],
  },
  {
    id: 2,
    owner: Coach.Gal,
    date: date2.toISOString(),
    entry:
    "Good day, team! 🥋\n\nI trust you are all prepared for the week's training sessions. We're going to hone in on some crucial techniques this week:\n\n1. **White Belts:** This week, we'll focus on fundamental submissions like the Armbar and Rear Naked Choke. Be sure to go through the tutorial videos on these topics once more.\n\n2. **Blue Belts:** We're planning to explore intricate guard passes, particularly the Torreando Pass and the Over-Under Pass. The tutorial videos have been refreshed in the app.\n\nAs per our norm, we'll kick off every class with a comprehensive warm-up and conclude with some intense sparring sessions.\n\nRemember, diligence and intentional practice are the pillars of success in Jiu-Jitsu. Let's make every session count! 💪\n\nDon't forget to visit the 'Coach's Corner' section in our app for in-depth breakdowns and video links for these techniques.\n\nCan't wait to see you all on the mat!\n\nCoach",
    tags: ['kimura', 'kneeslide'],
    // videos: [],
  },
  {
    id: 3,
    owner: Coach.Yam,
    date: date3.toISOString(),
    entry:
    "Hello warriors! 🥋\n\nI hope you're all eager for the thrilling week of training ahead. Our focus will be on certain vital techniques this week:\n\n1. **White Belts:** We will be concentrating on the essentials of takedowns, specifically the Single Leg Takedown and the Double Leg Takedown. It's crucial to revisit the training videos on these topics.\n\n2. **Blue Belts:** This week, we're going to immerse ourselves in advanced sweeps, focusing on the Scissor Sweep and the Hip Bump Sweep. The training videos have been updated in the app.\n\nAs always, we'll initiate every class with a thorough warm-up and finish with some robust rounds of sparring.\n\nRemember, the secret to mastery in Jiu-Jitsu lies in regularity and conscious practice. Let's make this week fruitful! 💪\n\nRemember to check the 'Coach's Corner' section in our app for detailed explanations and video links for these techniques.\n\nSee you all on the mat!\n\nCoach",
    tags: [],
    // videos: [W1_PLAYLIST.sections[2].playlist[2]],
  },
];
