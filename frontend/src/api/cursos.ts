const BASE_URL = "http://localhost:8080";

export async function getCursos() {
  const res = await fetch(`${BASE_URL}/cursos`);
  return res.json();
}

export async function createCurso(data: { nome: string; periodo: string }) {
  return fetch(`${BASE_URL}/cursos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateCurso(data: { id: number; nome: string; periodo: string }) {
  return fetch(`${BASE_URL}/cursos`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteCurso(id: number) {
  return fetch(`${BASE_URL}/cursos/${id}`, { method: "DELETE" });
}