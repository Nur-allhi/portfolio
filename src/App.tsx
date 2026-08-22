import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { BackToTop } from "./components/ui/BackToTop";
import { Portfolio } from "./pages/Portfolio";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { Login } from "./pages/admin/Login";
import { Dashboard } from "./pages/admin/Dashboard";
import { AdminProjects } from "./pages/admin/Projects";
import { AdminEducation } from "./pages/admin/Education";
import { BlogAdmin } from "./pages/admin/BlogAdmin";
import { AdminSocials } from "./pages/admin/Socials";
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminGuard } from "./components/admin/AdminGuard";

function PublicLayout() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100svh", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1 }}><Outlet /></div>
        <Footer />
      </div>
      <BackToTop />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Route>
        <Route path="/admin/login" element={<Login />} />
        <Route element={<AdminGuard />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/projects" element={<AdminProjects />} />
            <Route path="/admin/education" element={<AdminEducation />} />
            <Route path="/admin/blog" element={<BlogAdmin />} />
            <Route path="/admin/socials" element={<AdminSocials />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
