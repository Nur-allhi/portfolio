export interface AcademicEntry {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  status: "completed" | "in-progress";
  institution: string;
}

export const academics: AcademicEntry[] = [
  {
    id: "school",
    title: "Higher Secondary School",
    subtitle: "Higher Secondary School Certificate",
    year: "20—",
    status: "completed",
    institution: "—",
  },
  {
    id: "bba",
    title: "BBA",
    subtitle: "Bachelor of Business Administration",
    year: "20— – 20—",
    status: "completed",
    institution: "—",
  },
  {
    id: "mba",
    title: "MBA",
    subtitle: "Master of Business Administration",
    year: "20— – 20—",
    status: "in-progress",
    institution: "—",
  },
];
