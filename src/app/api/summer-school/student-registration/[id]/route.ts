import { forwardSummerSchoolRequest } from "@/app/api/summer-school/_proxy";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  return forwardSummerSchoolRequest(
    request,
    `/api/summer-school/student-registration/${encodeURIComponent(id)}`,
    "DELETE",
  );
}
