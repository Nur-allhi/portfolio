import "./Button.css";

type ButtonProps = {
  variant?: "primary" | "ghost";
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export function Button({ variant = "primary", href, children, onClick }: ButtonProps) {
  const cls = `btn ${variant === "primary" ? "btn-primary" : "btn-ghost"}`;
  if (href) return <a className={cls} href={href}>{children}</a>;
  return <button className={cls} onClick={onClick}>{children}</button>;
}
