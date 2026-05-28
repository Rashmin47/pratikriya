"use client";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { MessageSquare, ThumbsUp, User } from "lucide-react";
import { STATUS_GROUPS } from "@/app/data/status-data";
import { Badge } from "./ui/badge";
import { getCategoryDesign } from "@/app/data/category-data";
import { Button } from "./ui/button";
import { toast } from "sonner";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function FeedbackList({
  initialPosts,
  userId,
}: {
  initialPosts: any[];
  userId: string | null;
}) {
  const [posts, setPosts] = useState(initialPosts);

  const handleVote = async (postId: number) => {
    if (!userId) {
      toast.error("Please sign in to vote on feedback");
      return;
    }

    // Show loading toast
    const loadingToast = toast.loading("Submitting vote...");

    try {
      const response = await fetch("/api/votes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
        }),
      });

      if (!response.ok) {
        throw new Error("Vote failed");
      }
      const data = await response.json();

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success(data.voted ? "Vote added!" : "Vote removed");

      // Update local state
      setPosts((currentPosts) =>
        currentPosts.map((post) => {
          if (post.id === postId) {
            const voteCount = post.votes.length;
            return {
              ...post,
              votes: data.voted
                ? [...post.votes, { userId }]
                : post.votes.filter((v: any) => v.userId !== userId),
              _count: {
                votes: data.voted ? voteCount + 1 : voteCount - 1,
              },
            };
          }
          return post;
        }),
      );
    } catch (error) {
      console.error("Failed to submit vote.", error);
      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.error("Failed to submit vote. Please try again");
    }
  };
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="overflow-hidden border-border/70 bg-card/95 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <CardHeader className="space-y-4 border-b border-border/60 bg-muted/20">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-xl tracking-tight">
                  {post.title}
                </CardTitle>
                <CardDescription className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    <User className="h-3 w-3" />
                    {post.author.name}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </CardDescription>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {/* Status Badge */}
                {(() => {
                  const statusGroup =
                    STATUS_GROUPS[post.status as keyof typeof STATUS_GROUPS];
                  if (!statusGroup) return null;
                  const StatusIcon = statusGroup.icon;

                  return (
                    <Badge
                      className={`${statusGroup.countColor} border ${statusGroup.color} flex items-center gap-1 rounded-full px-3 py-1`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {statusGroup.title}
                    </Badge>
                  );
                })()}
                {/* Category Badge */}
                {(() => {
                  const design = getCategoryDesign(post.category);
                  const Icon = design.icon;

                  return (
                    <Badge
                      variant="outline"
                      className={`flex items-center gap-1 rounded-full text-xs ${design.border} ${design.text}`}
                    >
                      <Icon className="h-3 w-3" />
                      {post.category}
                    </Badge>
                  );
                })()}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-5">
            <p className="text-sm leading-6 text-muted-foreground">
              {post.description}
            </p>
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleVote(post.id)}
                className="gap-2 rounded-full px-4"
              >
                <ThumbsUp
                  className={`h-4 w-4 ${
                    post.votes.some((v: any) => v.userId === userId)
                      ? "fill-current"
                      : ""
                  }`}
                />
                {post.votes.length} Votes
              </Button>
              <div className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground">
                <MessageSquare className="h-4 w-4" />
                Comment
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
