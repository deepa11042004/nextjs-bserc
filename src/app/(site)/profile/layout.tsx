import type { ReactNode } from "react";

import { UserDashboardShell } from "@/components/layout/UserDashboardShell";

export default function ProfileDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <UserDashboardShell>{children}</UserDashboardShell>;
}
