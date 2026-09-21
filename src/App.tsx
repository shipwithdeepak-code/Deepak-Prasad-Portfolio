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
import { getRouteMetadata } from "./utils/seo";

const WorkPage = lazy(() => import("./components/WorkPage"));
const CaseStudyDetailPage = lazy(() => import("./components/CaseStudyDetailPage"));
const AboutPage = lazy(() => import("./components/AboutPage"));
const ResumePage = lazy(() => import("./components/ResumePage"));
const ContactPage = lazy(() => import("./components/ContactPage"));
const CaseStudyModal = lazy(() => import("./components/CaseStudyModal"));
const ContactModal = lazy(() => import("./components/ContactModal"));
const ResumeModal = lazy(() => import("./components/ResumeModal"));
const ProductJuryPost = lazy(() => import("./components/ProductJuryPost"));
const CopilotWidget = lazy(() => import("./components/CopilotWidget"));
const NotFoundPage = lazy(() => import("./components/NotFoundPage"));

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

  useEffect(() => {
    const meta = getRouteMetadata(currentPath);

    document.title = meta.title;

    const set = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector);
      if (!el && selector.startsWith("meta")) {
        el = document.createElement("meta");
        const parts = selector.match(/meta\[([^=]+)="([^"]+)"\]/);
        if (parts) {
          el.setAttribute(parts[1], parts[2]);
          document.head.appendChild(el);
        }
      }
      if (el) el.setAttribute(attr, value);
    };

    set('meta[name="description"]', "content", meta.description);
    set('link[rel="canonical"]', "href", meta.canonical);
    set('meta[property="og:url"]', "content", meta.ogUrl);
    set('meta[property="og:title"]', "content", meta.ogTitle);
    set('meta[property="og:description"]', "content", meta.ogDescription);
    set('meta[property="og:type"]', "content", meta.ogType);
    set('meta[name="twitter:title"]', "content", meta.twitterTitle);
    set('meta[name="twitter:description"]', "content", meta.twitterDescription);
  }, [currentPath]);

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
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
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
      return <NotFoundPage onNavigate={navigate} />;
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

    // 5. Product Jury build note: /writing/product-jury
    if (currentPath === "/writing/product-jury") {
      return <ProductJuryPost onNavigate={navigate} />;
    }

    // 6. Contact Page: /contact
    if (currentPath === "/contact") {
      return <ContactPage onNavigate={navigate} />;
    }

    // 7. Homepage: /
    if (currentPath === "/" || currentPath === "") {
      return (
        <HomePage
          onNavigate={navigate}
          onSelectCaseStudy={handleSelectCaseStudy}
          onOpenResumeModal={() => downloadResumePDF()}
        />
      );
    }

    // 8. 404 Fallback for unknown routes
    return <NotFoundPage onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFDFB] text-[#042718] selection:bg-[#188E39]/20 selection:text-[#042718]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-[#042718] focus:text-white focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>

      {/* Persistent Navigation */}
      <Navigation
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenResumeModal={() => downloadResumePDF()}
        onOpenContactModal={() => openCalendly()}
      />

      {/* Main Page View */}
      <main id="main-content" className="flex-1 w-full">
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
