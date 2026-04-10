import ContactQueryDetail from "@/components/admin/contact/ContactQueryDetail";

type ContactQueryDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ContactQueryDetailPage({ params }: ContactQueryDetailPageProps) {
  const { id } = await params;

  return <ContactQueryDetail queryId={id} />;
}
