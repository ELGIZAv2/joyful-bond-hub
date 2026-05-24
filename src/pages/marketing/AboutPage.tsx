import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";
import SEOHead from "@/components/common/SEOHead";
import heroTeam from "@/assets/about-team-working.jpg";
import heroCairo from "@/assets/about-cairo.jpg";
import heroEngineer from "@/assets/about-engineer.jpg";
import founderHamza from "@/assets/about-founder-hamza.jpg";
import founderAbdalla from "@/assets/about-founder-abdalla.jpg";

const divisions = [
  {
    n: "01",
    title: "Cinematic Video Studio",
    sub: "Megsy Video Generation Model",
    desc: "Generate cinematic 8K video from a single prompt. Automatic scene composition, intelligent camera moves, dramatic lighting — no editing skills required.",
  },
  {
    n: "02",
    title: "Hyper-Realistic Image Foundry",
    sub: "Megsy Image Generation Model",
    desc: "Create 4K+ images across 50+ artistic styles. Photoreal portraits, architectural renders and interior concepts on demand.",
  },
  {
    n: "03",
    title: "Chat Nexus",
    sub: "Megsy Multimodal Intelligence",
    desc: "Cross-reasoning across the best frontier models with live web intelligence and verified, multi-source answers.",
  },
  {
    n: "04",
    title: "Code Architect & Web Factory",
    sub: "Megsy Code Generation Model",
    desc: "Describe what you want — Megsy builds full-stack websites and apps with autonomous backend, database design and API architecture.",
  },
  {
    n: "05",
    title: "File & Data Foundry",
    sub: "Document Intelligence",
    desc: "Upload any PDF or spreadsheet. Megsy extracts, analyses and restructures data, generating decks, reports and dashboards.",
  },
  {
    n: "06",
    title: "Slide & Deck Studio",
    sub: "Presentation Intelligence",
    desc: "From idea to investor-ready pitch in minutes. Brand-aware layouts, smart charts, exportable to PPTX or PDF.",
  },
  {
    n: "07",
    title: "The Neural Mesh",
    sub: "Autonomous Orchestration",
    desc: "An orchestration layer where every division communicates autonomously — executing multi-stage projects from concept to deployment.",
  },
];

const founders = [
  {
    name: "Hamza Hassan",
    role: "Founder & Co-CEO",
    img: founderHamza,
    bio: "Product and design at the core. Believes great AI should disappear into the work.",
  },
  {
    name: "Abdalla Mohamed",
    role: "Founder & Co-CEO",
    img: founderAbdalla,
    bio: "Infrastructure and neural engineering. Obsessed with making complex systems feel calm.",
  },
];

const journey = [
  {
    year: "2026",
    title: "The Foundation",
    desc: "Launching the first comprehensive Egyptian AI platform — chat, image, video and code under a single neural infrastructure.",
  },
  {
    year: "2027",
    title: "The Expansion",
    desc: "Scaling across the Middle East and Africa, onboarding enterprise clients, rolling out advanced tools for creators and developers.",
  },
  {
    year: "2028",
    title: "The Sovereign Era",
    desc: "Reaching millions of users globally. Establishing Megsy as a primary engine of the new digital economy.",
  },
];

const values = [
  { title: "Built for creators", desc: "Every model, studio and tool is designed around the people who actually ship work — not benchmarks." },
  { title: "Honest by default", desc: "Clear pricing, transparent credits, and AI that tells you when it isn't sure." },
  { title: "Made in Cairo, for the world", desc: "Rooted in Egypt. Built in 50+ languages. Serving creators on every continent." },
  { title: "Privacy is a feature", desc: "Your work is yours. We never train on private projects, and you can delete everything in one click." },
];

const stats = [
  { value: "7", label: "Sovereign divisions" },
  { value: "80+", label: "AI models unified" },
  { value: "50+", label: "Languages supported" },
  { value: "10M+", label: "Assets generated" },
];

const faqs = [
  {
    q: "What is the Megsy Proprietary AI Model?",
    a: "A neural infrastructure that orchestrates 80+ frontier models behind a single calm workspace, with cross-reasoning between text, image, video, audio and code.",
  },
  {
    q: "How does Megsy ensure data security and privacy?",
    a: "Your private projects are never used for training. Data is encrypted in transit and at rest, with full deletion available in one click and SOC 2-aligned controls across the stack.",
  },
  {
    q: "What is the scalability of the Megsy API infrastructure?",
    a: "Built on globally distributed compute with elastic scaling. Enterprise tiers include dedicated regions, private endpoints and SLA-backed throughput.",
  },
  {
    q: "How does the 20% Lifetime Affiliate Program work?",
    a: "Every affiliate earns 20% on every payment from every user they bring — for life. No caps, no tiers, no expiration.",
  },
  {
    q: "What does enterprise onboarding look like?",
    a: "A dedicated solutions engineer, SSO and SCIM, custom data retention, optional on-prem deployment, and a 30-day pilot.",
  },
  {
    q: "Which third-party integrations does Megsy support?",
    a: "Native connectors for Google Workspace, Microsoft 365, Slack, Notion, Figma, GitHub, Supabase, Stripe and 60+ more — plus a REST API for everything else.",
  },
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

      {/* HERO */}
      <section className="relative w-full overflow-hidden pt-20">
        <div className="relative mx-auto max-w-7xl px-3 md:px-6">
          <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden rounded-3xl md:h-[78vh] md:min-h-[560px]">
            <img
              src={heroTeam}
              alt="The Megsy team at work in Cairo"
              loading="eager"
              fetchPriority="high"
              width={1920}
              height={1080}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="absolute inset-x-0 bottom-0 px-6 pb-12 md:pb-20"
            >
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">
                About Megsy AI
              </p>
              <h1 className="font-display text-[11vw] font-black uppercase leading-[0.88] tracking-tighter text-white drop-shadow-2xl md:text-[5.5vw]">
                The sovereign AI
                <br />
                entity for intelligence.
              </h1>
              <p className="mt-6 max-w-xl text-base text-white/75 md:text-lg">
                Seven divisions. One neural mesh. Designed in Cairo. Deployed globally.
              </p>
            </motion.div>
          </div>
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">
              Our story
            </p>
            <h2 className="mt-4 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-5xl">
              We believe AI is the sovereign right of every creator.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-5 text-base leading-relaxed text-white/65 md:col-span-7 md:text-lg"
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

      {/* STATS */}
      <section className="border-y border-white/[0.06] py-14">
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
              <p className="font-display text-4xl font-black text-white md:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-wider text-white/45">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SEVEN DIVISIONS */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 max-w-3xl"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">
              The platform
            </p>
            <h2 className="mt-4 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-5xl">
              Seven sovereign divisions.
            </h2>
            <p className="mt-5 text-base text-white/60 md:text-lg">
              An exhaustive suite of AI-powered departments, each engineered to dominate its
              vertical — and connected through a single orchestration layer.
            </p>
          </motion.div>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.06] md:grid-cols-2">
            {divisions.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="bg-background p-8 md:p-10"
              >
                <p className="font-mono text-xs text-white/30">{d.n}</p>
                <h3 className="mt-3 font-display text-xl font-bold text-white md:text-2xl">
                  {d.title}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/40">
                  {d.sub}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-[15px]">
                  {d.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CAIRO IMAGE BAND */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img
          src={heroCairo}
          alt="Cairo at golden hour"
          loading="lazy"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="max-w-2xl"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/75">
                Designed in Cairo
              </p>
              <h2 className="mt-4 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl">
                A neural mesh that connects all.
              </h2>
              <p className="mt-6 max-w-xl text-base text-white/80 md:text-lg">
                Every division communicates autonomously — executing complex multi-stage
                projects from concept to deployment, without you ever leaving the canvas.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">
              The founders
            </p>
            <h2 className="mt-4 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-5xl">
              Two commanders. One mission.
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            {founders.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={f.img}
                    alt={f.name}
                    loading="lazy"
                    width={1024}
                    height={1280}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="p-7 md:p-8">
                  <h3 className="font-display text-2xl font-bold text-white">{f.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-white/45">
                    {f.role}
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/65">{f.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="border-y border-white/[0.06] py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14 max-w-2xl"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">
              The journey
            </p>
            <h2 className="mt-4 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-5xl">
              From Cairo to the world.
            </h2>
          </motion.div>

          <div className="space-y-10">
            {journey.map((j, i) => (
              <motion.div
                key={j.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="grid items-baseline gap-6 border-t border-white/[0.08] pt-10 md:grid-cols-[180px_1fr]"
              >
                <p className="font-display text-3xl font-black text-white/80 md:text-4xl">
                  {j.year}
                </p>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
                    {j.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/60 md:text-base">
                    {j.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES with engineer image */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative h-[460px] overflow-hidden rounded-3xl md:h-[600px]"
            >
              <img
                src={heroEngineer}
                alt="Megsy engineer at work"
                loading="lazy"
                width={1600}
                height={1280}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </motion.div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">
                What we believe
              </p>
              <h2 className="mt-4 font-display text-3xl font-black uppercase leading-tight tracking-tight text-white md:text-5xl">
                Four quiet principles.
              </h2>
              <div className="mt-10 space-y-7">
                {values.map((v, i) => (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="border-l border-white/15 pl-5"
                  >
                    <h3 className="text-base font-semibold text-white">{v.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                      {v.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/[0.06] py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">
              Questions
            </p>
            <h2 className="mt-4 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-5xl">
              Frequently asked.
            </h2>
          </motion.div>

          <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {faqs.map((f, i) => (
              <div key={f.q}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-white"
                >
                  <span className="text-base font-medium text-white md:text-lg">{f.q}</span>
                  <span className="text-2xl text-white/40">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="pb-6 text-[15px] leading-relaxed text-white/60"
                  >
                    {f.a}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 md:pb-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl">
          <img
            src={heroCairo}
            alt=""
            loading="lazy"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
          <div className="relative z-10 max-w-2xl px-8 py-20 md:px-16 md:py-32">
            <h2 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl">
              Build the future with Megsy.
            </h2>
            <p className="mt-5 max-w-md text-base text-white/75 md:text-lg">
              The sovereign AI platform designed in Cairo and deployed globally. Take your
              ideas from concept to reality.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/auth?mode=signup")}
                className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
              >
                Start creating
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
              >
                Talk to us
              </button>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default AboutPage;
