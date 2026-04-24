import { notFound } from "next/navigation";
import { OpportunitiesPage } from "@/app/opportunities/_components/opportunities-page";
import { listSnapshotAuthorHandles } from "@/lib/opportunities/snapshot";
import { authorHandleFromRoute } from "@/lib/opportunities/routing";
import { getSnapshotUserByHandle } from "@/lib/opportunities/users";

interface UserProfilePageProps {
  params: Promise<{
    handle: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const handles = await listSnapshotAuthorHandles();
    return handles.map((handle) => ({ handle }));
  } catch (error) {
    console.error("Failed to generate static params for /users", error);
    return [];
  }
}

export default async function UserProfilePage({ params }: UserProfilePageProps) {
  const resolvedParams = await params;
  const handle = authorHandleFromRoute(resolvedParams.handle ?? "");

  if (!handle) {
    notFound();
  }

  const userSummary = await getSnapshotUserByHandle(handle);

  return (
    <OpportunitiesPage
      forcedAuthor={handle}
      forcedAuthorProfile={
        userSummary ?? {
          handle,
          name: handle,
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
