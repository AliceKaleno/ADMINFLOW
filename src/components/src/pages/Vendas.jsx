import { useEffect, useState } from "react";
import { api } from "../services/api";
import Sidebar from "../components/Sidebar";
import CreateSaleModal from "../components/CreateSaleModal";

export default function Vendas() {

  const [vendas, setVendas] = useState([]);
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);

  async function carregarVendas() {
    try {
      const res = await api.get("/vendas");
      setVendas(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
  async function fetchData() {
    await carregarVendas();
  }

  fetchData();
}, []);

  const vendasFiltradas = vendas.filter((v) =>
    v.cliente.toLowerCase().includes(busca.toLowerCase())
  );

  const total = vendas.reduce((acc, v) => acc + v.valor, 0);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 dark:bg-[#0f172a] min-h-screen p-8 transition-all duration-300">

        {/* TOPO */}
        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-3xl font-bold">
              Vendas
            </h1>

            <p className="text-gray-500">
              Controle financeiro da empresa
            </p>
          </div>

          <button
  onClick={() => setModalAberto(true)}
  className="bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition"
>
  + Nova Venda
</button>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">
              Total em vendas
            </p>

            <h2 className="text-3xl font-bold mt-2">
              R$ {total}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">
              Pagas
            </p>

            <h2 className="text-3xl font-bold mt-2 text-green-500">
              {
                vendas.filter(v => v.status === "Pago").length
              }
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">
              Pendentes
            </p>

            <h2 className="text-3xl font-bold mt-2 text-yellow-500">
              {
                vendas.filter(v => v.status === "Pendente").length
              }
            </h2>
          </div>
        </div>

        {/* BUSCA */}
        <input
          type="text"
          placeholder="Buscar cliente..."
          className="w-full p-4 rounded-2xl border mb-6"
          onChange={(e) => setBusca(e.target.value)}
        />

        {/* TABELA */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">
                  Cliente
                </th>

                <th className="text-left p-4">
                  Valor
                </th>

                <th className="text-left p-4">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {vendasFiltradas.map((v, i) => (
                <tr
                  key={i}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    {v.cliente}
                  </td>

                  <td className="p-4 font-bold">
                    R$ {v.valor}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm text-white
                      ${
                        v.status === "Pago"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {v.status}
                    </span>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

              <CreateSaleModal
  aberto={modalAberto}
  fechar={() => setModalAberto(false)}
  atualizar={carregarVendas}
/>

    </div>
  );
}