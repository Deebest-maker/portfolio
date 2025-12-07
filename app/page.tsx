"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import ParticleSystem from "./components/ParticleSystem";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Blog from "./components/Blog";
import Experience from "./components/Experience";
import GitHubActivity from "./components/GitHubActivity";
import Contact from "./components/Contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <CustomCursor />
          <ParticleSystem />
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <Stats />
            <Skills />
            <Projects />
            <Blog />
            <Experience />
            <GitHubActivity />
            <Contact />
          </main>
        </>
      )}
    </>
  );
}
