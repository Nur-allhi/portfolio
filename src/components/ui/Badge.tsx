import "./Badge.css";

type BadgeProps = {
  variant: "done" | "live";
  children: React.ReactNode;
};

export function Badge({ variant, children }: BadgeProps) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}
