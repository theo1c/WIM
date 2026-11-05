
const items = [
  { id: 1, name: "E6013 electrodes 2.5 mm", reordered: false, level: "low", category: "Electrodes", quantity: 2 },
  { id: 2, name: "ER70S-6 MIG wire 0.8 mm", reordered: true, level: "medium", category: "Wire", quantity: 4 },
  { id: 3, name: "Corgon cylinder 18 L", reordered: false, level: "high", category: "Gas cylinders", quantity: 6 },
];

const STOCK_LEVELS = ["low", "medium", "high"];

function listNames(list) {
  return list.map((i) => i.name);
}

function countNeedReorder(list) {
  return list.filter((i) => !i.reordered).length;
}

function searchByName(list, text) {
  const query = text.toLowerCase();
  return list.filter((i) => i.name.toLowerCase().includes(query));
}

function nextId(list) {
  return list.reduce((max, i) => Math.max(max, i.id), 0) + 1;
}

function addItem(list, name, level = "medium", quantity = 0, category = "Electrodes") {
  const cleanName = name.trim();
  if (cleanName === "") {
    console.log("The item name cannot be empty.");
    return list;
  }
  if (!STOCK_LEVELS.includes(level)) {
    console.log("Invalid stock level: " + level);
    return list;
  }
  if (!Number.isInteger(quantity) || quantity < 0) {
    console.log("Invalid quantity: " + quantity);
    return list;
  }
  const created = { id: nextId(list), name: cleanName, reordered: false, level, category, quantity };
  return [...list, created];
}

function toggleReordered(list, id) {
  return list.map((i) => (i.id === id ? { ...i, reordered: !i.reordered } : i));
}

function deleteItem(list, id) {
  return list.filter((i) => i.id !== id);
}

// ---------- Manual tests ----------
console.log("--- Read ---");
console.log("Names:", listNames(items).join(", "));
console.log("Need reorder:", countNeedReorder(items));
console.log("Search 'wire':", listNames(searchByName(items, "wire")).join(", "));

console.log("--- Add ---");
let list = addItem(items, "Contact tips 1.0 mm", "low", 50, "Nozzles");
console.log("New list:", list.length, "items");
console.log("Original still has:", items.length, "items");

console.log("--- Toggle and delete ---");
list = toggleReordered(list, 1);
console.log("After toggling id 1, need reorder:", countNeedReorder(list));
list = deleteItem(list, 3);
console.log("After deleting id 3:", listNames(list).join(", "));

console.log("--- Validation ---");
addItem(list, "   ");
addItem(list, "Something", "urgent");
addItem(list, "Something", "low", -5);
