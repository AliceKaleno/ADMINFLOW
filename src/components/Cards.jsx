import { useEffect, useState } from "react";
import { api } from "../services/api";
import { io } from "socket.io-client";

import {
  Users,
  DollarSign,
  TrendingUp,
} from "lucide-react";

export default function Cards() {

  const [data, setData] = useState(null);

  useEffect(() => {

  async function carregarDashboard() {

    try {

      const res = await api.get("/dashboard");

      setData(res.data);

    } catch (err) {

      console.error(err);

    }

  }

  carregarDashboard();

  const socket = io(window.location.origin);

  socket.on("dashboardUpdate", () => {

    carregarDashboard();

  });

  return () => socket.disconnect();

}, []);

  if (!data)
    return (
      <div className="text-white text-lg">
        Carregando métricas...
      </div>
    );

  const cards = [
    {
      title: "Usuários",
      value: data.usuarios,
      icon: <Users size={28} />,
      gradient:
        "from-blue-500 to-indigo-600",

      glow:
        "shadow-blue-500/30",
    },

    {
      title: "Vendas",
      value: `R$ ${data.vendas}`,
      icon: <DollarSign size={28} />,

      gradient:
        "from-emerald-500 to-green-600",

      glow:
        "shadow-green-500/30",
    },

    {
      title: "Crescimento",
      value: `${data.crescimento}%`,
      icon: <TrendingUp size={28} />,

      gradient:
        "from-purple-500 to-pink-600",

      glow:
        "shadow-purple-500/30",
    },
  ];

  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {cards.map((item, index) => (

        <div
          key={index}

              className={`
      relative overflow-hidden
      bg-white dark:bg-[#111827]
      dark:text-white
      border border-gray-200 dark:border-white/10
      rounded-3xl
      p-6
      shadow-2xl
      ${item.glow}
      hover:scale-[1.03]
      transition-all
      duration-300
`}
        >

          {/* BRILHO */}
          <div
            className={`
              absolute inset-0 opacity-10
              bg-gradient-to-br ${item.gradient}
            `}
          />

          {/* CONTEÚDO */}
          <div className="relative z-10 flex justify-between items-center">

            <div>

              <p className="text-gray-400 text-sm mb-2">
                {item.title}
              </p>

              <h2 className="text-4xl font-bold text-white">
                {item.value}
              </h2>

            </div>

            {/* ÍCONE */}
            <div
              className={`
                bg-gradient-to-br ${item.gradient}
                p-4 rounded-2xl
                shadow-lg
              `}
            >

              {item.icon}

            </div>

          </div>

          {/* BOLINHA DECORATIVA */}
          <div
            className={`
              absolute -top-10 -right-10
              w-32 h-32 rounded-full
              bg-gradient-to-br ${item.gradient}
              opacity-20 blur-3xl
            `}
          />

        </div>

      ))}

    </div>
  );
}
