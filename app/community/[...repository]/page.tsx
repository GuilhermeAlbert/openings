import { notFound } from "next/navigation";
import { OpportunitiesPage } from "@/components/opportunities-page";
import { repositoryFromCommunitySegments } from "@/lib/opportunities/routing";

interface CommunityRepositoryPageProps {
  params: Promise<{
    repository: string[];
  }>;
}

export default async function CommunityRepositoryPage({
  params,
}: CommunityRepositoryPageProps) {
  const resolvedParams = await params;
  const repository = repositoryFromCommunitySegments(resolvedParams.repository ?? []);

  if (!repository) {
    notFound();
  }

  return <OpportunitiesPage forcedRepository={repository} />;
}
