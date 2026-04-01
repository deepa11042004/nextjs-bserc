import Link from "next/link";
import { notFound } from "next/navigation";

type PeoplePageConfig = {
  title: string;
  description: string;
};

const PEOPLE_PAGES: Record<string, PeoplePageConfig> = {
  faculty: {
    title: "Faculty and Guest Faculty",
    description:
      "Meet the educators and domain experts supporting BSERC learning pathways.",
  },
  "research-scholar": {
    title: "Research Scholars",
    description:
      "Explore the scholars and contributors participating in BSERC research and projects.",
  },
  staff: {
    title: "Staff",
    description:
      "Connect with BSERC staff members who support programs, operations, and outreach.",
  },
  speaker: {
    title: "Speakers",
    description:
      "Browse invited speakers who share insights across science, technology, and innovation.",
  },
  "fdp-members": {
    title: "FDP Members",
    description:
      "Information hub for faculty development program members and participants.",
  },
};

export default async function PeopleCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const page = PEOPLE_PAGES[category];

  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-3xl font-bold text-white md:text-4xl">{page.title}</h1>
        <p className="mt-4 text-slate-300">{page.description}</p>

        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/70 p-6">
          <p className="text-slate-200">
            This section has been published to ensure route availability in
            production. Full profile data can be plugged in here at any time.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/about"
            className="inline-flex rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
          >
            About BSERC
          </Link>
          <Link
            href="/contact"
            className="inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
