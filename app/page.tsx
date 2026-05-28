import { GradientHeader } from "@/components/gradient-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const quickStats = [
  { label: "Ideas captured", value: "1,234+" },
  { label: "Votes cast", value: "8,234+" },
  { label: "Features shipped", value: "234+" },
];

const principles = [
  {
    icon: MessageSquare,
    title: "Capture ideas fast",
    description:
      "Give people a clear place to submit feedback without friction or clutter.",
  },
  {
    icon: BarChart3,
    title: "Surface what matters",
    description:
      "Let voting reveal demand so your team can prioritize with confidence.",
  },
  {
    icon: Users,
    title: "Show progress publicly",
    description:
      "Turn the roadmap into a living product story users can follow and trust.",
  },
  {
    icon: ShieldCheck,
    title: "Keep moderation clear",
    description:
      "Use admin controls and statuses to keep the feedback loop organized and credible.",
  },
];

const showcaseCards = [
  {
    title: "Request analytics",
    category: "Insights",
    votes: "128 votes",
    tone: "from-amber-500/12 to-stone-400/8",
  },
  {
    title: "Mobile-first roadmap",
    category: "Planned",
    votes: "84 votes",
    tone: "from-emerald-500/12 to-amber-500/8",
  },
  {
    title: "Faster onboarding",
    category: "Completed",
    votes: "219 votes",
    tone: "from-rose-500/12 to-emerald-500/8",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      <GradientHeader
        title="An open product ledger for ideas worth shipping"
        subtitle="Pratikriya treats feedback like a published record: concise, visible, and serious enough to shape what gets built next."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-white text-stone-950 hover:bg-stone-100"
          >
            <Link href="/feedback/new">
              Submit Feedback <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white"
          >
            <Link href="/roadmap">
              View Roadmap <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-3 pt-6 sm:grid-cols-3">
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-left backdrop-blur"
            >
              <div className="font-display text-2xl font-semibold text-white">
                {stat.value}
              </div>
              <div className="text-sm text-slate-200/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </GradientHeader>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2">
            <Badge
              variant="secondary"
              className="rounded-full border border-stone-300/60 bg-background/80 px-3 py-1"
            >
              Editorial structure
            </Badge>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              A quieter interface with more authority.
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              It should feel like a carefully edited publication, not a neon
              SaaS template.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {principles.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                className="group border-stone-400/20 bg-card/95 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardHeader className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-amber-600/12 via-stone-500/10 to-emerald-600/10 text-primary ring-1 ring-stone-400/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-display text-xl">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="overflow-hidden border-stone-400/20 bg-card/95 shadow-sm">
          <CardHeader className="space-y-3">
            <Badge
              variant="outline"
              className="w-fit rounded-full border-stone-400/30 px-3 py-1"
            >
              Live roadmap preview
            </Badge>
            <CardTitle className="font-display text-2xl sm:text-3xl">
              Make progress visible without noise.
            </CardTitle>
            <CardDescription className="max-w-2xl text-base leading-7 text-muted-foreground">
              Clean statuses, vote counts, and public updates help users see
              what is coming next and why their input matters.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            {showcaseCards.map((card) => (
              <div
                key={card.title}
                className={`rounded-2xl border border-stone-400/20 bg-linear-to-br ${card.tone} p-4 shadow-sm`}
              >
                <div className="flex items-center justify-between gap-3">
                  <Badge
                    variant="secondary"
                    className="rounded-full border border-stone-300/60 bg-background/80"
                  >
                    {card.category}
                  </Badge>
                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-10 space-y-2">
                  <h3 className="font-display text-lg font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{card.votes}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-stone-400/20 bg-[linear-gradient(160deg,rgba(28,25,23,0.98),rgba(57,48,40,0.96))] text-white shadow-sm">
          <CardHeader className="space-y-3">
            <Badge className="w-fit rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/10">
              Close reading mode
            </Badge>
            <CardTitle className="font-display text-2xl text-white sm:text-3xl">
              A calmer product experience for everyone.
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6 text-slate-300">
            <p>
              Users can submit ideas, vote on what matters, and track the status
              of each request without losing context.
            </p>
            <p>
              Teams get a sharper signal, cleaner prioritization, and a more
              premium public presence.
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
                Core experience
              </div>
              <div className="mt-3 grid gap-3 text-white">
                <div className="flex items-center justify-between">
                  <span>Submission flow</span>
                  <span className="text-emerald-300">Clear</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Voting feedback</span>
                  <span className="text-sky-300">Immediate</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Roadmap visibility</span>
                  <span className="text-fuchsia-300">Public</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-3xl border border-border/70 bg-muted/50 px-6 py-8 text-center shadow-sm sm:px-10 sm:py-10">
        <div className="mx-auto max-w-2xl space-y-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready to turn feedback into a living record?
          </h2>
          <p className="text-muted-foreground">
            Launch a cleaner feedback experience, guide prioritization, and give
            your community a roadmap they actually want to follow.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/feedback/new">
                Start collecting ideas <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full"
            >
              <Link href="/feedback">Explore the community</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
