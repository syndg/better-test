"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
};

type Props = {
  initialPosts: Post[];
};

export default function ClientSideComponent({ initialPosts }: Props) {
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");
  const [showRealTime, setShowRealTime] = useState(false);

  // Client-side query for filtering by author (only runs when author is selected)
  const filteredPostsQuery = useQuery({
    ...trpc.posts.byAuthor.queryOptions({
      author: selectedAuthor,
    }),
    enabled: !!selectedAuthor, // Only run when an author is selected
  });

  // Real-time server time query (refetches every 5 seconds)
  const realTimeQuery = useQuery({
    ...trpc.serverTime.queryOptions(),
    enabled: showRealTime,
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  // Get unique authors from initial posts
  const authors = Array.from(new Set(initialPosts.map((post) => post.author)));

  const handleAuthorChange = (author: string) => {
    setSelectedAuthor(author);
  };

  const postsToShow =
    selectedAuthor && filteredPostsQuery.data
      ? filteredPostsQuery.data
      : initialPosts;

  return (
    <div className="space-y-6 text-gray-900">
      {/* Interactive Filtering */}
      <div>
        <h3 className="font-medium mb-3 text-black">
          🔍 Interactive Author Filter
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => handleAuthorChange("")}
            className={`px-3 py-1 rounded text-sm ${
              !selectedAuthor
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            All Authors
          </button>
          {authors.map((author) => (
            <button
              key={author}
              onClick={() => handleAuthorChange(author)}
              className={`px-3 py-1 rounded text-sm ${
                selectedAuthor === author
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {author}
            </button>
          ))}
        </div>

        {/* Loading state for filtered posts */}
        {filteredPostsQuery.isLoading && selectedAuthor && (
          <div className="text-blue-600 text-sm">
            Loading posts by {selectedAuthor}...
          </div>
        )}

        {/* Filtered posts */}
        <div className="space-y-2">
          <p className="text-sm text-gray-700">
            {selectedAuthor ? (
              <>
                Showing posts by{" "}
                <strong className="text-black">{selectedAuthor}</strong>{" "}
                (fetched client-side)
              </>
            ) : (
              <>Showing all posts (from SSR)</>
            )}
          </p>
          <div className="grid gap-2">
            {postsToShow.map((post) => (
              <div
                key={post.id}
                className="border border-gray-200 rounded p-3 bg-white"
              >
                <h4 className="font-medium text-sm text-black">{post.title}</h4>
                <p className="text-xs text-gray-600">By {post.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Data */}
      <div>
        <h3 className="font-medium mb-3 text-black">
          ⏰ Real-time Server Time
        </h3>
        <label className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            checked={showRealTime}
            onChange={(e) => setShowRealTime(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm text-gray-700">
            Enable real-time updates (every 5 seconds)
          </span>
        </label>

        {showRealTime && (
          <div className="bg-white border border-gray-200 rounded p-3">
            {realTimeQuery.isLoading ? (
              <div className="text-blue-600 text-sm">
                Loading current time...
              </div>
            ) : realTimeQuery.data ? (
              <div className="space-y-1">
                <p className="text-sm text-gray-800">
                  <strong className="text-black">Live Time:</strong>{" "}
                  {realTimeQuery.data.timestamp.toLocaleString()}
                </p>
                <p className="text-xs text-gray-600">
                  Updates automatically every 5 seconds via client-side tRPC
                </p>
                {realTimeQuery.isFetching && (
                  <p className="text-xs text-blue-600">🔄 Updating...</p>
                )}
              </div>
            ) : (
              <p className="text-sm text-red-600">Failed to load time</p>
            )}
          </div>
        )}
      </div>

      {/* Usage Info */}
      <div className="bg-blue-50 border border-blue-200 rounded p-3">
        <h4 className="font-medium text-blue-800 text-sm mb-2">
          Client-Side Features Demonstrated:
        </h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>
            • <strong>Conditional Queries:</strong> Author filter only runs when
            needed
          </li>
          <li>
            • <strong>Loading States:</strong> Shows loading indicators during
            fetches
          </li>
          <li>
            • <strong>Real-time Updates:</strong> Automatic refetching with
            intervals
          </li>
          <li>
            • <strong>Interactive UI:</strong> Buttons trigger new API calls
          </li>
          <li>
            • <strong>Mixed Data Sources:</strong> Combines SSR and client data
          </li>
        </ul>
      </div>
    </div>
  );
}
