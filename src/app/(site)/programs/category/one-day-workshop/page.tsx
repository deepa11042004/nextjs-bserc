import WorkshopCard from "@/components/workshops/WorkshopCard";
import { fetchWorkshops } from "@/lib/workshops";

export const revalidate = 300;

function isOneDayDuration(duration?: string): boolean {
  if (!duration) {
    return false;
  }

  return /(^|\s)(1\s*day|one\s*day)(\s|$)/i.test(duration);
}

export default async function OneDayWorkshopPage() {
  const workshops = await fetchWorkshops({ revalidateSeconds: revalidate });
  const oneDayWorkshops = workshops.filter((workshop) =>
    isOneDayDuration(workshop.duration),
  );
  const list = oneDayWorkshops.length ? oneDayWorkshops : workshops;

  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            One Day Workshop
          </h3>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Explore our latest one day workshop programs.
          </p>
        </div>

        {list.length ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-12 text-center text-sm text-zinc-400">
            No one day workshops are available right now.
          </div>
        )}
      </div>
    </section>
  );
}
