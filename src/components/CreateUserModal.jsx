import { useState } from "react";
import { api } from "../services/api";

export default function CreateUserModal({
  aberto,
  fechar,
  atualizarUsuarios
}) {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  if (!aberto) return null;

  async function criarUsuario() {

    if (!nome || !email || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    try {

      await api.post("/register", {
        nome,
        email,
        senha
      });

      // 🔄 Atualiza lista
      atualizarUsuarios();

      // ❌ Fecha modal
      fechar();

      // 🧹 Limpa campos
      setNome("");
      setEmail("");
      setSenha("");

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.message ||
        "Erro ao criar usuário"
      );

    }

  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white w-[420px] rounded-3xl p-8 shadow-2xl animate-fade-in">

        {/* TOPO */}
        <div className="mb-6">

          <h2 className="text-2xl font-bold">
            Novo Usuário
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Cadastre um novo colaborador
          </p>

        </div>

        {/* CAMPOS */}
        <div className="space-y-4">

          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>

        {/* BOTÕES */}
        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={fechar}
            className="px-5 py-3 rounded-2xl bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancelar
          </button>

          <button
            onClick={criarUsuario}
            className="px-5 py-3 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Criar Usuário
          </button>

        </div>

      </div>

    </div>
  );
}
