"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyWishlist, removeFromWishlist } from "@/services/userDashboard";
import type { WishlistItem } from "@/types/userDashboard";

function formatDate(value: string | null): string {
  if (!value) {
    return "Saved recently";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "Saved recently";
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function WishlistPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadWishlist = async () => {
      setIsLoading(true);

      try {
        const response = await getMyWishlist();

        if (!isMounted) {
          return;
        }

        setItems(response.data);
        setErrorMessage(null);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        const message = error instanceof Error
          ? error.message
          : "Unable to load wishlist right now.";

        setErrorMessage(message);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadWishlist();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRemove = async (workshopId: number) => {
    setRemovingId(workshopId);

    try {
      await removeFromWishlist(workshopId);
      setItems((prev) => prev.filter((item) => item.workshop_id !== workshopId));
    } catch {
      setErrorMessage("Could not remove this workshop from wishlist.");
    } finally {
      setRemovingId(null);
    }
  };

  if (isLoading) {
    return (
      <Card className="border-slate-800 bg-slate-900/70">
        <CardContent className="flex items-center justify-center py-10 text-slate-200">
          <Loader2 className="h-5 w-5 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <Card className="border-slate-800 bg-slate-900/70">
        <CardHeader>
          <CardTitle className="text-white">Wishlist</CardTitle>
          <CardDescription className="text-slate-300">
            Save interesting workshops and enroll when you are ready.
          </CardDescription>
        </CardHeader>
      </Card>

      {errorMessage ? (
        <Card className="border-rose-500/40 bg-rose-950/20">
          <CardContent className="py-3 text-sm text-rose-200">{errorMessage}</CardContent>
        </Card>
      ) : null}

      {items.length === 0 ? (
        <Card className="border-slate-800 bg-slate-900/70">
          <CardContent className="space-y-3 py-8 text-center">
            <Heart className="mx-auto h-7 w-7 text-cyan-300" />
            <p className="text-slate-200">Your wishlist is empty.</p>
            <Link href="/all-programs">
              <Button className="bg-cyan-600 text-white hover:bg-cyan-500">
                Explore Programs
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <Card key={item.id} className="border-slate-800 bg-slate-900/70">
              <CardContent className="space-y-4 py-4">
                <div>
                  <p className="text-base font-semibold text-white">{item.workshop_title}</p>
                  <p className="text-xs text-slate-300">Saved on {formatDate(item.created_at)}</p>
                </div>

                <p className="line-clamp-2 text-sm text-slate-300">{item.description || "Workshop details available on program page."}</p>

                <div className="flex flex-wrap gap-2">
                  <Link href={item.enroll_url}>
                    <Button className="bg-cyan-600 text-white hover:bg-cyan-500">
                      Enroll Now
                    </Button>
                  </Link>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-rose-500/50 bg-rose-500/10 text-rose-100 hover:bg-rose-500/20"
                    disabled={removingId === item.workshop_id}
                    onClick={() => handleRemove(item.workshop_id)}
                  >
                    {removingId === item.workshop_id ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="mr-2 h-4 w-4" />
                    )}
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
