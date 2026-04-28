import { forwardInternshipRegistrationRequest } from "@/app/api/internship-registration/_proxy";

export async function GET(
  request: Request,
  context: { params: { id: string } },
) {
  return forwardInternshipRegistrationRequest(
    request,
    `/api/internship/registration/${context.params.id}/passport-photo-url`,
    "GET",
  );
}
