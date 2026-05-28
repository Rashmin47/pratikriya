import { GradientHeader } from "@/components/gradient-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { PlusIcon, Map } from "lucide-react";
import Link from "next/link";
import { getCategoryDesign } from "../data/category-data";
import { Badge } from "@/components/ui/badge";
import FeedbackList from "@/components/feedback-list";

export default async function FeedbackPage() {
  // Get the useId from clerk auth
  const { userId } = await auth();

  const posts = await prisma.post.findMany({
    include: {
      author: true,
      votes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const categories = await prisma.post.groupBy({
    by: ["category"],
    _count: true,
  });
  return (
    <>
      <div className="space-y-8">
        <GradientHeader
          title="Community Feedback"
          subtitle="Explore, vote, and contribute to the features that matter most. Your voice shapes our product's future."
        >
          <div className="flex flex-col justify-center gap-3 pt-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-blue-700 hover:bg-slate-100"
            >
              <Link href="/feedback/new">
                New Feedback
                <PlusIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/25 bg-white/10 text-white hover:bg-white/15 hover:text-white"
            >
              <Link href="/roadmap">
                View Roadmap
                <Map className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </GradientHeader>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-border/70 bg-card/95 shadow-sm">
              <CardHeader className="space-y-2 border-b border-border/60 bg-muted/20">
                <CardTitle className="text-xl">Categories</CardTitle>
                <CardDescription>Browse feedback by category</CardDescription>
              </CardHeader>
              <CardContent className="pt-5">
                <div className="space-y-3">
                  {categories.map((cat) => {
                    const design = getCategoryDesign(cat.category);
                    const Icon = design.icon;

                    return (
                      <div
                        key={cat.category}
                        className="group flex cursor-pointer items-center justify-between rounded-2xl border border-transparent p-3 transition-colors hover:border-border/70 hover:bg-muted/40"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`rounded-xl border p-2.5 ${design.light} ${design.border}`}
                          >
                            <Icon className={`h-4 w-4 ${design.text}`} />
                          </div>
                          <span className="text-sm font-medium">
                            {cat.category}
                          </span>
                        </div>
                        <Badge
                          variant="secondary"
                          className={`rounded-full ${design.light} ${design.text}`}
                        >
                          {cat._count}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Main Content */}
          <div>
            <FeedbackList initialPosts={posts} userId={userId} />
          </div>
        </div>
      </div>
    </>
  );
}
