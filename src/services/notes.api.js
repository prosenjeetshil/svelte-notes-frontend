
console.log(import.meta.env.VITE_API_BASE_URL);

const BASE_URL = import.meta.env.VITE_API_BASE_URL + "/notes";

export async function getNotes() {
  const res = await fetch(BASE_URL);
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
  return res.json();
}
