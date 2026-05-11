import { useState } from "react";
import { api } from "../services/api";

export default function CreateSaleModal({
  aberto,
  fechar,
  atualizar
}) {

  const [cliente, setCliente] = useState("");
  const [valor, setValor] = useState("");
  const [status, setStatus] = useState("Pago");

  if (!aberto) return null;

  async function criarVenda() {

    try {

      await api.post("/vendas", {
        cliente,
        valor,
        status
      });

      atualizar();

      fechar();

      setCliente("");
      setValor("");

    } catch (err) {
      console.error(err);
      alert("Erro ao criar venda");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white p-8 rounded-3xl w-[400px]">

        <h2 className="text-2xl font-bold mb-6">
          Nova Venda
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Cliente"
            className="w-full border p-3 rounded-xl"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />

          <input
            type="number"
            placeholder="Valor"
            className="w-full border p-3 rounded-xl"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />

          <select
            className="w-full border p-3 rounded-xl"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Pago</option>
            <option>Pendente</option>
          </select>

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={fechar}
            className="bg-gray-200 px-4 py-2 rounded-xl"
          >
            Cancelar
          </button>

          <button
            onClick={criarVenda}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
          >
            Criar
          </button>

        </div>

      </div>
    </div>
  );
}
