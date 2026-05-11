import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Bell } from "lucide-react";


export default function Notifications() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    const socket = io(window.location.origin);

    socket.on("notificacao", (data) => {
      // 🔔 salva no histórico
      setNotificacoes((prev) => [data, ...prev]);

      // ⚡ mostra toast temporário
      const id = Date.now();
      setToasts((prev) => [...prev, { ...data, id }]);

      // ⏱️ remove após 5s
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <>
      {/* 🔔 SINO */}
      <div className="relative">
        <button onClick={() => setAberto(!aberto)} className="relative">
          <Bell size={24} />

          {notificacoes.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
              {notificacoes.length}
            </span>
          )}
        </button>

        {/* 📋 DROPDOWN */}
        {aberto && (
          <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-xl p-3 z-50">
            <h2 className="font-bold mb-2">Notificações</h2>

            {notificacoes.length === 0 ? (
              <p className="text-gray-500 text-sm">
                Nenhuma notificação
              </p>
            ) : (
              notificacoes.map((n, i) => (
                <div
                  key={i}
                  className="bg-gray-100 p-2 mb-2 rounded text-sm"
                >
                  {n.mensagem}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* ⚡ TOASTS (aparecem e somem) */}
      <div className="fixed top-5 right-5 z-50 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-black text-white p-3 rounded shadow-lg animate-slide-in"
          >
            {t.mensagem}
          </div>
        ))}
      </div>
    </>
  );
}
