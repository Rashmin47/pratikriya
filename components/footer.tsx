import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-border/60 bg-background/90 backdrop-blur">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built for thoughtful product teams</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            <span>by Rashmin Sharma</span>
          </div>
        </div>
        <div className="mt-3 text-center text-sm text-muted-foreground">
          © {currentYear} Pratikriya. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
