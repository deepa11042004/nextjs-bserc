import { forwardInstitutionalRegistrationRequest } from "@/app/api/institutional-registration/_proxy";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  return forwardInstitutionalRegistrationRequest(
    request,
    `/api/institutional-registration/${encodeURIComponent(id)}`,
    "DELETE",
  );
}
