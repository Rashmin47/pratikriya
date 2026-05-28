"use client";
import { CATEGORIES_TYPES } from "@/app/data/category-data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

// Server action function
async function submitFeedback(
  prevState: { success: boolean; error: string },
  formData: FormData,
) {
  // Show loading toast
  const loadingToast = toast.loading("Submitting your feedback...");

  try {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    // Dismiss loading toast and show success
    toast.dismiss(loadingToast);
    toast.success("Your feedback has been submitted successfully");

    return {
      success: true,
      error: "",
    };
  } catch (error) {
    console.error("Something went wrong. Please try again.", error);
    // Dismiss loading toast and show success
    toast.dismiss(loadingToast);
    toast.error("Something went wrong.");
    return {
      success: false,
      error: "Failed to submit feedback",
    };
  }
}

export default function NewFeedbackPage() {
  const router = useRouter();
  const [state, action, isPending] = useActionState(submitFeedback, {
    success: false,
    error: "",
  });

  // Redirect on success
  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        router.push("/feedback");
        router.refresh();
      }, 1500); // Wait for toast to be visible

      return () => clearTimeout(timer);
    }
  }, [state.success, router]);
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link href="/feedback">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Feedback intake
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Share your feedback
          </h1>
        </div>
      </div>
      <Card className="overflow-hidden border-border/70 bg-card/95 shadow-sm">
        <CardHeader className="space-y-3 border-b border-border/60 bg-muted/20">
          <CardTitle className="text-2xl">New Feedback</CardTitle>
          <CardDescription className="max-w-2xl text-base leading-7">
            Share your idea with the community. Be specific about what
            you&apos;d like to see so the team can understand the need clearly.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form action={action} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="What would you like to see?"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select defaultValue={CATEGORIES_TYPES[0]} name="category">
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES_TYPES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your idea in detail..."
                className="min-h-40"
                required
              />
            </div>
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                asChild
                className="rounded-full"
              >
                <Link href="/feedback">Cancel</Link>
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="rounded-full px-6"
              >
                {isPending ? "Submitting" : "Submit Feedback"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
