// FalModelPickerSheet — bottom sheet picker for fal image/video models.
// Text-only badges (no emoji). Reads from useFalModels.
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Check } from "lucide-react";
import {
  useFalImageModels,
  useFalVideoModels,
  type FalImageModel,
  type FalVideoModel,
} from "@/hooks/useFalModels";
import { ImageModelBadges, VideoModelBadges } from "./ModelBadges";

type ImageProps = {
  kind: "image";
  open: boolean;
  onClose: () => void;
  selectedSlug: string | null;
  onSelect: (m: FalImageModel) => void;
};
type VideoProps = {
  kind: "video";
  open: boolean;
  onClose: () => void;
  selectedSlug: string | null;
  onSelect: (m: FalVideoModel) => void;
};

export function FalModelPickerSheet(props: ImageProps | VideoProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "new" | "pro">("all");
  const img = useFalImageModels();
  const vid = useFalVideoModels();
  const models = props.kind === "image" ? img.models : vid.models;

  const filtered = useMemo(() => {
    let list = models as any[];
    if (filter === "new") list = list.filter((m) => m.is_new);
    if (filter === "pro") list = list.filter((m) => m.is_premium);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (m) =>
          m.display_name.toLowerCase().includes(q) ||
          m.provider.toLowerCase().includes(q) ||
          (m.description ?? "").toLowerCase().includes(q),
      );
    }
    return list.sort((a, b) => {
      const af = a.is_featured ? 0 : 1;
      const bf = b.is_featured ? 0 : 1;
      if (af !== bf) return af - bf;
      return a.sort_order - b.sort_order;
    });
  }, [models, filter, query]);

  // Deterministic gradient per slug for thumbnails fallback
  const gradFor = (slug: string) => {
    let h = 0;
    for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
    const a = h % 360;
    const b = (a + 60) % 360;
    return `linear-gradient(135deg, hsl(${a} 70% 45%), hsl(${b} 65% 30%))`;
  };

  const initials = (name: string) =>
    name
      .split(/\s+/)
      .map((s) => s[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <AnimatePresence>
      {props.open && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={props.onClose}
          />
          <motion.div
            className="fixed inset-x-0 bottom-0 z-[81] max-h-[88vh] rounded-t-[2.25rem] bg-card/85 backdrop-blur-3xl border-t border-border/40 flex flex-col shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.5)]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1.5">
              <div className="w-10 h-1.5 bg-foreground/15 rounded-full" />
            </div>

            {/* Title + close */}
            <div className="flex items-center justify-between px-5 pt-1 pb-3">
              <h2 className="text-[15px] font-bold tracking-tight text-foreground">
                {props.kind === "image" ? "Image models" : "Video models"}
              </h2>
              <button onClick={props.onClose} className="p-1.5 -mr-1 rounded-full hover:bg-accent">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search */}
            <div className="px-5 pb-2.5">
              <div className="flex items-center gap-2 rounded-xl bg-muted/40 px-3 py-2 ring-1 ring-border/40 focus-within:ring-primary/40">
                <Search className="w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search models..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
                />
              </div>
            </div>

            {/* Filter chips */}
            <div className="px-5 pb-3 flex items-center gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {(
                [
                  { k: "all", label: "All" },
                  { k: "new", label: "New" },
                  { k: "pro", label: "Pro" },
                ] as const
              ).map(({ k, label }) => (
                <button
                  key={k}
                  onClick={() => setFilter(k)}
                  className={`px-3.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors ${
                    filter === k
                      ? "bg-primary text-primary-foreground shadow-[0_4px_14px_-4px_hsl(var(--primary)/0.5)]"
                      : "bg-foreground/[0.04] text-muted-foreground border border-border/40 hover:bg-foreground/[0.07]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-2">
              {filtered.map((m: any) => {
                const selected = props.selectedSlug === m.slug;
                const priceLabel =
                  props.kind === "image"
                    ? `${m.credits} MC`
                    : m.unit === "video"
                    ? `${m.credits_per_video} MC`
                    : `${m.credits_per_second} MC/s`;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      (props.onSelect as any)(m);
                      props.onClose();
                    }}
                    className={`group w-full text-left p-2.5 rounded-2xl transition-all ${
                      selected
                        ? "bg-primary/[0.08] border-2 border-primary ring-2 ring-primary/10"
                        : "bg-foreground/[0.03] border border-border/40 hover:bg-foreground/[0.06]"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {/* Thumbnail */}
                      <div className="relative shrink-0">
                        <div
                          className={`w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center text-[10px] font-black text-white/90 shadow-md ${
                            selected ? "ring-2 ring-primary/40" : "ring-1 ring-border/40"
                          }`}
                          style={
                            m.thumbnail_url
                              ? undefined
                              : { background: gradFor(m.slug) }
                          }
                        >
                          {m.thumbnail_url ? (
                            <img src={m.thumbnail_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <span>{initials(m.display_name)}</span>
                          )}
                        </div>
                        {selected && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-primary rounded-full border-2 border-card flex items-center justify-center">
                            <Check className="w-2 h-2 text-primary-foreground" strokeWidth={4} />
                          </div>
                        )}
                      </div>

                      {/* Body */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <h3 className="text-[13px] font-bold text-foreground leading-tight truncate">
                            {m.display_name}
                          </h3>
                          {m.is_premium && (
                            <span className="text-[8px] font-black bg-primary text-primary-foreground px-1 py-0.5 rounded">
                              PRO
                            </span>
                          )}
                          {m.is_new && (
                            <span className="text-[8px] font-black bg-foreground/15 text-foreground/70 px-1 py-0.5 rounded">
                              NEW
                            </span>
                          )}
                        </div>
                        {m.description && (
                          <p className="text-[10.5px] text-muted-foreground leading-snug line-clamp-2">
                            {m.description}
                          </p>
                        )}
                        <div className="mt-1.5 flex items-center justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            {props.kind === "image" ? (
                              <ImageModelBadges m={m as FalImageModel} />
                            ) : (
                              <VideoModelBadges m={m as FalVideoModel} />
                            )}
                          </div>
                          <span
                            className={`text-[11px] font-black tabular-nums shrink-0 ${
                              selected ? "text-primary" : "text-foreground/85"
                            }`}
                          >
                            {priceLabel}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-8">No models match.</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

