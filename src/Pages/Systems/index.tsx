
//Style > Course > CourseVideo
//******courses********
export interface CourseVideo {
  id: number;
  course: string;
  url: string;
  titleHEB: string;
  titleEN: string;
  descriptionHEB: string;
  descriptionEN: string;
}

export interface Course {
  index: number;
  style: "gi" | "nogi";
  courseTitle: string;
  nameEN: string;
  nameHEB: string;
  playlist: CourseVideo[];
}

export interface Style {
  index: number;
  style: "gi" | "nogi";
  playlistTitle: string;
  nameEN: string;
  nameHEB: string;
  courses: Course[];
}

export interface Style {
  style: 'gi' | "nogi"
}

export const Berimbolo_1: Course = {
  index: 0,
  style: "gi",
  courseTitle: "berimbolo_1",
  nameEN: "Berimbolo Basics",
  nameHEB: "אימון בסיס של ברימבולו",
  playlist: [
    {
      id: 0,
      course: "berimbolo_1",
      url: "vNy80pSha-w",
      titleHEB: "מבוא לברימבולו",
      titleEN: "Introduction To Berimbolo",
      descriptionHEB: "",
      descriptionEN: "Introduction To Berimbolo",
    },
    {
      id: 1,
      course: "berimbolo_1",
      url: "6cNcxd8xYf0",
      titleHEB: "תרגול ברימבולו למאונט",
      titleEN: "Berimbolo To Mount Exercise",
      descriptionHEB: "",
      descriptionEN: "Berimbolo To Mount Exercise",
    },
    {
      id: 2,
      course: "berimbolo_1",
      url: "SHCUaAaa_Xk",
      titleHEB: "תרגול ברימבולו דריכה",
      titleEN: "Berimbolo Stepping Exercise",
      descriptionHEB: "",
      descriptionEN: "Berimbolo Stepping Exercise",
    },
    {
      id: 3,
      course: "berimbolo_1",
      url: "OAUx5cvEaDo",
      titleHEB: "הוצאת שיווי משקל מדה לה ריווה",
      titleEN: "Shifting Balance From De la Riva",
      descriptionHEB: "",
      descriptionEN: "Shifting Balance From De la Riva",
    },
    {
      id: 4,
      course: "berimbolo_1",
      url: "7ExvrM5_jOk",
      titleHEB: "דריכה מלא מדה לה ריוה",
      titleEN: "Full Step From De la Riva",
      descriptionHEB: "",
      descriptionEN: "Full Step From De la Riva",
    },
  ],
};

export const Half_Guard_1: Course = {
  index: 0,
  style: "nogi",
  courseTitle: "half_guard",
  nameEN: "Half Guard - Bottom Leg Switch",
  nameHEB: "חצי גארד - חילוף רגל תחתונה",
  playlist: [
    {
      id: 0,
      course: "half_guard",
      url: "E9fNq33FNBg",
      titleHEB: "כניסה לטייט וויסט מני שילד גבוה",
      titleEN: "",
      descriptionHEB: "כניסה לטייט וויסט מני שילד גבוה",
      descriptionEN: "",
    },
    {
      id: 0,
      course: "half_guard",
      url: "hJ4boJT9xdU",
      titleHEB: "מבוא לחצי גארד חילוף רגל תחתונה",
      titleEN: "Introduction to lower leg spare half guard",
      descriptionHEB: "מבוא לחצי גארד חילוף רגל תחתונה",
      descriptionEN: "Introduction to lower leg spare half guard",
    },
  ],
};

export const GI_PLAYLIST: Course[] = [Berimbolo_1];
export const GI_COURSES: Style = {
  index: 0,
  style: "gi",
  playlistTitle: "GI_COURSES",
  nameEN: "Gi Courses",
  nameHEB: "",
  courses: GI_PLAYLIST,
};

export const NOGI_PLAYLIST: Course[] = [Half_Guard_1];
export const NOGI_COURSES: Style = {
  index: 1,
  style: "nogi",
  playlistTitle: "NOGI_COURSES",
  nameEN: "No Gi Courses",
  nameHEB: "",
  courses: NOGI_PLAYLIST,
};
