import { CommunitiesPage } from "@/app/community/_components/communities-page";
import type { CommunitySummary } from "@/lib/opportunities/communities";
import { listSnapshotCommunities } from "@/lib/opportunities/communities";

export const revalidate = 10800;

export default async function CommunityIndexPage() {
  let communities: CommunitySummary[] = [];

  try {
    communities = await listSnapshotCommunities();
  } catch (error) {
    console.error("Failed to load communities page", error);
  }

  return <CommunitiesPage communities={communities} />;
}
