import Link from "next/link";
import { notFound } from "next/navigation";

type SimplePageConfig = {
  title: string;
  description: string;
  highlights: string[];
};

const SIMPLE_PAGES: Record<string, SimplePageConfig> = {
  membership: {
    title: "Membership",
    description:
      "Join the BSERC community to access workshops, updates, and academic collaboration opportunities.",
    highlights: [
      "Priority updates about upcoming programs",
      "Access to student and faculty opportunities",
      "Participation in BSERC community initiatives",
    ],
  },
  "knowledge-hub": {
    title: "Knowledge Hub",
    description:
      "A curated collection of learning resources in space science, drones, robotics, and innovation.",
    highlights: [
      "Beginner to advanced learning pathways",
      "Curated resources for students and educators",
      "Regularly updated educational content",
    ],
  },
  missions: {
    title: "Missions",
    description:
      "Explore BSERC mission areas and the scientific themes that guide our programs and outreach.",
    highlights: [
      "Space science and technology outreach",
      "Research and innovation initiatives",
      "Student and faculty development programs",
    ],
  },
  "space-quiz": {
    title: "Space Quiz",
    description:
      "Interactive quiz experiences are being prepared for learners to test and grow their space knowledge.",
    highlights: [
      "Topic-based quiz tracks",
      "Progressive difficulty levels",
      "Designed for schools and colleges",
    ],
  },
  glossary: {
    title: "Glossary",
    description:
      "Key space and technology terms explained in a simple and practical format.",
    highlights: [
      "Clear definitions for core concepts",
      "Useful for students and educators",
      "Continuously expanding term library",
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    description:
      "Find answers to common questions about BSERC programs, participation, and registrations.",
    highlights: [
      "Program eligibility and participation",
      "Workshop registration guidance",
      "Institution collaboration information",
    ],
  },
};

const TECH_PARTNERS = [
  {
    id: "isro",
    name: "ISRO",
    summary: "India's premier space agency and innovation driver.",
  },
  {
    id: "esa",
    name: "ESA",
    summary: "European space collaboration and research ecosystem.",
  },
  {
    id: "kat",
    name: "KAT",
    summary: "Technology-oriented collaboration initiatives.",
  },
  {
    id: "jaxa",
    name: "JAXA",
    summary: "Japanese leadership in advanced space missions.",
  },
  {
    id: "nasa",
    name: "NASA",
    summary: "Global benchmark for aerospace research and exploration.",
  },
  {
    id: "un-ggim",
    name: "UN-GGIM",
    summary: "International geospatial policy and governance network.",
  },
];

function TechPartnerPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="text-3xl font-bold text-white md:text-4xl">
          Technology Partners
        </h1>
        <p className="mt-4 max-w-3xl text-slate-300">
          BSERC collaborates across institutions and scientific networks to
          strengthen education, research, and innovation.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {TECH_PARTNERS.map((partner) => (
            <article
              key={partner.id}
              id={partner.id}
              className="rounded-xl border border-slate-800 bg-slate-900/70 p-5"
            >
              <h2 className="text-xl font-semibold text-white">{partner.name}</h2>
              <p className="mt-2 text-sm text-slate-300">{partner.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default async function InfoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug === "tech-partner") {
    return <TechPartnerPage />;
  }

  const config = SIMPLE_PAGES[slug];
  if (!config) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-3xl font-bold text-white md:text-4xl">{config.title}</h1>
        <p className="mt-4 text-slate-300">{config.description}</p>

        <ul className="mt-8 space-y-3">
          {config.highlights.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-3 text-slate-200"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-flex rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
