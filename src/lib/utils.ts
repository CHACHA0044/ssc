export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "processing":
      return "text-slate-400";
    case "in_transit":
      return "text-white";
    case "delayed":
      return "text-red-500";
    case "rerouted":
      return "text-amber-500";
    case "delivered":
      return "text-emerald-500";
    default:
      return "text-slate-500";
  }
}

export function getStatusBgColor(status: string): string {
  switch (status) {
    case "processing":
      return "bg-white/5 border-white/10 text-slate-400";
    case "in_transit":
      return "bg-white/10 border-white/20 text-white";
    case "delayed":
      return "bg-red-500/10 border-red-500/20 text-red-500";
    case "rerouted":
      return "bg-amber-500/10 border-amber-500/20 text-amber-500";
    case "delivered":
      return "bg-emerald-500/10 border-emerald-500/20 text-emerald-500";
    default:
      return "bg-white/5 border-white/5 text-slate-500";
  }
}

export function getRiskColor(score: number): string {
  if (score >= 70) return "#EF4444";
  if (score >= 40) return "#F59E0B";
  return "#FFFFFF";
}

export function getRiskLabel(score: number): string {
  if (score >= 70) return "High";
  if (score >= 40) return "Medium";
  return "Low";
}

export function animateCounter(
  from: number,
  to: number,
  duration: number,
  callback: (value: number) => void
): void {
  const start = performance.now();
  const update = (time: number) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    callback(Math.round(from + (to - from) * eased));
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
