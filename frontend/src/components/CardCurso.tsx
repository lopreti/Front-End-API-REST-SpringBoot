// CursoPeriodo.tsx
import { useState } from "react";
import { FaEdit, FaTimes, FaTrashAlt } from "react-icons/fa";
import s from "../styles/global.css";
import styles from "./CardCurso.module.css";

type CursoType = {
  id: number;
  nome: string;
  periodo: string;
};

export default function Curso() {
  const [nomeCurso, setNomeCurso] = useState("");
  const [periodo, setPeriodo] = useState("");

  const [listaCursos, setListaCursos] = useState<CursoType[]>([
    {
      id: 1,
      nome: "Biologia",
      periodo: "Noturno",
    },
  ]);

  function inserirCurso() {
    if (!nomeCurso || !periodo) {
      alert("Preencha todos os campos");
      return;
    }

    const novoCurso: CursoType = {
      id: Date.now(),
      nome: nomeCurso,
      periodo: periodo,
    };

    setListaCursos([...listaCursos, novoCurso]);

    setNomeCurso("");
    setPeriodo("");
  }

  function removerCurso(id: number) {
    const novaLista = listaCursos.filter((curso) => curso.id !== id);

    setListaCursos(novaLista);
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

              <option value="Manhã">Manhã</option>

              <option value="Tarde">Tarde</option>

              <option value="Noturno">Noturno</option>
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
