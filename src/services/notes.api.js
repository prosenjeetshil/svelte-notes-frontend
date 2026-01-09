console.log(import.meta.env.VITE_API_BASE_URL);

const BASE_URL = import.meta.env.VITE_API_BASE_URL + "/notes";

export async function getNotes() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}

export async function createNote(note) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
}

export async function updateNote(id, note) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
}

export async function deleteNote(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete note");
}
