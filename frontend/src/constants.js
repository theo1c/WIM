// Fixed values and their labels, in a single place.
export const LEVELS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const LEVEL_LABELS = Object.fromEntries(
  LEVELS.map((l) => [l.value, l.label])
);

export const CATEGORIES = ["Electrodes", "Wire", "Nozzles", "Gas cylinders"];

export const UNITS = {
  Electrodes: "packs",
  Wire: "spools",
  Nozzles: "packs",
  "Gas cylinders": "cylinders",
};
