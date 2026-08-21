export interface Course {
  id: string;
  title: string;
  provider: string;
  year: string;
  status: "completed" | "in-progress";
  description: string;
}

export const courses: Course[] = [
  {
    id: "webdev",
    title: "Web Development",
    provider: "Programming Hero",
    year: "2021",
    status: "completed",
    description:
      "Full-track bootcamp — from HTML fundamentals to shipping responsive web apps.",
  },
  {
    id: "pgd",
    title: "PGD in Network Solutions & System Administration",
    provider: "IsDB Scholarship",
    year: "Present",
    status: "in-progress",
    description:
      "Post-graduate diploma covering network design, administration and system hardening.",
  },
];
