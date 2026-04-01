import WorkshopCard from "@/components/workshops/WorkshopCard";
import { fetchWorkshops } from "@/lib/workshops";

export const revalidate = 300;

export default async function WorkshopsPage() {
  const workshops = await fetchWorkshops({ revalidateSeconds: revalidate });

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 md:py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-white md:text-4xl">Workshops</h1>
        <p className="mt-3 text-sm text-zinc-400 md:text-base">
          Explore all available workshops and choose what fits you best.
        </p>
      </div>

      {workshops.length ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {workshops.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-12 text-center text-zinc-400">
          No workshops are available at the moment.
        </div>
      )}
    </section>
  );
}
