import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import styles from "./CardCurso.module.css";
import { getCursos, createCurso, deleteCurso } from "../api/cursos";

type CursoType = {
  id: number;
  nome: string;
  periodo: string;
};

export default function Curso() {
  const [nomeCurso, setNomeCurso] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [listaCursos, setListaCursos] = useState<CursoType[]>([]);

  useEffect(() => {
    getCursos().then(setListaCursos);
  }, []);

  async function inserirCurso() {
    if (!nomeCurso || !periodo) {
      toast.error("Preencha todos os campos");
      return;
    }

    const res = await createCurso({ nome: nomeCurso, periodo });

    if (res.status === 409) {
      toast.error("Já existe um curso com esse nome");
      return;
    }

    if (!res.ok) {
      toast.error("Erro ao cadastrar curso");
      return;
    }

    toast.success("Curso cadastrado!");
    setNomeCurso("");
    setPeriodo("");
    getCursos().then(setListaCursos);
  }

  async function removerCurso(id: number) {
    await deleteCurso(id);
    setListaCursos((prev) => prev.filter((c) => c.id !== id));
    toast.success("Curso removido!");
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* HEADER */}
        <div className={styles.header}>
          <h1>Cadastro de Curso e Período</h1>
        </div>

        {/* CONTENT */}
        <div className={styles.content}>
          {/* FORM */}
          <h2 className={styles.sectionTitle}>Cadastrar novo Curso</h2>

          <div className={styles.formGroup}>
            <label>Nome do Curso</label>
            <input
              type="text"
              placeholder="Digite o nome do curso"
              value={nomeCurso}
              onChange={(e) => setNomeCurso(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Período</label>
            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="MATUTINO">Matutino</option>
              <option value="VESPERTINO">Vespertino</option>
              <option value="NOTURNO">Noturno</option>
              <option value="INTEGRAL">Integral</option>
            </select>
          </div>

          <div className={styles.buttonArea}>
            <button className={styles.addButton} onClick={inserirCurso}>
              Inserir Curso
            </button>
          </div>

          <hr className={styles.divider} />

          {/* LISTA */}
          <h2 className={styles.sectionTitle}>Lista de Cursos</h2>

          <div className={styles.formGroup}>
            <input type="text" placeholder="Buscar Curso pelo Nome" />
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Curso</th>
                <th>Período</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {listaCursos.length > 0 ? (
                listaCursos.map((curso) => (
                  <tr key={curso.id}>
                    <td>{curso.nome}</td>
                    <td>{curso.periodo}</td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.iconButton}>
                          <FaEdit size={18} />
                        </button>
                        <button
                          className={`${styles.iconButton} ${styles.delete}`}
                          onClick={() => removerCurso(curso.id)}
                        >
                          <FaTrashAlt size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className={styles.empty}>
                    Nenhum curso cadastrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}