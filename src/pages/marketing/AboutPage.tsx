import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";
import SEOHead from "@/components/common/SEOHead";
import founderHamza from "@/assets/about-founder-hamza.png";
import founderAbdalla from "@/assets/about-founder-abdalla.png";
import heroCairo from "@/assets/about-cairo.jpg";

const founders = [
  {
    name: "Hamza Hassan",
    role: "Founder & Co-CEO",
    img: founderHamza,
    bio: "Drives product, design and the obsessive details. Believes great AI should disappear into the work.",
    rotate: -4,
    y: 20,
  },
  {
    name: "Abdalla Mohamed",
    role: "Founder & Co-CEO",
    img: founderAbdalla,
    bio: "Leads infrastructure and the neural mesh. Obsessed with making complex systems feel calm.",
    rotate: 4,
    y: 0,
  },
];

const divisions = [
  { n: "01", title: "Cinematic Video Studio", sub: "Megsy Video Model", desc: "Cinematic 8K video from a single prompt. Automatic scene composition, intelligent camera moves, dramatic lighting." },
  { n: "02", title: "Hyper-Realistic Image Foundry", sub: "Megsy Image Model", desc: "4K+ images across 50+ artistic styles. Photoreal portraits, architectural renders, interior concepts on demand." },
  { n: "03", title: "Chat Nexus", sub: "Multimodal Intelligence", desc: "Cross-reasoning across frontier models with live web intelligence and verified, multi-source answers." },
  { n: "04", title: "Code Architect", sub: "Code Generation Model", desc: "Describe what you want — Megsy builds full-stack apps with autonomous backend, database design and APIs." },
  { n: "05", title: "File & Data Foundry", sub: "Document Intelligence", desc: "Upload any PDF or spreadsheet. Megsy extracts, analyses and restructures data into decks and dashboards." },
  { n: "06", title: "Slide & Deck Studio", sub: "Presentation Intelligence", desc: "From idea to investor-ready pitch in minutes. Brand-aware layouts, smart charts, exportable to PPTX or PDF." },
  { n: "07", title: "The Neural Mesh", sub: "Autonomous Orchestration", desc: "An orchestration layer where every division communicates autonomously — concept to deployment in one flow." },
];

const stats = [
  { value: "7", label: "Sovereign divisions" },
  { value: "80+", label: "Models unified" },
  { value: "50+", label: "Languages" },
  { value: "10M+", label: "Assets generated" },
];

const journey = [
  { year: "2026", title: "The Foundation", desc: "First comprehensive Egyptian AI platform — chat, image, video and code under one neural infrastructure." },
  { year: "2027", title: "The Expansion", desc: "Scaling across the Middle East and Africa. Onboarding enterprise clients. Tools for creators and developers." },
  { year: "2028", title: "The Sovereign Era", desc: "Millions of users globally. Megsy becomes a primary engine of the new digital economy." },
];

const values = [
  { title: "Built for creators", desc: "Every model, studio and tool designed around people who ship — not benchmarks." },
  { title: "Honest by default", desc: "Clear pricing, transparent credits, AI that tells you when it isn't sure." },
  { title: "Made in Cairo, for the world", desc: "Rooted in Egypt. Built in 50+ languages. Serving creators on every continent." },
  { title: "Privacy is a feature", desc: "Your work is yours. We never train on private projects. Delete everything in one click." },
];

const faqs = [
  { q: "What is the Megsy Proprietary AI Model?", a: "A neural infrastructure that orchestrates 80+ frontier models behind a single calm workspace, with cross-reasoning between text, image, video, audio and code." },
  { q: "How does Megsy ensure data security and privacy?", a: "Your private projects are never used for training. Data is encrypted in transit and at rest, with full deletion in one click and SOC 2-aligned controls across the stack." },
  { q: "What is the scalability of the Megsy API infrastructure?", a: "Built on globally distributed compute with elastic scaling. Enterprise tiers include dedicated regions, private endpoints and SLA-backed throughput." },
  { q: "How does the 20% Lifetime Affiliate Program work?", a: "Every affiliate earns 20% on every payment from every user they bring — for life. No caps, no tiers, no expiration." },
  { q: "What does enterprise onboarding look like?", a: "A dedicated solutions engineer, SSO and SCIM, custom data retention, optional on-prem deployment, and a 30-day pilot." },
  { q: "Which integrations does Megsy support?", a: "Native connectors for Google Workspace, Microsoft 365, Slack, Notion, Figma, GitHub, Supabase, Stripe and 60+ more — plus a REST API for everything else." },
];

const AboutPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div data-theme="dark" className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SEOHead
        title="About Megsy AI — The Sovereign AI Platform Built in Cairo"
        description="Seven sovereign divisions. One neural mesh. Megsy AI unifies the world's best models for chat, slides, images, video and code into one calm, honest workspace built in Cairo for the world."
        path="/about"
      />
      <LandingNavbar />

      {/* HERO — landing style */}
      <section className="relative flex flex-col items-center overflow-hidden bg-background pb-10 pt-32 md:min-h-screen md:pt-44">
        <div className="relative z-30 mx-auto w-full px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground"
          >
            About Megsy AI
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-[9vw] uppercase leading-[0.95] tracking-tight text-foreground md:text-[5.5vw]"
          >
            Two founders.{" "}
            <span className="text-primary">One sovereign mission.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl px-2 text-[13px] leading-snug text-muted-foreground md:mt-6 md:text-lg"
          >
            Seven divisions. One neural mesh. Designed in Cairo. Deployed globally. The
            sovereign AI entity for intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-8 md:gap-4"
          >
            <button
              onClick={() => navigate("/auth")}
              className="group relative overflow-hidden rounded-full p-[2px] transition-transform hover:scale-[1.03]"
              style={{
                background:
                  "conic-gradient(from var(--angle, 0deg), #c0c0c0, #ffffff, #8a8a8a, #ffffff, #c0c0c0)",
                animation: "silver-spin 4s linear infinite",
              }}
            >
              <span className="relative block rounded-full bg-black px-8 py-3 text-sm font-semibold text-white md:px-10 md:py-4 md:text-base">
                Join the mission
              </span>
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="rounded-full border border-border/40 bg-white/5 px-8 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/10 md:px-10 md:py-4 md:text-base"
            >
              Talk to us
            </button>
          </motion.div>
        </div>

        {/* Founder portrait fan — same vocabulary as HeroSection videos */}
        <div className="relative z-0 mt-10 flex w-full max-w-[1100px] items-end justify-center gap-4 px-4 pb-4 md:mt-14 md:gap-8">
          {founders.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 100, rotate: f.rotate }}
              animate={{ opacity: 1, y: f.y, rotate: f.rotate }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.15, ease: "easeOut" }}
              className="relative w-[44%] overflow-hidden rounded-2xl border border-border/30 shadow-2xl md:w-[26%]"
              style={{ aspectRatio: "3/4" }}
            >
              <img
                src={f.img}
                alt={f.name}
                loading="eager"
                width={1024}
                height={1365}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 md:p-5">
                <p className="font-display text-sm font-bold text-white md:text-base">
                  {f.name}
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/70 md:text-xs">
                  {f.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STATS marquee-style */}
      <section className="border-y border-border/30 bg-background py-10 md:py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="text-center md:text-left"
            >
              <p className="font-display text-4xl font-black text-foreground md:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 md:grid-cols-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-5"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Our story
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight text-foreground md:text-5xl">
              AI is the sovereign{" "}
              <span className="text-primary">right of every creator.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-5 text-base leading-relaxed text-muted-foreground md:col-span-7 md:text-lg"
          >
            <p>
              Megsy started with a frustration any creator knows — every new model arrived in
              its own tab, with its own pricing, its own quirks. People were spending more
              time switching apps than actually making things.
            </p>
            <p>
              So we built one calm workspace: chat, slides, deep research, images, video,
              cinema, lip-sync and full-stack code — running on the world's best engines,
              priced in one honest currency, made in Cairo for the whole world.
            </p>
            <p>
              We are still proudly independent, still small enough to answer every email, and
              still obsessed with one question: what would it feel like if AI tools simply got
              out of your way?
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOUNDERS — full editorial cards */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14 max-w-3xl"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              The founders
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight text-foreground md:text-6xl">
              The two builders <span className="text-primary">behind Megsy.</span>
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            {founders.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="overflow-hidden rounded-3xl border border-border/30 bg-white/[0.02]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={f.img}
                    alt={f.name}
                    loading="lazy"
                    width={1024}
                    height={1280}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-7 md:p-9">
                  <h3 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                    {f.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {f.role}
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                    {f.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVISIONS grid */}
      <section className="border-y border-border/30 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 max-w-3xl"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              The platform
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight text-foreground md:text-6xl">
              Seven sovereign <span className="text-primary">divisions.</span>
            </h2>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              An exhaustive suite of AI-powered departments, each engineered to dominate its
              vertical — connected through a single orchestration layer.
            </p>
          </motion.div>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-border/30 bg-border/40 md:grid-cols-2">
            {divisions.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.04 }}
                className="bg-background p-8 transition-colors hover:bg-white/[0.02] md:p-10"
              >
                <p className="font-mono text-xs text-primary">{d.n}</p>
                <h3 className="mt-3 font-display text-xl font-bold text-foreground md:text-2xl">
                  {d.title}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {d.sub}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                  {d.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CAIRO BAND */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img
          src={heroCairo}
          alt="Cairo at golden hour"
          loading="lazy"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="max-w-2xl"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80">
                Designed in Cairo
              </p>
              <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight text-white md:text-6xl">
                A neural mesh that <span className="text-primary">connects all.</span>
              </h2>
              <p className="mt-6 max-w-xl text-base text-white/80 md:text-lg">
                Every division communicates autonomously — executing complex multi-stage
                projects from concept to deployment, without ever leaving the canvas.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14 max-w-2xl"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              The journey
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight text-foreground md:text-6xl">
              From Cairo <span className="text-primary">to the world.</span>
            </h2>
          </motion.div>

          <div>
            {journey.map((j, i) => (
              <motion.div
                key={j.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="grid items-baseline gap-6 border-t border-border/30 py-10 md:grid-cols-[180px_1fr]"
              >
                <p className="font-display text-3xl font-black text-primary md:text-4xl">
                  {j.year}
                </p>
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                    {j.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
                    {j.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="border-y border-border/30 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 max-w-3xl"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              What we believe
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight text-foreground md:text-6xl">
              Four quiet <span className="text-primary">principles.</span>
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border-l-2 border-primary/40 pl-6"
              >
                <h3 className="font-display text-xl font-bold text-foreground md:text-2xl">
                  {v.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Questions
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight text-foreground md:text-6xl">
              Frequently <span className="text-primary">asked.</span>
            </h2>
          </motion.div>

          <div className="divide-y divide-border/30 border-y border-border/30">
            {faqs.map((f, i) => (
              <div key={f.q}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-primary"
                >
                  <span className="text-base font-medium text-foreground md:text-lg">
                    {f.q}
                  </span>
                  <span className="text-2xl text-muted-foreground">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="pb-6 text-[15px] leading-relaxed text-muted-foreground"
                  >
                    {f.a}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA — landing style */}
      <section className="relative overflow-hidden border-t border-border/30 px-4 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-[9vw] uppercase leading-[0.95] tracking-tight text-foreground md:text-[5vw]"
          >
            Build the future{" "}
            <span className="text-primary">with Megsy.</span>
          </motion.h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            The sovereign AI platform designed in Cairo and deployed globally. Take your ideas
            from concept to reality.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row md:gap-4">
            <button
              onClick={() => navigate("/auth?mode=signup")}
              className="group relative overflow-hidden rounded-full p-[2px] transition-transform hover:scale-[1.03]"
              style={{
                background:
                  "conic-gradient(from var(--angle, 0deg), #c0c0c0, #ffffff, #8a8a8a, #ffffff, #c0c0c0)",
                animation: "silver-spin 4s linear infinite",
              }}
            >
              <span className="relative block rounded-full bg-black px-10 py-4 text-base font-semibold text-white">
                Start creating
              </span>
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="rounded-full border border-border/40 bg-white/5 px-10 py-4 text-base font-semibold text-foreground transition-colors hover:bg-white/10"
            >
              Talk to us
            </button>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default AboutPage;
