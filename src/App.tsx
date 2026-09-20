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
const ProductJuryPost = lazy(() => import("./components/ProductJuryPost"));
const CopilotWidget = lazy(() => import("./components/CopilotWidget"));

const SITE = "https://deepak-prasad.ai.studio";
const DEFAULT_TITLE =
  "Deepak Prasad — Senior Product Manager | AI, 0→1 & Product Strategy";
const DEFAULT_DESC =
  "Senior Product Manager building AI, B2B and B2C products across marketplaces, subscription platforms, connected products and workflow automation.";

const ROUTE_META: Record<string, { title: string; description: string }> = {
  "/": { title: DEFAULT_TITLE, description: DEFAULT_DESC },
  "/work": {
    title: "Selected Work — Deepak Prasad",
    description:
      "Flagship product work across marketplaces, AI coaching, subscriptions and connected fitness hardware.",
  },
  "/about": {
    title: "About — Deepak Prasad",
    description:
      "Seven years building products across marketplaces, AI and subscription platforms. How I work and what I care about.",
  },
  "/resume": {
    title: "Résumé — Deepak Prasad",
    description:
      "Senior Product Manager. Experience, impact and the systems I have shipped.",
  },
  "/contact": {
    title: "Contact — Deepak Prasad",
    description: "Get in touch about product roles, advisory work or a conversation.",
  },
  "/writing/product-jury": {
    title: "Product Jury: a decision workspace that argues back — Deepak Prasad",
    description:
      "How I built a multi-agent critique engine that grades every claim by the evidence behind it, and declines when it cannot establish an answer.",
  },
};

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
    const meta =
      ROUTE_META[currentPath] ??
      (currentPath.startsWith("/work/")
        ? {
            title: "Case Study — Deepak Prasad",
            description: DEFAULT_DESC,
          }
        : { title: DEFAULT_TITLE, description: DEFAULT_DESC });

    document.title = meta.title;

    const set = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    set('meta[name="description"]', "content", meta.description);
    set('link[rel="canonical"]', "href", SITE + currentPath);
    set('meta[property="og:url"]', "content", SITE + currentPath);
    set('meta[property="og:title"]', "content", meta.title);
    set('meta[property="og:description"]', "content", meta.description);
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

    // 5. Product Jury build note: /writing/product-jury
    if (currentPath === "/writing/product-jury") {
      return <ProductJuryPost onNavigate={navigate} />;
    }

    // 6. Contact Page: /contact
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
