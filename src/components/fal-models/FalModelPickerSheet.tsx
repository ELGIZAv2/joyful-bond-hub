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

  return (
    <AnimatePresence>
      {props.open && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={props.onClose}
          />
          <motion.div
            className="fixed inset-x-0 bottom-0 z-[81] max-h-[85vh] rounded-t-3xl bg-card border-t border-border/50 flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
          >
            <div className="flex items-center justify-between px-5 pt-4 pb-2">
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  {props.kind === "image" ? "Image models" : "Video models"}
                </h2>
                <p className="text-xs text-muted-foreground">Powered by fal.ai</p>
              </div>
              <button onClick={props.onClose} className="p-2 -mr-2 rounded-full hover:bg-accent">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-5 pb-2 flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 rounded-xl bg-muted/40 px-3 py-2">
                <Search className="w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search models..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
                />
              </div>
            </div>

            <div className="px-5 pb-2 flex items-center gap-1.5 overflow-x-auto">
              {(["all", "new", "pro"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-wide transition-colors ${
                    filter === f
                      ? "bg-foreground text-background"
                      : "bg-muted/40 text-muted-foreground hover:bg-muted/60"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto px-3 pb-6">
              {filtered.map((m: any) => {
                const selected = props.selectedSlug === m.slug;
                const priceLabel =
                  props.kind === "image"
                    ? `${m.credits} MC`
                    : m.unit === "video"
                    ? `${m.credits_per_video} MC / video`
                    : `${m.credits_per_second} MC / s`;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      (props.onSelect as any)(m);
                      props.onClose();
                    }}
                    className={`w-full text-left px-3 py-3 mb-1.5 rounded-2xl transition-colors ${
                      selected ? "bg-primary/10 ring-1 ring-primary/30" : "hover:bg-accent/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground truncate">
                            {m.display_name}
                          </span>
                          <span className="text-[10px] text-muted-foreground">{m.provider}</span>
                        </div>
                        {m.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                            {m.description}
                          </p>
                        )}
                        <div className="mt-1.5">
                          {props.kind === "image" ? (
                            <ImageModelBadges m={m as FalImageModel} />
                          ) : (
                            <VideoModelBadges m={m as FalVideoModel} />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-[11px] font-semibold text-primary">{priceLabel}</span>
                        {selected && <Check className="w-4 h-4 text-primary" />}
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
