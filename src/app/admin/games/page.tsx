"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";

interface Game {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnailUrl: string | null;
  gameUrl: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function GamesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const statusFilter = searchParams.get("status") || "";

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionStatus, setActionStatus] = useState<{
    id: string;
    type: string;
  } | null>(null);

  const fetchGames = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/games");
      const data = await res.json();
      if (!data.success) {
        setError(data.error || "Failed to load games");
        return;
      }
      setGames(data.games);
    } catch {
      setError("An error occurred while loading games");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  async function handleAction(gameId: string, action: string) {
    setActionStatus({ id: gameId, type: action });
    setError(null);
    try {
      const res = await fetch(`/api/admin/games/${gameId}/${action}`, {
        method: "POST",
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error || `Failed to ${action} game`);
        return;
      }
      startTransition(() => {
        fetchGames();
      });
    } catch {
      setError(`An error occurred while trying to ${action} the game`);
    } finally {
      setActionStatus(null);
    }
  }

  function getStatusBadge(status: string) {
    const styles: Record<string, string> = {
      PUBLISHED:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      DRAFT:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      ARCHIVED: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300",
    };
    return (
      <span
        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${styles[status] || ""}`}
      >
        {status}
      </span>
    );
  }

  function getActions(game: Game) {
    const actions: { label: string; action: string; style: string }[] = [];
    if (game.status === "DRAFT") {
      actions.push({
        label: "Publish",
        action: "publish",
        style: "bg-green-600 hover:bg-green-700 text-white",
      });
      actions.push({
        label: "Archive",
        action: "archive",
        style: "bg-zinc-600 hover:bg-zinc-700 text-white",
      });
    } else if (game.status === "PUBLISHED") {
      actions.push({
        label: "Unpublish",
        action: "unpublish",
        style: "bg-yellow-600 hover:bg-yellow-700 text-white",
      });
      actions.push({
        label: "Archive",
        action: "archive",
        style: "bg-zinc-600 hover:bg-zinc-700 text-white",
      });
    }

    if (actions.length === 0) {
      return (
        <span className="text-xs text-zinc-400 dark:text-zinc-500">
          No actions
        </span>
      );
    }

    return (
      <div className="flex items-center gap-1">
        {actions.map((a) => (
          <button
            key={a.action}
            onClick={() => handleAction(game.id, a.action)}
            disabled={actionStatus?.id === game.id}
            className={`rounded px-2 py-1 text-xs font-medium transition-colors disabled:opacity-50 ${a.style}`}
          >
            {actionStatus?.id === game.id && actionStatus.type === a.action
              ? `${a.label}...`
              : a.label}
          </button>
        ))}
      </div>
    );
  }

  const filteredGames = statusFilter
    ? games.filter((g) => g.status === statusFilter)
    : games;

  const tabs = ["", "PUBLISHED", "DRAFT", "ARCHIVED"] as const;
  const tabLabels = ["All", "Published", "Draft", "Archived"];

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Games
      </h1>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Manage your games
      </p>

      <div className="mt-6 flex gap-1 rounded-lg border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              if (tab) {
                params.set("status", tab);
              } else {
                params.delete("status");
              }
              router.push(`/admin/games?${params.toString()}`);
            }}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              statusFilter === tab ||
              (!statusFilter && tab === "")
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            {tabLabels[i]}
          </button>
        ))}
      </div>

      {error && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-2 font-medium underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {loading ? (
        <div className="mt-8 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800"
            />
          ))}
        </div>
      ) : filteredGames.length === 0 ? (
        <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            No games found.
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
              <thead className="bg-zinc-50 dark:bg-zinc-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredGames.map((game) => (
                  <tr key={game.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {game.title}
                      </div>
                      {game.description && (
                        <div className="max-w-xs truncate text-xs text-zinc-500 dark:text-zinc-400">
                          {game.description}
                        </div>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                      <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                        {game.slug}
                      </code>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {getStatusBadge(game.status)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                      {new Date(game.createdAt).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      {getActions(game)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
