import { redirect } from "next/navigation";

export default function FacultyRouteRedirectPage() {
  redirect("/admin/mentors");
}