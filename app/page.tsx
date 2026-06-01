"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const works = [
  {
    title: "AI brand engine",
    tag: "Automation / Identity",
    bg: "#f1e8e4",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1400",
  },
  {
    title: "Workflow command",
    tag: "SaaS / Dashboard",
    bg: "#111111",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400",
  },
  {
    title: "Agent studio",
    tag: "AI / Product",
    bg: "#b9141d",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1400",
  },
  {
    title: "Creative intelligence",
    tag: "Research / Systems",
    bg: "#ead7dc",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400",
  },
];

const archiveProjects = [
  {
    no: "01",
    title: "AI workflow automation",
    type: "AI / SaaS",
    desc: "Automated lead routing, follow-ups, task creation, and CRM syncing with intelligent agents.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1800",
  },
  {
    no: "02",
    title: "Predictive analytics platform",
    type: "Data / AI",
    desc: "A dashboard that transforms raw business data into predictive insights and executive summaries.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1800",
  },
  {
    no: "03",
    title: "Customer support agent",
    type: "Support / AI",
    desc: "An AI assistant that reads customer tickets, suggests replies, and escalates complex cases.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1800",
  },
  {
    no: "04",
    title: "Marketing intelligence suite",
    type: "Growth / AI",
    desc: "Campaign insights, competitor tracking, and automated content suggestions in one interface.",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1800",
  },
  {
    no: "05",
    title: "Internal operations dashboard",
    type: "Ops / SaaS",
    desc: "A central workspace for approvals, reporting, internal tasks, and team productivity workflows.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1800",
  },
];

const testimonials = [
  "NeuraFlow helped us automate repetitive sales work within days.",
  "The AI workflows feel clean, fast and surprisingly human.",
  "A strong product demo with memorable motion and clarity.",
  "The scroll experience made the product feel premium and alive.",
  "Exactly the kind of AI demo we wanted to show investors.",
];

export default function Home() {
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      gsap
        .timeline()
        .fromTo(
          ".hero-kicker",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
        )
        .fromTo(
          ".hero-title span",
          { y: 120, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.3"
        )
        .fromTo(
          ".hero-image",
          { scale: 1.2, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.8"
        );

      let horizontalTween: gsap.core.Tween | undefined;

      if (!isMobile) {
        const track = document.querySelector<HTMLElement>(".works-track");

        if (track) {
          horizontalTween = gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: ".works-pin",
              start: "top top",
              end: () => `+=${track.scrollWidth - window.innerWidth}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      }

      gsap.utils.toArray<HTMLElement>(".work-panel").forEach((panel) => {
        const card = panel.querySelector<HTMLElement>(".work-card");
        const img = panel.querySelector<HTMLElement>(".panel-img");
        const title = panel.querySelector<HTMLElement>(".panel-title");
        const meta = panel.querySelector<HTMLElement>(".panel-meta");
        const number = panel.querySelector<HTMLElement>(".panel-number");
        const copy = panel.querySelector<HTMLElement>(".panel-copy");

        if (!card || !img) return;

        const triggerConfig =
          !isMobile && horizontalTween
            ? {
                trigger: panel,
                containerAnimation: horizontalTween,
                start: "left 80%",
                end: "right 20%",
                scrub: 1,
              }
            : {
                trigger: panel,
                start: "top 82%",
                end: "bottom 20%",
                scrub: 1,
              };

        gsap
          .timeline({ scrollTrigger: triggerConfig })
          .fromTo(
            card,
            { scale: 0.82, borderRadius: "48px", opacity: 0.65 },
            {
              scale: 1,
              borderRadius: "0px",
              opacity: 1,
              ease: "none",
              duration: 0.5,
            }
          )
          .to(card, {
            scale: 0.88,
            borderRadius: "48px",
            opacity: 0.9,
            ease: "none",
            duration: 0.5,
          });

        gsap.fromTo(
          img,
          { scale: 1.28, clipPath: "inset(16% 16% 16% 16%)" },
          {
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: triggerConfig,
          }
        );

        gsap.fromTo(
          [meta, title, copy, number].filter(Boolean),
          { opacity: 0, y: 90 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: "none",
            scrollTrigger:
              !isMobile && horizontalTween
                ? {
                    trigger: panel,
                    containerAnimation: horizontalTween,
                    start: "left 70%",
                    end: "center center",
                    scrub: 1,
                  }
                : {
                    trigger: panel,
                    start: "top 78%",
                    end: "top 35%",
                    scrub: 1,
                  },
          }
        );
      });

      if (!isMobile) {
        const cursor = document.querySelector<HTMLElement>(".project-cursor");

        const moveCursor = (e: MouseEvent) => {
          if (!cursor) return;
          gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.25,
            ease: "power3.out",
          });
        };

        window.addEventListener("mousemove", moveCursor);

        gsap.utils.toArray<HTMLElement>(".work-panel").forEach((panel) => {
          panel.addEventListener("mouseenter", () => {
            gsap.to(".project-cursor", {
              opacity: 1,
              scale: 1,
              duration: 0.3,
              ease: "power3.out",
            });
          });

          panel.addEventListener("mouseleave", () => {
            gsap.to(".project-cursor", {
              opacity: 0,
              scale: 0.4,
              duration: 0.3,
              ease: "power3.out",
            });
          });
        });
      }

      // stable pinned vertical archive
      const archivePanels = gsap.utils.toArray<HTMLElement>(".archive-panel");

if (archivePanels.length) {
  gsap.set(archivePanels, {
    yPercent: 100,
    autoAlpha: 0,
  });

  gsap.set(archivePanels[0], {
    yPercent: 0,
    autoAlpha: 1,
  });

  archivePanels.forEach((panel) => {
    const bg = panel.querySelector<HTMLElement>(".archive-bg");

    if (bg) {
      gsap.set(bg, {
        scale: 1.18,
      });
    }
  });

  const archiveTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".archive-pin",
      start: "top top",
      end: () => `+=${(archivePanels.length - 1) * window.innerHeight}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  archivePanels.forEach((panel, index) => {
    const currentBg = panel.querySelector<HTMLElement>(".archive-bg");

    if (index === 0 && currentBg) {
      archiveTl.to(
        currentBg,
        {
          scale: 1,
          duration: 1,
          ease: "none",
        },
        0
      );
    }

    if (index === 0) return;

    const prevBg =
      archivePanels[index - 1].querySelector<HTMLElement>(".archive-bg");
    const nextBg = panel.querySelector<HTMLElement>(".archive-bg");

    archiveTl
      .to(
        archivePanels[index - 1],
        {
          yPercent: -100,
          autoAlpha: 0,
          duration: 1,
          ease: "none",
        },
        index - 1
      )
      .to(
        panel,
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "none",
        },
        index - 1
      )
      .to(
        nextBg,
        {
          scale: 1,
          duration: 1,
          ease: "none",
        },
        index - 1
      )
      .to(
        prevBg,
        {
          scale: 1.05,
          duration: 1,
          ease: "none",
        },
        index - 1
      )
      .to(
        ".archive-progress",
        {
          width: `${((index + 1) / archivePanels.length) * 100}%`,
          duration: 1,
          ease: "none",
        },
        index - 1
      );
  });
}

      if (!isMobile) {
  const testimonialTrack =
    document.querySelector<HTMLElement>(".testimonial-track");

  if (testimonialTrack) {
    gsap.to(testimonialTrack, {
      x: () => -(testimonialTrack.scrollWidth - window.innerWidth + 96),
      ease: "none",
      scrollTrigger: {
        trigger: ".testimonial-pin",
        start: "top top",
        end: () => `+=${testimonialTrack.scrollWidth - window.innerWidth + 96}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  }
}

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 70 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      gsap.to(".marquee-track", {
        xPercent: -50,
        duration: 18,
        ease: "none",
        repeat: -1,
      });

      setTimeout(() => ScrollTrigger.refresh(), 1000);
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="overflow-x-hidden bg-[#f3eeee] text-[#111]">
      <div className="project-cursor pointer-events-none fixed left-0 top-0 z-[999] hidden h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black text-xs uppercase tracking-[0.2em] text-white opacity-0 md:flex">
        View
      </div>

      <Header />
      <Hero />
      <WorksShowcase />
      <Archive />
      <Testimonials />
      <Footer />
    </main>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 top-0 z-[100] w-full px-5 py-5">
        <div className="flex items-center justify-between">
          <a className="text-xs font-semibold uppercase tracking-[0.25em]">
            NeuraFlow AI
          </a>

          <nav className="hidden gap-8 text-xs uppercase tracking-[0.18em] md:flex">
            <a href="#works">Works</a>
            <a href="#archive">Archive</a>
            <a href="#contact">Contact</a>
          </nav>

          <button
            onClick={() => setOpen(true)}
            className="rounded-full border border-black/20 p-3"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[200] bg-black text-white">
          <button
            onClick={() => setOpen(false)}
            className="absolute right-5 top-5 rounded-full border border-white/20 p-3"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>

          <div className="flex h-full flex-col justify-center px-8">
            {["Works", "Archive", "Contact"].map((item, i) => (
              <a
                key={item}
                onClick={() => setOpen(false)}
                href={item === "Contact" ? "#contact" : `#${item.toLowerCase()}`}
                className="border-b border-white/10 py-6 text-6xl font-light tracking-[-0.08em]"
              >
                0{i + 1} {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden px-5 pt-24">
      <div className="mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl items-end gap-10 pb-16 md:grid-cols-[0.9fr_1.1fr]">
        <div className="z-10">
          <p className="hero-kicker mb-6 text-xs uppercase tracking-[0.35em] text-black/45">
            AI systems / automation / product design
          </p>

          <h1 className="hero-title text-6xl font-light leading-[0.9] tracking-[-0.075em] md:text-[118px]">
            <span className="block">Where bold</span>
            <span className="block">AI ideas</span>
            <span className="block">take shape</span>
          </h1>
        </div>

        <div className="relative h-[68vh] overflow-hidden rounded-[2rem] md:h-[82vh]">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1500"
            alt="AI concept"
            className="hero-image h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function WorksShowcase() {
  return (
    <section id="works" className="works-pin relative overflow-hidden">
      <div className="works-track hidden h-screen md:flex">
        {works.map((work, index) => (
          <Panel key={work.title} work={work} index={index} />
        ))}
      </div>

      <div className="md:hidden">
        {works.map((work, index) => (
          <Panel key={work.title} work={work} index={index} />
        ))}
      </div>
    </section>
  );
}

function Panel({
  work,
  index,
}: {
  work: (typeof works)[number];
  index: number;
}) {
  const isDark = work.bg === "#111111" || work.bg === "#b9141d";

  return (
    <article
      className={`work-panel relative flex min-h-screen w-full flex-shrink-0 items-center overflow-hidden px-5 py-24 md:h-screen md:w-screen md:px-16 ${
        isDark ? "text-white" : "text-black"
      }`}
      style={{ backgroundColor: work.bg }}
    >
      <div
        className={`pointer-events-none absolute left-0 top-8 text-[22vw] font-light uppercase leading-none tracking-[-0.1em] ${
          isDark ? "text-white/10" : "text-black/10"
        }`}
      >
        CASES
      </div>

      <div className="work-card relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 overflow-hidden bg-white/10 p-5 backdrop-blur-sm md:grid-cols-[0.9fr_1.1fr] md:p-10">
        <div>
          <p
            className={`panel-meta mb-5 text-xs uppercase tracking-[0.35em] ${
              isDark ? "text-white/55" : "text-black/45"
            }`}
          >
            {work.tag}
          </p>

          <h2 className="panel-title max-w-3xl text-5xl font-light leading-tight tracking-[-0.07em] md:text-8xl">
            {work.title}
          </h2>

          <p
            className={`panel-copy mt-6 max-w-md leading-7 ${
              isDark ? "text-white/55" : "text-black/55"
            }`}
          >
            AI product system / scroll interaction / animated showcase.
          </p>

          <p
            className={`panel-number mt-10 text-8xl font-light tracking-[-0.09em] ${
              isDark ? "text-white/20" : "text-black/20"
            }`}
          >
            0{index + 1}
          </p>
        </div>

        <div className="relative h-[58vh] overflow-hidden rounded-[2rem] md:h-[72vh]">
          <img
            src={work.image}
            alt={work.title}
            className="panel-img h-full w-full object-cover"
          />
        </div>
      </div>
    </article>
  );
}

function Archive() {
  return (
    <section
      id="archive"
      className="archive-pin relative h-screen overflow-hidden bg-black text-white"
    >
      <div className="absolute left-5 top-24 z-30 md:left-16">
        <p className="text-xs uppercase tracking-[0.35em] text-white/55">
          Projects archive
        </p>
      </div>

      <div className="archive-progress absolute bottom-0 left-0 z-40 h-1 w-0 bg-white" />

      {archiveProjects.map((project) => (
        <div
          key={project.title}
          className="archive-panel absolute inset-0 flex h-screen items-center overflow-hidden px-5 md:px-16"
        >
          <img
            src={project.image}
            alt={project.title}
            className="archive-bg absolute inset-0 h-full w-full object-cover opacity-65"
          />

          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-black/20" />

          <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-[180px_1fr_260px] md:items-center">
            <p className="archive-number text-8xl font-light tracking-[-0.08em] text-white/25 md:text-[180px]">
              {project.no}
            </p>

            <div>
              <p className="archive-type mb-6 text-xs uppercase tracking-[0.35em] text-white/55">
                {project.type}
              </p>

              <h3 className="archive-title text-6xl font-light leading-[0.9] tracking-[-0.075em] text-white md:text-[110px]">
                {project.title}
              </h3>

              <p className="archive-desc mt-8 max-w-2xl text-lg leading-8 text-white/65">
                {project.desc}
              </p>
            </div>

            <div className="archive-arrow flex h-24 w-24 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md">
              <ArrowUpRight size={28} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

function Testimonials() {
  return (
    <section className="testimonial-pin relative overflow-hidden bg-[#111] text-white md:h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_30%)]" />

      <div className="relative z-10 flex min-h-screen flex-col justify-center px-5 py-24 md:px-16 md:py-0">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/35">
              Client Notes
            </p>
            <h2 className="mt-6 max-w-3xl text-5xl font-light leading-tight tracking-[-0.07em] md:text-8xl">
              What teams say after launch.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/45">
            Selected responses from teams using AI workflows, dashboards, and automation systems.
          </p>
        </div>

        <div className="testimonial-track flex flex-col gap-5 md:w-max md:flex-row md:gap-6">
          {testimonials.map((quote, index) => (
            <article
              key={quote}
              className="testimonial-card group relative flex min-h-[360px] w-full flex-shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-xl transition md:w-[440px]"
            >
              <div className="absolute right-6 top-6 text-8xl font-light leading-none text-white/5">
                0{index + 1}
              </div>

              <div>
                <p className="mb-8 text-xs uppercase tracking-[0.28em] text-white/35">
                  Client 0{index + 1}
                </p>

                <p className="text-2xl font-light leading-snug tracking-[-0.04em]">
                  “{quote}”
                </p>
              </div>

              <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-5">
                <div>
                  <p className="text-sm text-white/70">Product Team</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/30">
                    AI / SaaS
                  </p>
                </div>

                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition group-hover:rotate-45">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-[#f3eeee] px-5 py-20">
      <div className="marquee-track flex w-max gap-10 text-[20vw] font-light uppercase leading-none tracking-[-0.12em] text-black md:text-[16vw]">
        <span>NeuraFlow</span>
        <span>NeuraFlow</span>
        <span>NeuraFlow</span>
        <span>NeuraFlow</span>
      </div>
    </footer>
  );
}