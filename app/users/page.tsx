import { UsersPage } from "@/app/users/_components/users-page";
import type { UserSummary } from "@/lib/opportunities/users";
import { listSnapshotUsers } from "@/lib/opportunities/users";

export const revalidate = 10800;

export default async function UsersIndexPage() {
  let users: UserSummary[] = [];

  try {
    users = await listSnapshotUsers();
  } catch (error) {
    console.error("Failed to load users page", error);
  }

  return <UsersPage users={users} />;
}
