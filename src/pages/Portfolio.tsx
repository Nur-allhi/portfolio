import { FlowLine } from "../components/ui/FlowLine";
import { Hero } from "../components/sections/Hero";
import { Objectives } from "../components/sections/Objectives";
import { Projects } from "../components/sections/Projects";
import { ProfessionalCourses } from "../components/sections/ProfessionalCourses";
import { Academics } from "../components/sections/Academics";
import { Contact } from "../components/sections/Contact";

export function Portfolio() {
  return (
    <main className="site-main" id="main">
      <FlowLine />
      <Hero />
      <Objectives />
      <Projects />
      <ProfessionalCourses />
      <Academics />
      <Contact />
    </main>
  );
}
