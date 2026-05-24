import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingFooter from "@/components/landing/LandingFooter";
import SEOHead from "@/components/common/SEOHead";
import heroTeam from "@/assets/marketing-hero-team.jpg";
import heroNature from "@/assets/marketing-hero-nature.jpg";
import heroPortrait from "@/assets/marketing-hero-portrait.jpg";

const values = [
  {
    title: "Built for creators",
    desc: "Every model, studio and tool is designed around the people who actually ship work — not benchmarks.",
  },
  {
    title: "Honest by default",
    desc: "Clear pricing, transparent credits, and AI that tells you when it is not sure.",
  },
  {
    title: "Made in Egypt, for the world",
    desc: "Rooted in Cairo. Built in 50+ languages. Serving creators on every continent.",
  },
  {
    title: "Privacy is a feature",
    desc: "Your work is yours. We never train on private projects and you can delete everything in a single click.",
  },
];

const stats = [
  { value: "80+", label: "AI models unified" },
  { value: "50+", label: "Languages supported" },
  { value: "10M+", label: "Assets generated" },
  { value: "2026", label: "Founded in Cairo" },
];

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div data-theme="dark" className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SEOHead
        title="About Megsy AI — One Platform for Every Creator"
        description="Megsy AI unifies the world's best models for chat, slides, images, video and code into one calm, honest creative workspace."
        path="/about"
      />
      <LandingNavbar />

      {/* HERO */}
      <section className="relative w-full overflow-hidden pt-20">
        <div className="relative mx-auto max-w-7xl px-3 md:px-6">
          <div className="relative h-[50vh] min-h-[340px] w-full overflow-hidden rounded-3xl md:h-[65vh] md:min-h-[480px]">
            <img
              src={heroTeam}
              alt="The Megsy team"
              loading="eager"
              fetchPriority="high"
              width={1920}
              height={1080}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="absolute inset-x-0 bottom-0 px-6 pb-12 md:pb-16"
            >
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">
                About Megsy
              </p>
              <h1 className="font-display text-[12vw] font-black uppercase leading-[0.9] tracking-tighter text-white drop-shadow-2xl md:text-[5.5vw]">
                One calm home for
                <br />
                every creative tool.
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-16 md:py-24">
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
              Built to make creating with AI feel quiet again.
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
              Megsy started with a simple frustration — every new model arrived in its own
              tab, with its own credits, its own quirks. Creators were spending more time
              switching apps than actually making things.
            </p>
            <p>
              So we built one calm workspace: chat, slides, deep research, images, video,
              cinema, lip-sync and full-stack code — running on the world's best engines,
              priced in one honest currency, made in Cairo for the whole world.
            </p>
            <p>
              We are still small, still proudly independent, and still obsessed with one
              question: what would it feel like if AI tools simply got out of your way?
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

      {/* VALUES with nature image */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative h-[420px] overflow-hidden rounded-3xl md:h-[560px]"
            >
              <img
                src={heroNature}
                alt=""
                loading="lazy"
                width={1920}
                height={1080}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </motion.div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">
                What we believe
              </p>
              <h2 className="mt-4 font-display text-3xl font-black uppercase leading-tight tracking-tight text-white md:text-4xl">
                Four quiet principles that guide every decision.
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

      {/* PORTRAIT CTA */}
      <section className="px-4 pb-20 md:pb-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl">
          <img
            src={heroPortrait}
            alt=""
            loading="lazy"
            width={1600}
            height={1920}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/20" />
          <div className="relative z-10 max-w-2xl px-8 py-20 md:px-16 md:py-32">
            <h2 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl">
              Make something quietly extraordinary.
            </h2>
            <p className="mt-5 max-w-md text-base text-white/70 md:text-lg">
              Free credits every day. Eighty models on tap. One honest workspace.
            </p>
            <button
              onClick={() => navigate("/auth?mode=signup")}
              className="mt-8 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
            >
              Start creating
            </button>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default AboutPage;
