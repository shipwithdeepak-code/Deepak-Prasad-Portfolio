import React, { useState, useEffect, Suspense, lazy } from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import { openCalendly } from "./utils/calendly";
import { downloadResumePDF } from "./utils/downloadResume";
import {
  ALL_FLAGSHIP_CASE_STUDIES,
  RESHAMANDI_CASE_STUDY,
} from "./data/caseStudies";
import { CaseStudyDetail } from "./types";

const WorkPage = lazy(() => import("./components/WorkPage"));
const CaseStudyDetailPage = lazy(() => import("./components/CaseStudyDetailPage"));
const AboutPage = lazy(() => import("./components/AboutPage"));
const ResumePage = lazy(() => import("./components/ResumePage"));
const ContactPage = lazy(() => import("./components/ContactPage"));
const CaseStudyModal = lazy(() => import("./components/CaseStudyModal"));
const ContactModal = lazy(() => import("./components/ContactModal"));
const ResumeModal = lazy(() => import("./components/ResumeModal"));
const CopilotWidget = lazy(() => import("./components/CopilotWidget"));

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const p = window.location.pathname;
      return p && p !== "" ? p : "/";
    }
    return "/";
  });

  const [isCaseStudyModalOpen, setIsCaseStudyModalOpen] = useState(false);
  const [selectedModalCaseStudy, setSelectedModalCaseStudy] =
    useState<CaseStudyDetail>(RESHAMANDI_CASE_STUDY);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Sync state with browser popstate
  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      setCurrentPath(p && p !== "" ? p : "/");
      const h = window.location.hash.replace("#", "");
      if (h) {
        setTimeout(() => {
          const el = document.getElementById(h);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Handle initial page load with hash in URL
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const h = window.location.hash.replace("#", "");
      if (h) {
        setTimeout(() => {
          const el = document.getElementById(h);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 250);
      }
    }
  }, []);

  // Global Escape key listener for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        if (isCaseStudyModalOpen) setIsCaseStudyModalOpen(false);
        if (isContactModalOpen) setIsContactModalOpen(false);
        if (isResumeModalOpen) setIsResumeModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [isCaseStudyModalOpen, isContactModalOpen, isResumeModalOpen]);

  const scrollToHash = (hash: string, attempts = 0) => {
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (attempts < 15) {
      setTimeout(() => scrollToHash(hash, attempts + 1), 70);
    }
  };

  const navigate = (path: string) => {
    const [targetPath, targetHash] = path.split("#");
    const normalizedTargetPath = targetPath === "" ? "/" : targetPath;
    const isSamePage = normalizedTargetPath === currentPath;

    window.history.pushState(null, "", path);
    setCurrentPath(normalizedTargetPath);

    if (targetHash) {
      if (!isSamePage) {
        window.scrollTo({ top: 0 });
      }
      setTimeout(
        () => {
          scrollToHash(targetHash);
        },
        isSamePage ? 40 : 100
      );
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSelectCaseStudy = (caseStudy: CaseStudyDetail) => {
    setSelectedModalCaseStudy(caseStudy);
  };

  // Resolve current active route
  const renderCurrentView = () => {
    // 1. Case Study Dedicated Page: /work/:slug
    if (currentPath.startsWith("/work/")) {
      const slug = currentPath.replace("/work/", "").toLowerCase();
      const matched = ALL_FLAGSHIP_CASE_STUDIES.find(
        (c) => c.slug.toLowerCase() === slug || c.id.toLowerCase() === slug
      );
      if (matched) {
        return (
          <CaseStudyDetailPage caseStudy={matched} onNavigate={navigate} />
        );
      }
      // Fallback to ReshaMandi if slug not recognized
      return (
        <CaseStudyDetailPage
          caseStudy={RESHAMANDI_CASE_STUDY}
          onNavigate={navigate}
        />
      );
    }

    // 2. Work Index Page: /work
    if (currentPath === "/work") {
      return (
        <WorkPage
          onNavigate={navigate}
          onSelectCaseStudy={handleSelectCaseStudy}
        />
      );
    }

    // 3. About Page: /about
    if (currentPath === "/about") {
      return (
        <AboutPage
          onNavigate={navigate}
          onOpenResumeModal={() => downloadResumePDF()}
        />
      );
    }

    // 4. Resume Page: /resume
    if (currentPath === "/resume") {
      return (
        <ResumePage
          onNavigate={navigate}
          onOpenResumeModal={() => downloadResumePDF()}
        />
      );
    }

    // 5. Contact Page: /contact
    if (currentPath === "/contact") {
      return <ContactPage onNavigate={navigate} />;
    }

    // Default: Homepage: /
    return (
      <HomePage
        onNavigate={navigate}
        onSelectCaseStudy={handleSelectCaseStudy}
        onOpenResumeModal={() => downloadResumePDF()}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFDFB] text-[#042718] selection:bg-[#188E39]/20 selection:text-[#042718]">
      {/* Persistent Navigation */}
      <Navigation
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenResumeModal={() => downloadResumePDF()}
        onOpenContactModal={() => openCalendly()}
      />

      {/* Main Page View */}
      <main className="flex-1 w-full">
        <Suspense fallback={null}>{renderCurrentView()}</Suspense>
      </main>

      {/* Persistent Footer */}
      <Footer
        onNavigate={navigate}
        onOpenResumeModal={() => downloadResumePDF()}
        onOpenContactModal={() => setIsContactModalOpen(true)}
        onSelectCaseStudy={(id) => {
          const found =
            ALL_FLAGSHIP_CASE_STUDIES.find(
              (c) => c.id === id || c.slug === id
            ) || RESHAMANDI_CASE_STUDY;
          setSelectedModalCaseStudy(found);
          setIsCaseStudyModalOpen(true);
        }}
      />

      {/* Interactive Modals */}
      <Suspense fallback={null}>
        {isCaseStudyModalOpen && (
          <CaseStudyModal
            caseStudy={selectedModalCaseStudy}
            isOpen={isCaseStudyModalOpen}
            onClose={() => setIsCaseStudyModalOpen(false)}
            onOpenContact={() => {
              setIsCaseStudyModalOpen(false);
              setIsContactModalOpen(true);
            }}
          />
        )}

        {isContactModalOpen && (
          <ContactModal
            isOpen={isContactModalOpen}
            onClose={() => setIsContactModalOpen(false)}
          />
        )}

        {isResumeModalOpen && (
          <ResumeModal
            isOpen={isResumeModalOpen}
            onClose={() => setIsResumeModalOpen(false)}
            onOpenContact={() => {
              setIsResumeModalOpen(false);
              setIsContactModalOpen(true);
            }}
          />
        )}

        {/* RAG-based AI Copilot Widget */}
        <CopilotWidget
          onOpenBookChat={() => openCalendly()}
          onNavigate={navigate}
        />
      </Suspense>
    </div>
  );
}
