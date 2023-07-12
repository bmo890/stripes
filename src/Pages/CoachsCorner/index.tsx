import { VideoType } from "../../Stripe Playlist/index";
import { W1_PLAYLIST } from "../../Stripe Playlist/WhiteBeltPlaylist";
import {Tag} from '../../Types/Tags/TagsType'
import { Announcement, Coach } from '../../Types/Announcements/AnnouncementsType'
import { Log } from "../../Types/Logs/LogsType";



const date1 = new Date();
date1.setFullYear(2023, 4, 22); // This week: May 22, 2023
date1.setHours(10, 30, 0); // Sets the time to 10:30:00

const date2 = new Date();
date2.setFullYear(2023, 4, 15); // Last week: May 15, 2023
date2.setHours(12, 0, 0); // Sets the time to 12:00:00

const date3 = new Date();
date3.setFullYear(2023, 3, 17); // The week before last: April 17, 2023
date3.setHours(14, 15, 0); // Sets the time to 14:15:00

const date4 = new Date();
date4.setFullYear(2023, 3, 10); // April 10, 2023
date4.setHours(10, 30, 0);

const date5 = new Date();
date5.setFullYear(2023, 2, 20); // March 20, 2023
date5.setHours(12, 0, 0);

const date6 = new Date();
date6.setFullYear(2023, 1, 27); // February 27, 2023
date6.setHours(14, 15, 0);

const date7 = new Date();
date7.setFullYear(2023, 0, 20); // January 20, 2023
date7.setHours(10, 30, 0);

const date8 = new Date();
date8.setFullYear(2022, 11, 20); // December 20, 2022
date8.setHours(12, 0, 0);

const date9 = new Date();
date9.setFullYear(2022, 10, 20); // November 20, 2022
date9.setHours(14, 15, 0);

export const fakeTags: Tag[] = [
  { name: "armbar", id: 1 },
  { name: "kimura", id: 2 },
  { name: "kneeslide", id: 3 },
];

// export const fakeAnnouncements: Announcement[] = [
export const fakeAnnouncements: Log[] = [
  {
    id: 1,
    title: '',
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
    title: '',
    owner: Coach.Gal,
    date: date2.toISOString(),
    entry:
    "Good day, team! 🥋\n\nI trust you are all prepared for the week's training sessions. We're going to hone in on some crucial techniques this week:\n\n1. **White Belts:** This week, we'll focus on fundamental submissions like the Armbar and Rear Naked Choke. Be sure to go through the tutorial videos on these topics once more.\n\n2. **Blue Belts:** We're planning to explore intricate guard passes, particularly the Torreando Pass and the Over-Under Pass. The tutorial videos have been refreshed in the app.\n\nAs per our norm, we'll kick off every class with a comprehensive warm-up and conclude with some intense sparring sessions.\n\nRemember, diligence and intentional practice are the pillars of success in Jiu-Jitsu. Let's make every session count! 💪\n\nDon't forget to visit the 'Coach's Corner' section in our app for in-depth breakdowns and video links for these techniques.\n\nCan't wait to see you all on the mat!\n\nCoach",
    tags: ['kimura', 'kneeslide'],
    // videos: [],
  },
  {
    id: 3,
    title: '',
    owner: Coach.Yam,
    date: date3.toISOString(),
    entry:
    "Hello warriors! 🥋\n\nI hope you're all eager for the thrilling week of training ahead. Our focus will be on certain vital techniques this week:\n\n1. **White Belts:** We will be concentrating on the essentials of takedowns, specifically the Single Leg Takedown and the Double Leg Takedown. It's crucial to revisit the training videos on these topics.\n\n2. **Blue Belts:** This week, we're going to immerse ourselves in advanced sweeps, focusing on the Scissor Sweep and the Hip Bump Sweep. The training videos have been updated in the app.\n\nAs always, we'll initiate every class with a thorough warm-up and finish with some robust rounds of sparring.\n\nRemember, the secret to mastery in Jiu-Jitsu lies in regularity and conscious practice. Let's make this week fruitful! 💪\n\nRemember to check the 'Coach's Corner' section in our app for detailed explanations and video links for these techniques.\n\nSee you all on the mat!\n\nCoach",
    tags: [],
    // videos: [W1_PLAYLIST.sections[2].playlist[2]],
  },
  {
    id: 4,
    title: '',
    owner: Coach.Gal,
    date: date4.toISOString(),
    entry:
    "Hello team! 🥋\n\nI hope you're all ready for an exciting week of training ahead. This week, we're going to focus on developing our guard retention techniques and escapes from side control. Don't forget to revise the instructional videos on these topics.\n\nLet's push ourselves this week and improve our defense on the ground. Remember, consistency is key in Jiu-Jitsu. See you on the mat!\n\nCoach",
    tags: ['juji'],
    // videos: [],
  },
  {
    id: 5,
    title: '',
    owner: Coach.Yam,
    date: date5.toISOString(),
    entry:
    "Good day, warriors! 🥋\n\nGet ready for a week full of drilling and sparring! We will work on transitions from guard to mount, and basic submissions from mount. Go through the tutorial videos on these topics to prepare.\n\nJiu-Jitsu is a game of movement and control. So let's master these transitions! Looking forward to seeing your progress.\n\nCan't wait to see you all on the mat!\n\nCoach",
    tags: ['open guard', 'ezekiel'],
    // videos: [],
  },
  {
    id: 6,
    title: '',
    owner: Coach.Gal,
    date: date6.toISOString(),
    entry:
    "Hello, Jiu-Jitsu practitioners! 🥋\n\nThis week, we'll focus on improving our stand-up game. We'll cover key take-down techniques and defenses. Be sure to revisit the training videos on Single Leg and Double Leg take-downs.\n\nRemember, Jiu-Jitsu starts standing up. So let's make our stand-up game as strong as our ground game! See you in training.\n\nCoach",
    tags: ['x-choke'],
    // videos: [],
  },
  {
    id: 7,
    title: '',
    owner: Coach.Yam,
    date: date7.toISOString(),
    entry:
    "Hello team! 🥋\n\nWelcome to a new year of training! This week we'll focus on drilling basics to dust off any holiday cobwebs. White belts will review basic submissions, while blue belts will work on chaining attacks.\n\nSee you on the mat!\n\nCoach",
    tags: [],
    // videos: [],
  },
  {
    id: 8,
    title: '',
    owner: Coach.Gal,
    date: date8.toISOString(),
    entry:
    "Season's greetings, warriors! 🥋\n\nDespite the holiday season, let's keep our training consistent. This week, we'll work on escapes from disadvantageous positions. Remember, the best offense is a good defense.\n\nKeep the holiday treats in moderation and see you in training!\n\nCoach",
    tags: ['armbar'],
    // videos: [],
  },
  {
    id: 9,
    title: '',
    owner: Coach.Yam,
    date: date9.toISOString(),
    entry:
    "Hello, Jiu-Jitsu practitioners! 🥋\n\nAs we approach the end of the year, let's reflect on our progress and areas for improvement. This week we'll focus on guard passing techniques. As always, check the app for tutorial videos.\n\nLet's end this year on a strong note. See you in training!\n\nCoach",
    tags: ['torreada'],
    // videos: [],
  },
];
