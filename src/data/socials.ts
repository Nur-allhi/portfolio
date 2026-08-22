export type SocialPlatform = "github" | "linkedin" | "facebook" | "instagram" | "whatsapp";
export interface SocialLink {
  id?: string;
  platform: SocialPlatform;
  url: string;
  order: number;
}

export const defaultSocials: SocialLink[] = [
  { platform: "github", url: "https://github.com/Nur-allhi", order: 0 },
  { platform: "linkedin", url: "#", order: 1 },
];
