import { notFound } from "next/navigation";
import { OpportunitiesPage } from "@/app/opportunities/_components/opportunities-page";
import { listSnapshotRepositories } from "@/lib/opportunities/snapshot";
import { repositoryFromCommunitySegments } from "@/lib/opportunities/routing";
import { getSnapshotCommunityByRepository } from "@/lib/opportunities/communities";

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
  } catch {
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

  const communitySummary = await getSnapshotCommunityByRepository(repository);

  return (
    <OpportunitiesPage
      forcedRepository={repository}
      forcedRepositoryProfile={
        communitySummary ?? {
          repository,
          name: repository.split("/")[0] ?? repository,
          avatarUrl: "",
          region: "Unknown",
          country: "Unknown",
          opportunitiesCount: 0,
          lastPostedAt: null,
        }
      }
    />
  );
}
