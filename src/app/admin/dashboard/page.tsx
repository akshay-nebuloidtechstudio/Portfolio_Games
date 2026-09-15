import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getStats() {
  const [
    pendingAccessRequests,
    totalUsers,
    activeUsers,
    suspendedUsers,
    revokedUsers,
    totalGames,
    publishedGames,
    draftGames,
    archivedGames,
  ] = await Promise.all([
    prisma.accessRequest.count({ where: { status: "PENDING" } }),
    prisma.user.count(),
    prisma.user.count({ where: { status: "ACTIVE" } }),
    prisma.user.count({ where: { status: "SUSPENDED" } }),
    prisma.user.count({ where: { status: "REVOKED" } }),
    prisma.game.count(),
    prisma.game.count({ where: { status: "PUBLISHED" } }),
    prisma.game.count({ where: { status: "DRAFT" } }),
    prisma.game.count({ where: { status: "ARCHIVED" } }),
  ]);

  return {
    pendingAccessRequests,
    totalUsers,
    activeUsers,
    suspendedUsers,
    revokedUsers,
    totalGames,
    publishedGames,
    draftGames,
    archivedGames,
  };
}

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href?: string;
}) {
  const content = (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        {value}
      </p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block transition-opacity hover:opacity-80">
        {content}
      </Link>
    );
  }

  return content;
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Overview of your platform
      </p>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Access Requests
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Pending Requests"
            value={stats.pendingAccessRequests}
            href="/admin/access-requests"
          />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Users
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Users" value={stats.totalUsers} />
          <StatCard
            label="Active"
            value={stats.activeUsers}
            href="/admin/users?status=ACTIVE"
          />
          <StatCard
            label="Suspended"
            value={stats.suspendedUsers}
            href="/admin/users?status=SUSPENDED"
          />
          <StatCard
            label="Revoked"
            value={stats.revokedUsers}
            href="/admin/users?status=REVOKED"
          />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Games
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Games" value={stats.totalGames} />
          <StatCard
            label="Published"
            value={stats.publishedGames}
            href="/admin/games?status=PUBLISHED"
          />
          <StatCard
            label="Draft"
            value={stats.draftGames}
            href="/admin/games?status=DRAFT"
          />
          <StatCard
            label="Archived"
            value={stats.archivedGames}
            href="/admin/games?status=ARCHIVED"
          />
        </div>
      </div>
    </div>
  );
}
