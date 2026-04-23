import { notFound } from "next/navigation";
import { OpportunitiesPage } from "@/app/opportunities/_components/opportunities-page";
import { listSnapshotRepositories } from "@/lib/opportunities/snapshot";
import { repositoryFromCommunitySegments } from "@/lib/opportunities/routing";

interface CommunityRepositoryPageProps {
  params: Promise<{
    repository: string[];
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const repositories = await listSnapshotRepositories();

    return repositories
      .map((repository) => ({
        repository: repository
          .split("/")
          .map((segment) => segment.trim())
          .filter(Boolean),
      }))
      .filter((entry) => entry.repository.length > 0);
  } catch (error) {
    console.error("Failed to generate static params for /community", error);
    return [];
  }
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
