import WorkshopCard from "@/components/workshops/WorkshopCard";
import { fetchWorkshops } from "@/lib/workshops";

export const revalidate = 300;

export default async function ProgramsPage() {
  const workshops = await fetchWorkshops({ revalidateSeconds: revalidate });

  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            Programs & Workshops
          </h3>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Explore our latest programs and workshops.
          </p>
        </div>

        {workshops.length ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workshops.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-12 text-center text-sm text-zinc-400">
            No programs are available at this time.
          </div>
        )}
      </div>
    </section>
  );
}
