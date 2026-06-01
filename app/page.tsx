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

const archive = [
  "AI workflow automation",
  "Predictive analytics platform",
  "Customer support agent",
  "Marketing intelligence suite",
  "Internal operations dashboard",
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
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
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
          "-=0.3",
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
          "-=0.8",
        );

      let horizontalTween: gsap.core.Tween | undefined;

      if (!isMobile) {
        const track = document.querySelector<HTMLElement>(".works-track");
        const panels = gsap.utils.toArray<HTMLElement>(".work-panel");

        if (track && panels.length) {
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

        const zoomTl = gsap.timeline({
          scrollTrigger: triggerConfig,
        });

        zoomTl
          .fromTo(
            card,
            {
              scale: 0.82,
              borderRadius: "48px",
              opacity: 0.65,
            },
            {
              scale: 1,
              borderRadius: "0px",
              opacity: 1,
              ease: "none",
              duration: 0.5,
            },
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
          {
            scale: 1.28,
            clipPath: "inset(16% 16% 16% 16%)",
          },
          {
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: triggerConfig,
          },
        );

        gsap.fromTo(
          [meta, title, copy, number].filter(Boolean),
          {
            opacity: 0,
            y: 90,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: !isMobile
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
          },
        );
      });

      if (!isMobile) {
  const testimonialTrack =
    document.querySelector<HTMLElement>(".testimonial-track");

  if (testimonialTrack) {
    gsap.to(testimonialTrack, {
      x: () => -(testimonialTrack.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: ".testimonial-pin",
        start: "top top",
        end: () => `+=${testimonialTrack.scrollWidth - window.innerWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  }
}

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

      gsap.utils.toArray<HTMLElement>(".archive-row").forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 90%" },
          },
        );
      });

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
          },
        );
      });

      gsap.to(".marquee-track", {
        xPercent: -50,
        duration: 18,
        ease: "none",
        repeat: -1,
      });

      setTimeout(() => ScrollTrigger.refresh(), 500);
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
                href={
                  item === "Contact" ? "#contact" : `#${item.toLowerCase()}`
                }
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
    <section id="archive" className="bg-[#f6f1f1] px-5 py-24 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-14 flex justify-between">
          <h2 className="text-5xl font-light tracking-[-0.07em] md:text-8xl">
            Projects archive
          </h2>
          <p className="hidden text-xs uppercase tracking-[0.25em] text-black/40 md:block">
            5 selected systems
          </p>
        </div>

        <div>
          {archive.map((item, i) => (
            <div
              key={item}
              className="archive-row grid border-t border-black/15 py-8 md:grid-cols-[80px_1fr_200px_120px]"
            >
              <p className="text-black/35">0{i + 1}</p>
              <h3 className="text-3xl font-light tracking-[-0.04em] md:text-5xl">
                {item}
              </h3>
              <p className="mt-4 text-sm uppercase tracking-[0.18em] text-black/35 md:mt-0">
                AI / SaaS
              </p>
              <ArrowUpRight className="mt-4 md:mt-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="testimonial-pin relative overflow-hidden bg-[#f3eeee] py-24 md:h-screen md:py-0">
      <div className="absolute left-5 top-20 z-10 md:left-16">
        <p className="text-xs uppercase tracking-[0.35em] text-black/35">
          Few words from clients
        </p>
      </div>

      <div className="testimonial-track flex flex-col gap-8 px-5 pt-28 md:h-screen md:w-max md:flex-row md:items-center md:gap-10 md:px-16 md:pt-0">
        {[
          "NeuraFlow helped us automate repetitive sales work within days.",
          "The AI workflows feel clean, fast and surprisingly human.",
          "A strong product demo with memorable motion and clarity.",
          "The scroll experience made the product feel premium and alive.",
          "Exactly the kind of AI demo we wanted to show investors.",
        ].map((quote, index) => (
          <div
            key={quote}
            className="testimonial-card flex min-h-[320px] w-full flex-shrink-0 flex-col justify-between rounded-[2rem] bg-white p-9 shadow-xl md:h-[390px] md:w-[520px] md:p-12"
          >
            <p className="text-6xl text-black/15">“</p>

            <p className="text-2xl font-light leading-relaxed tracking-[-0.03em]">
              {quote}
            </p>

            <div className="flex items-center justify-between border-t border-black/10 pt-5">
              <p className="text-xs uppercase tracking-[0.25em] text-black/35">
                Client 0{index + 1}
              </p>
              <ArrowUpRight size={18} />
            </div>
          </div>
        ))}
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
