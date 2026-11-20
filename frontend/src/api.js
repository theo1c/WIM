// All HTTP requests live here; components never call fetch directly.
// ADAPT: "items" is the resource of this project (key in db.json).
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

// Shared function: sends JSON and throws if the response is not 2xx
async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!res.ok) {
    throw new Error(`Server error: ${res.status}`);
  }
  // 204 No Content has no body
  return res.status === 204 ? null : res.json();
}

export function fetchItems() {
  return request("/items");
}

export function fetchItem(id) {
  return request(`/items/${id}`);
}

export function createItem(item) {
  return request("/items", { method: "POST", body: JSON.stringify(item) });
}

export function updateItem(id, changes) {
  return request(`/items/${id}`, {
    method: "PATCH",
    body: JSON.stringify(changes),
  });
}

export function deleteItem(id) {
  return request(`/items/${id}`, { method: "DELETE" });
}
