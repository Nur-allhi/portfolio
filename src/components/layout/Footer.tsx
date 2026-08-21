import "./Footer.css";

export function Footer({ backTo }: { backTo?: string }) {
  return (
    <footer className="site-footer">
      <span>© 2026 Nur E Allhi — built with React, TypeScript & Vite</span>
      <a href={backTo ?? "#home"}>{backTo ? "portfolio ↑" : "back to top ↑"}</a>
    </footer>
  );
}
