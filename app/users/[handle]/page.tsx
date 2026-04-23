import { notFound } from "next/navigation";
import { OpportunitiesPage } from "@/components/opportunities-page";
import { authorHandleFromRoute } from "@/lib/opportunities/routing";

interface UserProfilePageProps {
  params: Promise<{
    handle: string;
  }>;
}

export default async function UserProfilePage({ params }: UserProfilePageProps) {
  const resolvedParams = await params;
  const handle = authorHandleFromRoute(resolvedParams.handle ?? "");

  if (!handle) {
    notFound();
  }

  return <OpportunitiesPage forcedAuthor={handle} />;
}
