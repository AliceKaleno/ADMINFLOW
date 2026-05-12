import { useState } from "react";
import { Bot, Send, X } from "lucide-react";

export default function AIAssistant() {

  const [aberto, setAberto] = useState(false);

  const [mensagem, setMensagem] = useState("");

  const [chat, setChat] = useState([
    {
      autor: "ia",
      texto:
        "Olá 👋\n\nComandos disponíveis:\n\n• vendas\n• usuarios\n• crescimento\n• ajuda"
    }
  ]);

  function responderIA(texto) {

    const comando = texto.toLowerCase();

    if (
      comando.includes("vendas")
    ) {
      return "💰 Vendas atuais: R$ 32.400";
    }

    if (
      comando.includes("usuarios") ||
      comando.includes("users")
    ) {
      return "👥 Usuários cadastrados: 1245";
    }

    if (
      comando.includes("crescimento")
    ) {
      return "📈 Crescimento atual: 12%";
    }

    if (
      comando.includes("ajuda")
    ) {
      return `
🤖 Comandos disponíveis:

• vendas
• usuarios
• crescimento
• ajuda
      `;
    }

    return "🤖 Não entendi esse comando.";
  }

  function enviarMensagem() {

    if (!mensagem.trim()) return;

    const novaMensagem = {
      autor: "user",
      texto: mensagem
    };

    const respostaIA = {
      autor: "ia",
      texto: responderIA(mensagem)
    };

    setChat((prev) => [
      ...prev,
      novaMensagem,
      respostaIA
    ]);

    setMensagem("");
  }

  return (
    <>
      {/* BOTÃO FLUTUANTE */}
      <button
        onClick={() => setAberto(!aberto)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition z-50"
      >
        {aberto ? <X /> : <Bot />}
      </button>

      {/* CHAT */}
      {aberto && (
        <div className="fixed bottom-24 right-6 w-[370px] h-[550px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50">

          {/* TOPO */}
          <div className="bg-indigo-600 text-white p-4 font-bold text-lg">
            Assistente Virtual IA
          </div>

          {/* MENSAGENS */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-100">

            {chat.map((msg, i) => (

              <div
                key={i}
                className={`max-w-[80%] p-3 rounded-2xl whitespace-pre-line ${
                  msg.autor === "user"
                    ? "bg-indigo-600 text-white ml-auto"
                    : "bg-white shadow"
                }`}
              >
                {msg.texto}
              </div>

            ))}

          </div>

          {/* INPUT */}
          <div className="p-3 border-t flex gap-2">

            <input
              type="text"
              placeholder="Digite um comando..."
              className="flex-1 border rounded-xl px-4"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}

              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  enviarMensagem();
                }
              }}
            />

            <button
              onClick={enviarMensagem}
              className="bg-indigo-600 text-white p-3 rounded-xl"
            >
              <Send size={18} />
            </button>

          </div>

        </div>
      )}
    </>
  );
}
