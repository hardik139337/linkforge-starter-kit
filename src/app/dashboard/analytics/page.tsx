"use client";

import { useEffect, useState, useCallback } from "react";

interface LinkAnalytics {
  id: string;
  title: string;
  clicks: number;
}

interface PageViewRecord {
  id: string;
  createdAt: string;
  referer: string | null;
  country: string | null;
}

interface AnalyticsData {
  links: LinkAnalytics[];
  pageViewsThisWeek: number;
  linkClicksThisWeek: number;
  recentPageViews: PageViewRecord[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = useCallback(async () => {
    try {
      const res = await fetch("/api/analytics");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Failed to fetch analytics", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-gray-500">Failed to load analytics.</p>
      </div>
    );
  }

  const maxClicks = Math.max(...data.links.map((l) => l.clicks), 1);
  const topLink =
    data.links.length > 0
      ? data.links.reduce((a, b) => (a.clicks > b.clicks ? a : b))
      : null;

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
      <p className="mt-1 text-sm text-gray-500">
        Track your link performance and visitor activity.
      </p>

      {/* Overview stats */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="text-sm font-medium text-gray-500">
            Page Views This Week
          </p>
          <p className="mt-1 text-3xl font-bold text-gray-900">
            {data.pageViewsThisWeek}
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="text-sm font-medium text-gray-500">
            Link Clicks This Week
          </p>
          <p className="mt-1 text-3xl font-bold text-gray-900">
            {data.linkClicksThisWeek}
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="text-sm font-medium text-gray-500">
            Top Performing Link
          </p>
          <p className="mt-1 truncate text-lg font-bold text-gray-900">
            {topLink ? topLink.title : "N/A"}
          </p>
          {topLink && (
            <p className="text-sm text-gray-400">{topLink.clicks} clicks</p>
          )}
        </div>
      </div>

      {/* Clicks per link bar chart */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">
          Clicks Per Link
        </h2>

        {data.links.length === 0 ? (
          <div className="mt-4 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
            <p className="text-sm text-gray-500">
              No link data yet. Add links and share your page to see analytics.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {data.links
              .sort((a, b) => b.clicks - a.clicks)
              .map((link) => (
                <div key={link.id}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">
                      {link.title}
                    </span>
                    <span className="text-gray-500">
                      {link.clicks} clicks
                    </span>
                  </div>
                  <div className="h-8 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="flex h-full items-center rounded-full bg-indigo-500 px-3 text-xs font-medium text-white transition-all duration-500"
                      style={{
                        width: `${Math.max(
                          (link.clicks / maxClicks) * 100,
                          link.clicks > 0 ? 8 : 0
                        )}%`,
                      }}
                    >
                      {link.clicks > 0 && (
                        <span className="truncate">{link.clicks}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Recent visitors */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">
          Recent Visitors
        </h2>

        {data.recentPageViews.length === 0 ? (
          <div className="mt-4 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
            <p className="text-sm text-gray-500">
              No visitor data yet. Share your page to start tracking.
            </p>
          </div>
        ) : (
          <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-500">
                    Date
                  </th>
                  <th className="px-4 py-3 font-medium text-gray-500">
                    Source
                  </th>
                  <th className="px-4 py-3 font-medium text-gray-500">
                    Country
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.recentPageViews.map((pv) => (
                  <tr key={pv.id} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-3 text-gray-700">
                      {new Date(pv.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {pv.referer ? (
                        <span className="truncate">{pv.referer}</span>
                      ) : (
                        <span className="text-gray-400">Direct</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {pv.country || (
                        <span className="text-gray-400">Unknown</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
