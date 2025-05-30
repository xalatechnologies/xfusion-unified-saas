
"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pb-10 pt-32 font-light text-white antialiased md:pb-16 md:pt-20"
    >
      <div
        className="absolute right-0 top-0 h-1/2 w-1/2"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.15) 0%, rgba(13, 10, 25, 0) 60%)",
        }}
      />
      <div
        className="absolute left-0 top-0 h-1/2 w-1/2 -scale-x-100"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.15) 0%, rgba(13, 10, 25, 0) 60%)",
        }}
      />

      <div className="container relative z-10 mx-auto max-w-2xl px-4 text-center md:max-w-4xl md:px-6 lg:max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="mb-6 inline-block rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-blue-300">
            NEXT GENERATION MAINTENANCE & SUPPLY CHAIN
          </span>
          <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-light md:text-5xl lg:text-7xl">
            {t('landing.hero.title')}
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-blue-100/80 md:text-xl">
            {t('landing.hero.subtitle')}
          </p>

          <div className="mb-10 sm:mb-0 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/signup"
              className="relative w-full overflow-hidden rounded-xl border border-blue-400/20 bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-white shadow-xl transition-all duration-300 hover:from-blue-500 hover:to-indigo-500 hover:shadow-2xl hover:shadow-blue-500/25 sm:w-auto"
            >
              {t('landing.hero.getStarted')}
            </Link>
            <a
              href="#features"
              className="flex w-full items-center justify-center gap-2 text-blue-200 transition-colors hover:text-white sm:w-auto"
            >
              <span>{t('landing.hero.watchDemo')}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </a>
          </div>
        </motion.div>
        
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <div className="w-full flex h-32 md:h-48 relative overflow-hidden mb-4">
            <img
              src="https://blocks.mvp-subha.me/assets/earth.png"
              alt="Global Operations"
              className="absolute px-4 top-0 left-1/2 -translate-x-1/2 mx-auto -z-10 opacity-60"
            />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl overflow-hidden rounded-xl shadow-2xl shadow-blue-500/20 border border-blue-400/20">
            <img
              src="/lovable-uploads/74528ea3-af78-4d04-b707-15daf4860450.png"
              alt="SupplyMantix Dashboard - Work Orders Management"
              className="h-auto w-full rounded-xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
