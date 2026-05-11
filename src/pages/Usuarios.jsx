import { useEffect, useState } from "react";
import { api } from "../services/api";
import Sidebar from "../components/Sidebar";
import UserTable from "../components/UserTable";
import CreateUserModal from "../components/CreateUserModal";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
  carregarUsuarios();
}, []);

  const usuariosFiltrados = usuarios.filter((u) =>
    u.nome.toLowerCase().includes(busca.toLowerCase())
  );

  async function carregarUsuarios() {
  try {
    const res = await api.get("/usuarios");
    console.log(res.data);
    setUsuarios(res.data);
  } catch (err) {
    console.error(err);
  }
}

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 dark:bg-[#0f172a] min-h-screen p-8 transition-all duration-300">

        {/* TOPO */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              Usuários
            </h1>

            <p className="text-gray-500">
              Gerencie todos os usuários da plataforma
            </p>
          </div>

          <button
          onClick={() => setModalAberto(true)}
          className="bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          + Novo Usuário
        </button>
        
        </div>

        {/* BUSCA */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar usuário..."
            className="w-full p-4 rounded-2xl border outline-none"
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        {/* TABELA */}
        <UserTable usuarios={usuariosFiltrados} />
      </div>
          <CreateUserModal
        aberto={modalAberto}
        fechar={() => setModalAberto(false)}
        atualizarUsuarios={carregarUsuarios}
      />
    </div>
  );
}
