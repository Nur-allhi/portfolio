import "./Chip.css";

export function Chip({ children }: { children: React.ReactNode }) {
  return <span className="chip">{children}</span>;
}
