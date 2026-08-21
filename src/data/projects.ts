export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  stack: string[];
  repoUrl: string;
  liveUrl?: string;
  status?: string;
}

export const projects: Project[] = [
  {
    id: "moneyflows",
    number: "/01",
    title: "MoneyFlows",
    description:
      "Family finance dashboard — shared accounts, stacked loans and member-by-member spending in one dark, fast panel.",
    stack: ["React", "TypeScript", "Tailwind"],
    repoUrl: "https://github.com/Nur-allhi/moneyflows",
    liveUrl: "#",
  },
  {
    id: "yardflow",
    number: "/02",
    title: "YardFlow",
    description:
      "A workflow companion app — the second release in the product line, sharing the MoneyFlows design system. Details being refined.",
    stack: ["React", "Node.js", "SQLite"],
    repoUrl: "https://github.com/Nur-allhi/yardflow",
    status: "in development",
  },
  {
    id: "eniptv",
    number: "/03",
    title: "EN IPTV Player",
    description:
      "Live IPTV player for Samsung Tizen TV — a remote-first 10-foot UI with a channel sidebar and glass playback controls.",
    stack: ["Tizen", "JavaScript", "HLS"],
    repoUrl: "https://github.com/Nur-allhi/EN_TvPlayer",
  },
];
