// build_themes.js: generates De_themes From FAi 🔥 with distinct color groupings & explorer depth

import fs from 'node:fs';
import path from 'node:path';

const SOURCE_DIR = '/home/sudo-fai/.antigravity-ide/extensions/calebdsharp.anorak-themes-1.0.0-universal/themes';
const TARGET_DIR = '/home/sudo-fai/Desktop/LABZZZzzz/FSWD/LAB5/DeThemes-from-Fai/themes';

// 18 distinct tailored color groupings for both Light and Dark
const THEME_STYLES = {
  "aurora-glass": {
    name: "Aurora Glass",
    light: {
      function: "#0284C7",        // glacier cyan-blue
      method: "#0369A1",
      variable: "#059669",        // bright mint emerald
      parameter: "#D97706",       // golden mango
      type: "#7C3AED",            // purple amethyst
      primitiveType: "#BE185D",   // ruby wine
      keyword: "#1E40AF",         // royal cobalt
      storage: "#9333EA",
      string: "#16A34A",          // bright lime jade
      number: "#EA580C",
      boolean: "#D97706",
      operator: "#DC2626",
      punctuation: "#475569",
      property: "#2563EB",
      comment: "#5C7876",
      preprocessor: "#0E7490",
      builtin: "#0284C7",
      bracket1: "#D97706", bracket2: "#7C3AED", bracket3: "#0284C7", bracket4: "#059669", bracket5: "#BE185D", bracket6: "#EA580C"
    },
    dark: {
      function: "#38BDF8", variable: "#34D399", parameter: "#FBBF24", type: "#C084FC", primitiveType: "#F472B6", keyword: "#60A5FA", storage: "#E879F9", string: "#4ADE80", number: "#FB923C", boolean: "#FACC15", operator: "#F87171", punctuation: "#94A3B8", property: "#818CF8", comment: "#6EE7B7", preprocessor: "#22D3EE", builtin: "#38BDF8", bracket1: "#FBBF24", bracket2: "#C084FC", bracket3: "#38BDF8", bracket4: "#34D399", bracket5: "#F472B6", bracket6: "#FB923C"
    }
  },
  "autumn-terminal": {
    name: "Autumn Terminal",
    light: {
      function: "#B45309",        // rich amber gold
      method: "#D97706",
      variable: "#4D7C0F",        // olive moss green
      parameter: "#EA580C",       // fiery pumpkin
      type: "#9F1239",            // burgundy wine
      primitiveType: "#C2410C",   // rust sienna
      keyword: "#B91C1C",         // autumn red-orange
      storage: "#7C2D12",
      string: "#65A30D",          // golden wheat green
      number: "#C2410C",
      boolean: "#B45309",
      operator: "#DC2626",
      punctuation: "#78350F",
      property: "#B45309",
      comment: "#854D0E",
      preprocessor: "#9A3412",
      builtin: "#C2410C",
      bracket1: "#EA580C", bracket2: "#9F1239", bracket3: "#B45309", bracket4: "#4D7C0F", bracket5: "#DC2626", bracket6: "#D97706"
    },
    dark: {
      function: "#F59E0B", variable: "#A3E635", parameter: "#FB923C", type: "#FB7185", primitiveType: "#F97316", keyword: "#F87171", storage: "#F43F5E", string: "#BEF264", number: "#FB923C", boolean: "#FCD34D", operator: "#FCA5A5", punctuation: "#FED7AA", property: "#FBBF24", comment: "#D97706", preprocessor: "#F97316", builtin: "#FBBF24", bracket1: "#F59E0B", bracket2: "#FB7185", bracket3: "#A3E635", bracket4: "#FB923C", bracket5: "#F87171", bracket6: "#FCD34D"
    }
  },
  "chalk-clay": {
    name: "Chalk & Clay",
    light: {
      function: "#B91C1C",        // venetian clay red
      method: "#C2410C",
      variable: "#0D9488",        // dusty turquoise
      parameter: "#F97316",       // warm apricot
      type: "#86198F",            // plum purple
      primitiveType: "#BE123C",   // rosewood
      keyword: "#3730A3",         // indigo slate
      storage: "#6B21A8",
      string: "#15803D",          // sage green
      number: "#EA580C",
      boolean: "#D97706",
      operator: "#E11D48",        // crimson clay
      punctuation: "#57534E",
      property: "#A21CAF",
      comment: "#78716C",
      preprocessor: "#9F1239",
      builtin: "#B91C1C",
      bracket1: "#F97316", bracket2: "#86198F", bracket3: "#0D9488", bracket4: "#15803D", bracket5: "#E11D48", bracket6: "#B91C1C"
    },
    dark: {
      function: "#F87171", variable: "#2DD4BF", parameter: "#FB923C", type: "#E879F9", primitiveType: "#FDA4AF", keyword: "#818CF8", storage: "#C084FC", string: "#4ADE80", number: "#FB923C", boolean: "#FBBF24", operator: "#FB7185", punctuation: "#A8A29E", property: "#F472B6", comment: "#A8A29E", preprocessor: "#F43F5E", builtin: "#F87171", bracket1: "#FB923C", bracket2: "#E879F9", bracket3: "#2DD4BF", bracket4: "#4ADE80", bracket5: "#FB7185", bracket6: "#FBBF24"
    }
  },
  "dust-bloom": {
    name: "Dust Bloom",
    light: {
      function: "#A21CAF",        // magenta berry
      method: "#C026D3",
      variable: "#1D4ED8",        // marine blue
      parameter: "#E11D48",       // coral blossom
      type: "#6B21A8",            // deep violet
      primitiveType: "#BE185D",   // fuchsia rose
      keyword: "#831843",         // rich boysenberry
      storage: "#9333EA",
      string: "#047857",          // mint pine
      number: "#C2410C",
      boolean: "#B45309",
      operator: "#E11D48",
      punctuation: "#4A044E",
      property: "#701A75",
      comment: "#86198F",
      preprocessor: "#9D174D",
      builtin: "#A21CAF",
      bracket1: "#E11D48", bracket2: "#6B21A8", bracket3: "#1D4ED8", bracket4: "#047857", bracket5: "#A21CAF", bracket6: "#C026D3"
    },
    dark: {
      function: "#F472B6", variable: "#60A5FA", parameter: "#FB7185", type: "#C084FC", primitiveType: "#F43F5E", keyword: "#E879F9", storage: "#D946EF", string: "#34D399", number: "#FB923C", boolean: "#FBBF24", operator: "#FDA4AF", punctuation: "#F5D0FE", property: "#E879F9", comment: "#F472B6", preprocessor: "#FB7185", builtin: "#F472B6", bracket1: "#FB7185", bracket2: "#C084FC", bracket3: "#60A5FA", bracket4: "#34D399", bracket5: "#F472B6", bracket6: "#E879F9"
    }
  },
  "foggy-pine": {
    name: "Foggy Pine",
    light: {
      function: "#0891B2",        // pine cyan
      method: "#0284C7",
      variable: "#15803D",        // forest green
      parameter: "#D97706",       // amber resin
      type: "#6D28D9",            // nordic heather
      primitiveType: "#9F1239",   // cranberry
      keyword: "#115E59",         // deep spruce
      storage: "#7C3AED",
      string: "#16A34A",          // bright evergreen
      number: "#EA580C",
      boolean: "#CA8A04",
      operator: "#DC2626",
      punctuation: "#334155",
      property: "#0369A1",
      comment: "#475569",
      preprocessor: "#0F766E",
      builtin: "#0891B2",
      bracket1: "#D97706", bracket2: "#6D28D9", bracket3: "#0891B2", bracket4: "#15803D", bracket5: "#9F1239", bracket6: "#EA580C"
    },
    dark: {
      function: "#22D3EE", variable: "#4ADE80", parameter: "#FBBF24", type: "#A78BFA", primitiveType: "#FB7185", keyword: "#2DD4BF", storage: "#C084FC", string: "#86EFAC", number: "#FB923C", boolean: "#FCD34D", operator: "#F87171", punctuation: "#94A3B8", property: "#38BDF8", comment: "#6EE7B7", preprocessor: "#2DD4BF", builtin: "#22D3EE", bracket1: "#FBBF24", bracket2: "#A78BFA", bracket3: "#22D3EE", bracket4: "#4ADE80", bracket5: "#FB7185", bracket6: "#FB923C"
    }
  },
  "golden-hour-studio": {
    name: "Golden Hour Studio",
    light: {
      function: "#D97706",        // saffron gold
      method: "#B45309",
      variable: "#1E3A8A",        // royal navy
      parameter: "#EA580C",       // fire tangerine
      type: "#701A75",            // plum wine
      primitiveType: "#BE185D",   // crimson coral
      keyword: "#312E81",         // warm indigo
      storage: "#7C3AED",
      string: "#4D7C0F",          // olive lime
      number: "#C2410C",
      boolean: "#D97706",
      operator: "#EF4444",
      punctuation: "#78350F",
      property: "#B45309",
      comment: "#92400E",
      preprocessor: "#C2410C",
      builtin: "#D97706",
      bracket1: "#EA580C", bracket2: "#701A75", bracket3: "#1E3A8A", bracket4: "#4D7C0F", bracket5: "#BE185D", bracket6: "#D97706"
    },
    dark: {
      function: "#FBBF24", variable: "#93C5FD", parameter: "#FB923C", type: "#F472B6", primitiveType: "#FB7185", keyword: "#A5B4FC", storage: "#C084FC", string: "#BEF264", number: "#F97316", boolean: "#FDE047", operator: "#F87171", punctuation: "#FEF08A", property: "#FCD34D", comment: "#D97706", preprocessor: "#FB923C", builtin: "#FBBF24", bracket1: "#FB923C", bracket2: "#F472B6", bracket3: "#93C5FD", bracket4: "#BEF264", bracket5: "#FB7185", bracket6: "#FBBF24"
    }
  },
  "graph-paper-studio": {
    name: "Graph Paper Studio",
    light: {
      function: "#0284C7",        // technical azure
      method: "#0369A1",
      variable: "#1D4ED8",        // blueprint cobalt
      parameter: "#EA580C",       // drafting orange
      type: "#7C3AED",            // precision violet
      primitiveType: "#BE185D",   // grid magenta
      keyword: "#1E1B4B",         // drafting indigo
      storage: "#6366F1",
      string: "#059669",          // emerald grid
      number: "#C2410C",
      boolean: "#D97706",
      operator: "#DC2626",        // caliper red
      punctuation: "#334155",
      property: "#0284C7",
      comment: "#64748B",
      preprocessor: "#0F766E",
      builtin: "#0284C7",
      bracket1: "#EA580C", bracket2: "#7C3AED", bracket3: "#0284C7", bracket4: "#059669", bracket5: "#BE185D", bracket6: "#1D4ED8"
    },
    dark: {
      function: "#38BDF8", variable: "#60A5FA", parameter: "#FB923C", type: "#C084FC", primitiveType: "#F472B6", keyword: "#818CF8", storage: "#A78BFA", string: "#34D399", number: "#FB923C", boolean: "#FBBF24", operator: "#F87171", punctuation: "#94A3B8", property: "#38BDF8", comment: "#64748B", preprocessor: "#2DD4BF", builtin: "#38BDF8", bracket1: "#FB923C", bracket2: "#C084FC", bracket3: "#38BDF8", bracket4: "#34D399", bracket5: "#F472B6", bracket6: "#60A5FA"
    }
  },
  "ink-spill": {
    name: "Ink Spill",
    light: {
      function: "#2563EB",        // electric blue ink
      method: "#1D4ED8",
      variable: "#0F766E",        // dark cyan ink
      parameter: "#B45309",       // sepia bronze
      type: "#6B21A8",            // royal purple ink
      primitiveType: "#9F1239",   // carmine ink
      keyword: "#1E3A8A",         // midnight blue
      storage: "#7C3AED",
      string: "#166534",          // hunter green ink
      number: "#C2410C",
      boolean: "#B45309",
      operator: "#DC2626",        // vermilion ink
      punctuation: "#1E293B",
      property: "#2563EB",
      comment: "#475569",
      preprocessor: "#0F766E",
      builtin: "#2563EB",
      bracket1: "#B45309", bracket2: "#6B21A8", bracket3: "#2563EB", bracket4: "#166534", bracket5: "#9F1239", bracket6: "#0F766E"
    },
    dark: {
      function: "#60A5FA", variable: "#2DD4BF", parameter: "#FBBF24", type: "#C084FC", primitiveType: "#FB7185", keyword: "#93C5FD", storage: "#A78BFA", string: "#4ADE80", number: "#FB923C", boolean: "#FCD34D", operator: "#F87171", punctuation: "#CBD5E1", property: "#60A5FA", comment: "#94A3B8", preprocessor: "#2DD4BF", builtin: "#60A5FA", bracket1: "#FBBF24", bracket2: "#C084FC", bracket3: "#60A5FA", bracket4: "#4ADE80", bracket5: "#FB7185", bracket6: "#2DD4BF"
    }
  },
  "liquid-glass": {
    name: "Liquid Glass",
    light: {
      function: "#0284C7",        // oceanic blue
      method: "#0369A1",
      variable: "#0D9488",        // tropical lagoon
      parameter: "#F97316",       // coral sunset
      type: "#7E22CE",            // purple crystal
      primitiveType: "#BE185D",   // cerise quartz
      keyword: "#1E3A8A",         // deep trench blue
      storage: "#9333EA",
      string: "#059669",          // seafoam mint
      number: "#EA580C",
      boolean: "#D97706",
      operator: "#EF4444",        // flare red
      punctuation: "#334155",
      property: "#0284C7",
      comment: "#0F766E",
      preprocessor: "#0284C7",
      builtin: "#0D9488",
      bracket1: "#F97316", bracket2: "#7E22CE", bracket3: "#0284C7", bracket4: "#059669", bracket5: "#BE185D", bracket6: "#0D9488"
    },
    dark: {
      function: "#38BDF8", variable: "#2DD4BF", parameter: "#FB923C", type: "#C084FC", primitiveType: "#F472B6", keyword: "#60A5FA", storage: "#E879F9", string: "#34D399", number: "#FB923C", boolean: "#FBBF24", operator: "#F87171", punctuation: "#94A3B8", property: "#38BDF8", comment: "#2DD4BF", preprocessor: "#38BDF8", builtin: "#2DD4BF", bracket1: "#FB923C", bracket2: "#C084FC", bracket3: "#38BDF8", bracket4: "#34D399", bracket5: "#F472B6", bracket6: "#2DD4BF"
    }
  },
  "marker-pack": {
    name: "Marker Pack",
    light: {
      function: "#0284C7",        // highlighter sky blue
      method: "#0369A1",
      variable: "#7C3AED",        // sharpie purple
      parameter: "#EA580C",       // highlighter orange
      type: "#DB2777",            // highlighter pink
      primitiveType: "#9333EA",   // electric berry
      keyword: "#1E1B4B",         // midnight sharpie
      storage: "#C026D3",
      string: "#16A34A",          // highlighter green
      number: "#C2410C",
      boolean: "#D97706",
      operator: "#DC2626",        // highlighter red
      punctuation: "#1F2937",
      property: "#7C3AED",
      comment: "#4B5563",
      preprocessor: "#DB2777",
      builtin: "#0284C7",
      bracket1: "#EA580C", bracket2: "#DB2777", bracket3: "#0284C7", bracket4: "#16A34A", bracket5: "#9333EA", bracket6: "#7C3AED"
    },
    dark: {
      function: "#38BDF8", variable: "#C084FC", parameter: "#FB923C", type: "#F472B6", primitiveType: "#E879F9", keyword: "#FACC15", storage: "#F43F5E", string: "#4ADE80", number: "#FB923C", boolean: "#FDE047", operator: "#F87171", punctuation: "#F3F4F6", property: "#C084FC", comment: "#9CA3AF", preprocessor: "#F472B6", builtin: "#38BDF8", bracket1: "#FB923C", bracket2: "#F472B6", bracket3: "#38BDF8", bracket4: "#4ADE80", bracket5: "#E879F9", bracket6: "#C084FC"
    }
  },
  "national-parks": {
    name: "National Parks Field Guide",
    light: {
      function: "#0369A1",        // river blue
      method: "#0284C7",
      variable: "#166534",        // deep moss
      parameter: "#C2410C",       // canyon clay
      type: "#581C87",            // wild violet
      primitiveType: "#831843",   // berry bark
      keyword: "#14532D",         // ranger forest
      storage: "#6B21A8",
      string: "#15803D",          // pine needle
      number: "#C2410C",
      boolean: "#A16207",
      operator: "#DC2626",        // campfire red
      punctuation: "#3F3F46",
      property: "#0369A1",
      comment: "#52525B",
      preprocessor: "#831843",
      builtin: "#0369A1",
      bracket1: "#C2410C", bracket2: "#581C87", bracket3: "#0369A1", bracket4: "#15803D", bracket5: "#831843", bracket6: "#166534"
    },
    dark: {
      function: "#38BDF8", variable: "#4ADE80", parameter: "#FB923C", type: "#C084FC", primitiveType: "#FB7185", keyword: "#86EFAC", storage: "#A78BFA", string: "#BEF264", number: "#F97316", boolean: "#FDE047", operator: "#F87171", punctuation: "#A1A1AA", property: "#38BDF8", comment: "#A1A1AA", preprocessor: "#FB7185", builtin: "#38BDF8", bracket1: "#FB923C", bracket2: "#C084FC", bracket3: "#38BDF8", bracket4: "#4ADE80", bracket5: "#FB7185", bracket6: "#86EFAC"
    }
  },
  "night-ferry": {
    name: "Night Ferry",
    light: {
      function: "#0284C7",        // lighthouse cyan
      method: "#0369A1",
      variable: "#14B8A6",        // sea foam
      parameter: "#F59E0B",       // beacon amber
      type: "#8B5CF6",            // twilight purple
      primitiveType: "#F43F5E",   // signal flare
      keyword: "#1E3A8A",         // midnight indigo
      storage: "#7C3AED",
      string: "#059669",          // plankton green
      number: "#EA580C",
      boolean: "#D97706",
      operator: "#DC2626",
      punctuation: "#334155",
      property: "#0284C7",
      comment: "#64748B",
      preprocessor: "#0D9488",
      builtin: "#0284C7",
      bracket1: "#F59E0B", bracket2: "#8B5CF6", bracket3: "#0284C7", bracket4: "#059669", bracket5: "#F43F5E", bracket6: "#14B8A6"
    },
    dark: {
      function: "#06B6D4", variable: "#2DD4BF", parameter: "#FBBF24", type: "#A78BFA", primitiveType: "#FB7185", keyword: "#818CF8", storage: "#C084FC", string: "#34D399", number: "#FB923C", boolean: "#FCD34D", operator: "#F87171", punctuation: "#94A3B8", property: "#06B6D4", comment: "#6EE7B7", preprocessor: "#2DD4BF", builtin: "#06B6D4", bracket1: "#FBBF24", bracket2: "#A78BFA", bracket3: "#06B6D4", bracket4: "#34D399", bracket5: "#FB7185", bracket6: "#2DD4BF"
    }
  },
  "pastel-field-notes": {
    name: "Pastel Field Notes",
    light: {
      function: "#0284C7",        // pastel cerulean
      method: "#0369A1",
      variable: "#15803D",        // matcha green
      parameter: "#EA580C",       // apricot sorbet
      type: "#7C3AED",            // lavender blossom
      primitiveType: "#BE185D",   // raspberry jam
      keyword: "#3730A3",         // slate orchid
      storage: "#86198F",
      string: "#059669",          // sweet mint
      number: "#C2410C",
      boolean: "#D97706",
      operator: "#E11D48",
      punctuation: "#475569",
      property: "#7C3AED",
      comment: "#64748B",
      preprocessor: "#BE185D",
      builtin: "#0284C7",
      bracket1: "#EA580C", bracket2: "#7C3AED", bracket3: "#0284C7", bracket4: "#059669", bracket5: "#BE185D", bracket6: "#15803D"
    },
    dark: {
      function: "#38BDF8", variable: "#4ADE80", parameter: "#FB923C", type: "#C084FC", primitiveType: "#F472B6", keyword: "#A5B4FC", storage: "#E879F9", string: "#34D399", number: "#FB923C", boolean: "#FBBF24", operator: "#F87171", punctuation: "#CBD5E1", property: "#C084FC", comment: "#94A3B8", preprocessor: "#F472B6", builtin: "#38BDF8", bracket1: "#FB923C", bracket2: "#C084FC", bracket3: "#38BDF8", bracket4: "#34D399", bracket5: "#F472B6", bracket6: "#4ADE80"
    }
  },
  "sea-glass": {
    name: "Sea Glass",
    light: {
      function: "#0369A1",        // tidal azure
      method: "#0284C7",
      variable: "#0D9488",        // frosted sea green
      parameter: "#EA580C",       // coral driftwood
      type: "#6B21A8",            // purple kelp
      primitiveType: "#9D174D",   // deep sea magenta
      keyword: "#134E4A",         // deep ocean teal
      storage: "#7C3AED",
      string: "#15803D",          // tidal lime
      number: "#C2410C",
      boolean: "#B45309",
      operator: "#DC2626",        // starfish red
      punctuation: "#334155",
      property: "#0369A1",
      comment: "#0D9488",
      preprocessor: "#0369A1",
      builtin: "#0D9488",
      bracket1: "#EA580C", bracket2: "#6B21A8", bracket3: "#0369A1", bracket4: "#15803D", bracket5: "#9D174D", bracket6: "#0D9488"
    },
    dark: {
      function: "#22D3EE", variable: "#2DD4BF", parameter: "#FB923C", type: "#C084FC", primitiveType: "#F472B6", keyword: "#34D399", storage: "#A78BFA", string: "#86EFAC", number: "#FB923C", boolean: "#FCD34D", operator: "#F87171", punctuation: "#94A3B8", property: "#22D3EE", comment: "#2DD4BF", preprocessor: "#22D3EE", builtin: "#2DD4BF", bracket1: "#FB923C", bracket2: "#C084FC", bracket3: "#22D3EE", bracket4: "#86EFAC", bracket5: "#F472B6", bracket6: "#2DD4BF"
    }
  },
  "slate-orchard": {
    name: "Slate Orchard",
    light: {
      function: "#1D4ED8",        // orchard blue
      method: "#0284C7",
      variable: "#047857",        // orchard sage
      parameter: "#EA580C",       // ripe peach
      type: "#701A75",            // orchard plum
      primitiveType: "#B91C1C",   // red apple
      keyword: "#312E81",         // cool slate indigo
      storage: "#6B21A8",
      string: "#15803D",          // granny smith green
      number: "#C2410C",
      boolean: "#D97706",
      operator: "#DC2626",        // cider crimson
      punctuation: "#475569",
      property: "#1D4ED8",
      comment: "#64748B",
      preprocessor: "#B91C1C",
      builtin: "#047857",
      bracket1: "#EA580C", bracket2: "#701A75", bracket3: "#1D4ED8", bracket4: "#15803D", bracket5: "#B91C1C", bracket6: "#047857"
    },
    dark: {
      function: "#60A5FA", variable: "#34D399", parameter: "#FB923C", type: "#F472B6", primitiveType: "#F87171", keyword: "#A5B4FC", storage: "#C084FC", string: "#4ADE80", number: "#FB923C", boolean: "#FBBF24", operator: "#FDA4AF", punctuation: "#CBD5E1", property: "#60A5FA", comment: "#94A3B8", preprocessor: "#F87171", builtin: "#34D399", bracket1: "#FB923C", bracket2: "#F472B6", bracket3: "#60A5FA", bracket4: "#4ADE80", bracket5: "#F87171", bracket6: "#34D399"
    }
  },
  "studio-monochrome": {
    name: "Studio Monochrome",
    light: {
      function: "#1D4ED8",        // ultramarine
      method: "#0284C7",
      variable: "#0F766E",        // charcoal emerald
      parameter: "#D97706",       // bauhaus ochre
      type: "#A21CAF",            // modernist magenta
      primitiveType: "#BE123C",   // bold crimson
      keyword: "#0F172A",         // stark black-navy
      storage: "#7C3AED",
      string: "#059669",          // pure emerald
      number: "#EA580C",
      boolean: "#D97706",
      operator: "#DC2626",        // primary red
      punctuation: "#334155",
      property: "#1D4ED8",
      comment: "#475569",
      preprocessor: "#BE123C",
      builtin: "#1D4ED8",
      bracket1: "#D97706", bracket2: "#A21CAF", bracket3: "#1D4ED8", bracket4: "#059669", bracket5: "#BE123C", bracket6: "#0F766E"
    },
    dark: {
      function: "#38BDF8", variable: "#2DD4BF", parameter: "#FBBF24", type: "#C084FC", primitiveType: "#FB7185", keyword: "#F8FAFC", storage: "#E879F9", string: "#34D399", number: "#FB923C", boolean: "#FCD34D", operator: "#F87171", punctuation: "#E2E8F0", property: "#38BDF8", comment: "#94A3B8", preprocessor: "#FB7185", builtin: "#38BDF8", bracket1: "#FBBF24", bracket2: "#C084FC", bracket3: "#38BDF8", bracket4: "#34D399", bracket5: "#FB7185", bracket6: "#2DD4BF"
    }
  },
  "swiss-style": {
    name: "Swiss International Style",
    light: {
      function: "#2563EB",        // international blue
      method: "#0284C7",
      variable: "#0F766E",        // alpine teal
      parameter: "#D97706",       // zurich amber
      type: "#7C3AED",            // swiss iris
      primitiveType: "#9F1239",   // basel cherry
      keyword: "#111827",         // pure helvetica dark
      storage: "#6D28D9",
      string: "#166534",          // alpine forest
      number: "#C2410C",
      boolean: "#D97706",
      operator: "#E11D48",        // swiss flag red
      punctuation: "#1F2937",
      property: "#2563EB",
      comment: "#4B5563",
      preprocessor: "#E11D48",
      builtin: "#2563EB",
      bracket1: "#D97706", bracket2: "#7C3AED", bracket3: "#2563EB", bracket4: "#166534", bracket5: "#E11D48", bracket6: "#0F766E"
    },
    dark: {
      function: "#60A5FA", variable: "#34D399", parameter: "#FBBF24", type: "#C084FC", primitiveType: "#FB7185", keyword: "#F9FAFB", storage: "#A78BFA", string: "#4ADE80", number: "#FB923C", boolean: "#FCD34D", operator: "#F43F5E", punctuation: "#F3F4F6", property: "#60A5FA", comment: "#9CA3AF", preprocessor: "#F43F5E", builtin: "#60A5FA", bracket1: "#FBBF24", bracket2: "#C084FC", bracket3: "#60A5FA", bracket4: "#4ADE80", bracket5: "#FB7185", bracket6: "#34D399"
    }
  },
  "watercolor-wash": {
    name: "Watercolor Wash",
    light: {
      function: "#3730A3",        // indigo wash
      method: "#1E40AF",
      variable: "#0284C7",        // cerulean wash
      parameter: "#EA580C",       // cadmium orange
      type: "#6B21A8",            // ultramarine violet
      primitiveType: "#BE185D",   // quinacridone magenta
      keyword: "#1E40AF",         // cobalt wash
      storage: "#86198F",
      string: "#047857",          // viridian green
      number: "#C2410C",
      boolean: "#D97706",
      operator: "#DC2626",        // vermilion watercolor
      punctuation: "#4338CA",
      property: "#3730A3",
      comment: "#6366F1",
      preprocessor: "#BE185D",
      builtin: "#0284C7",
      bracket1: "#EA580C", bracket2: "#6B21A8", bracket3: "#0284C7", bracket4: "#047857", bracket5: "#BE185D", bracket6: "#3730A3"
    },
    dark: {
      function: "#818CF8", variable: "#38BDF8", parameter: "#FB923C", type: "#C084FC", primitiveType: "#F472B6", keyword: "#A5B4FC", storage: "#E879F9", string: "#34D399", number: "#FB923C", boolean: "#FBBF24", operator: "#F87171", punctuation: "#C7D2FE", property: "#818CF8", comment: "#818CF8", preprocessor: "#F472B6", builtin: "#38BDF8", bracket1: "#FB923C", bracket2: "#C084FC", bracket3: "#38BDF8", bracket4: "#34D399", bracket5: "#F472B6", bracket6: "#818CF8"
    }
  }
};

function getEnhancedTokenColors(p) {
  return [
    {
      name: 'Comments',
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: p.comment, fontStyle: 'italic' }
    },
    {
      name: 'Docstrings & JSDoc',
      scope: ['comment.block.documentation', 'storage.type.class.jsdoc', 'variable.other.jsdoc'],
      settings: { foreground: p.preprocessor, fontStyle: 'italic' }
    },
    {
      name: 'Keywords & Control Flow',
      scope: [
        'keyword.control',
        'keyword.control.conditional',
        'keyword.control.loop',
        'keyword.control.flow',
        'keyword.control.import',
        'keyword.control.export',
        'keyword.control.trycatch',
        'keyword.control.directive',
        'keyword.other'
      ],
      settings: { foreground: p.keyword, fontStyle: 'bold' }
    },
    {
      name: 'Storage & Modifiers',
      scope: ['storage.type', 'storage.modifier', 'keyword.declaration', 'keyword.control.default'],
      settings: { foreground: p.storage, fontStyle: 'bold' }
    },
    {
      name: 'Primitive Types (int, string, bool, void, double, char, etc.)',
      scope: [
        'storage.type.primitive',
        'storage.type.numeric',
        'storage.type.built-in',
        'storage.type.cs',
        'storage.type.c',
        'storage.type.cpp',
        'keyword.type'
      ],
      settings: { foreground: p.primitiveType, fontStyle: 'bold' }
    },
    {
      name: 'Types, Classes, Structs, Enums',
      scope: [
        'entity.name.type',
        'entity.name.class',
        'entity.name.type.class',
        'entity.name.type.interface',
        'entity.name.type.struct',
        'entity.name.type.enum',
        'support.type',
        'support.class'
      ],
      settings: { foreground: p.type, fontStyle: 'bold' }
    },
    {
      name: 'Function Definitions & Calls',
      scope: [
        'entity.name.function',
        'support.function',
        'meta.function-call entity.name.function',
        'meta.function-call'
      ],
      settings: { foreground: p.function, fontStyle: 'bold' }
    },
    {
      name: 'Methods',
      scope: [
        'entity.name.function.member',
        'meta.method-call entity.name.function',
        'support.function.misc'
      ],
      settings: { foreground: p.method, fontStyle: 'bold' }
    },
    {
      name: 'Function Parameters',
      scope: [
        'variable.parameter',
        'meta.parameter',
        'meta.function.parameters variable',
        'entity.name.variable.parameter'
      ],
      settings: { foreground: p.parameter, fontStyle: 'bold' }
    },
    {
      name: 'Local & Global Variables',
      scope: [
        'variable',
        'variable.other',
        'variable.other.readwrite',
        'variable.other.local',
        'variable.other.cpp',
        'variable.other.local.cpp',
        'variable.other.readwrite.cpp'
      ],
      settings: { foreground: p.variable, fontStyle: 'bold' }
    },
    {
      name: 'Constants & Readonly Variables',
      scope: [
        'variable.other.constant',
        'constant.language',
        'constant.other'
      ],
      settings: { foreground: p.boolean, fontStyle: 'bold' }
    },
    {
      name: 'Properties & Object Keys',
      scope: [
        'variable.other.property',
        'meta.object-literal.key',
        'support.type.property-name',
        'variable.other.object.property'
      ],
      settings: { foreground: p.property, fontStyle: 'bold' }
    },
    {
      name: 'Strings & Character Literals',
      scope: [
        'string',
        'string.quoted',
        'string.quoted.single',
        'string.quoted.double',
        'string.template'
      ],
      settings: { foreground: p.string }
    },
    {
      name: 'Template Literal Expressions',
      scope: [
        'punctuation.definition.template-expression',
        'meta.template.expression'
      ],
      settings: { foreground: p.operator, fontStyle: 'bold' }
    },
    {
      name: 'Numbers',
      scope: [
        'constant.numeric',
        'constant.numeric.integer',
        'constant.numeric.float',
        'constant.numeric.hex'
      ],
      settings: { foreground: p.number, fontStyle: 'bold' }
    },
    {
      name: 'Booleans, Null, Undefined',
      scope: [
        'constant.language.boolean',
        'constant.language.null',
        'constant.language.undefined'
      ],
      settings: { foreground: p.boolean, fontStyle: 'bold' }
    },
    {
      name: 'Operators',
      scope: [
        'keyword.operator',
        'keyword.operator.arithmetic',
        'keyword.operator.assignment',
        'keyword.operator.comparison',
        'keyword.operator.logical',
        'keyword.operator.bitwise',
        'keyword.operator.increment-decrement',
        'keyword.operator.ternary',
        'keyword.operator.bitwise.shift'
      ],
      settings: { foreground: p.operator, fontStyle: 'bold' }
    },
    {
      name: 'Punctuation & Delimiters',
      scope: [
        'punctuation.terminator',
        'punctuation.separator',
        'punctuation.delimiter',
        'punctuation.accessor'
      ],
      settings: { foreground: p.punctuation }
    },
    {
      name: 'Preprocessors & Includes (C/C++)',
      scope: [
        'meta.preprocessor',
        'keyword.control.directive.include',
        'string.quoted.other.lt-gt.include',
        'entity.name.function.preprocessor'
      ],
      settings: { foreground: p.preprocessor, fontStyle: 'bold' }
    },
    {
      name: 'Standard Library / Namespaces (std, cout, cin, console, Math)',
      scope: [
        'entity.name.namespace',
        'support.class.builtin',
        'support.constant',
        'variable.language'
      ],
      settings: { foreground: p.builtin, fontStyle: 'bold' }
    },
    {
      name: 'Tags (HTML/JSX)',
      scope: ['entity.name.tag'],
      settings: { foreground: p.type, fontStyle: 'bold' }
    },
    {
      name: 'Attributes (HTML/JSX)',
      scope: ['entity.other.attribute-name'],
      settings: { foreground: p.parameter, fontStyle: 'bold' }
    },
    {
      name: 'Invalid / Errors',
      scope: ['invalid', 'invalid.illegal'],
      settings: { foreground: '#FFFFFF', background: '#DC2626' }
    }
  ];
}

function getSemanticTokenColors(p) {
  return {
    "function": { "foreground": p.function, "bold": true },
    "method": { "foreground": p.method, "bold": true },
    "variable": { "foreground": p.variable, "bold": true },
    "variable.local": { "foreground": p.variable, "bold": true },
    "variable.readonly": { "foreground": p.boolean, "bold": true },
    "variable.defaultLibrary": { "foreground": p.builtin, "bold": true },
    "parameter": { "foreground": p.parameter, "bold": true },
    "property": { "foreground": p.property, "bold": true },
    "property.readonly": { "foreground": p.property, "bold": true },
    "type": { "foreground": p.type, "bold": true },
    "class": { "foreground": p.type, "bold": true },
    "interface": { "foreground": p.type, "bold": true },
    "enum": { "foreground": p.type, "bold": true },
    "enumMember": { "foreground": p.number, "bold": true },
    "keyword": { "foreground": p.keyword, "bold": true },
    "number": { "foreground": p.number, "bold": true },
    "string": { "foreground": p.string },
    "operator": { "foreground": p.operator, "bold": true },
    "macro": { "foreground": p.preprocessor, "bold": true },
    "namespace": { "foreground": p.builtin, "bold": true },
    "comment": { "foreground": p.comment, "italic": true }
  };
}

// process all 36 original theme files
const sourceFiles = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('.json'));

const generatedThemes = [];

for (const file of sourceFiles) {
  const content = JSON.parse(fs.readFileSync(path.join(SOURCE_DIR, file), 'utf8'));
  const isDark = content.type === 'dark' || file.includes('-dark-');

  // find matching style family
  const familyKey = Object.keys(THEME_STYLES).find(k => file.startsWith(k));
  const styleConfig = familyKey ? THEME_STYLES[familyKey] : THEME_STYLES["aurora-glass"];
  const palette = isDark ? styleConfig.dark : styleConfig.light;

  // build stepped gradient depth for the explorer/sidebar
  const baseBg = content.colors["editor.background"] || (isDark ? "#121820" : "#F4F7F6");
  const activityBg = content.colors["activityBar.background"] || (isDark ? "#0A1016" : "#17705F");
  const sidebarBase = content.colors["sideBar.background"] || (isDark ? "#10161E" : "#E6F1EE");

  // enhanced workbench colors with explorer gradient depth & rainbow bracket colors
  const enhancedColors = {
    ...content.colors,

    // explorer & sidebar gradient progression
    "activityBar.background": activityBg,
    "sideBar.background": sidebarBase,
    "sideBarSectionHeader.background": isDark ? `${activityBg}D0` : `${palette.function}18`,
    "sideBarSectionHeader.border": isDark ? `${palette.function}50` : `${palette.function}40`,
    "sideBar.border": isDark ? `${palette.function}30` : `${palette.function}25`,
    "sideBarTitle.foreground": palette.function,
    "list.activeSelectionBackground": isDark ? `${palette.function}35` : `${palette.function}25`,
    "list.hoverBackground": isDark ? `${palette.function}20` : `${palette.function}15`,
    "tree.indentGuidesStroke": isDark ? `${palette.function}40` : `${palette.function}30`,

    // rainbow bracket pair highlights
    "editorBracketHighlight.foreground1": palette.bracket1,
    "editorBracketHighlight.foreground2": palette.bracket2,
    "editorBracketHighlight.foreground3": palette.bracket3,
    "editorBracketHighlight.foreground4": palette.bracket4,
    "editorBracketHighlight.foreground5": palette.bracket5,
    "editorBracketHighlight.foreground6": palette.bracket6,
    "editorBracketHighlight.unexpectedBracket.foreground": "#DC2626",
    "editorBracketPairGuide.activeBackground1": `${palette.bracket1}80`,
    "editorBracketPairGuide.activeBackground2": `${palette.bracket2}80`,
    "editorBracketPairGuide.activeBackground3": `${palette.bracket3}80`,
    "editorBracketPairGuide.activeBackground4": `${palette.bracket4}80`,
    "editorBracketPairGuide.activeBackground5": `${palette.bracket5}80`,
    "editorBracketPairGuide.activeBackground6": `${palette.bracket6}80`,
    "editorBracketMatch.border": palette.operator
  };

  // extract clean characteristic name
  const characteristic = content.name
    .replace(/^(Anorak Vivid Pro:\s*|Anorak:\s*|VOID-FAi_DeThemeZ_)/, '')
    .trim();

  // new name: De_themes From FAi 🔥 <Characteristic>
  const newThemeName = `De_themes From FAi 🔥 ${characteristic}`;

  const enhancedTheme = {
    name: newThemeName,
    type: isDark ? 'dark' : 'light',
    semanticHighlighting: true,
    colors: enhancedColors,
    semanticTokenColors: getSemanticTokenColors(palette),
    tokenColors: getEnhancedTokenColors(palette)
  };

  fs.writeFileSync(path.join(TARGET_DIR, file), JSON.stringify(enhancedTheme, null, 2));

  generatedThemes.push({
    label: newThemeName,
    uiTheme: isDark ? 'vs-dark' : 'vs',
    path: `./themes/${file}`
  });
}

console.log(`Successfully generated ${generatedThemes.length} enhanced themes under "De_themes From FAi 🔥"!`);
