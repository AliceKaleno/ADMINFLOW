import { useState } from "react";

import Sidebar from "../components/Sidebar";

import {
  Calendar,
  momentLocalizer
} from "react-big-calendar";

import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function CalendarPage() {

  // 📅 EVENTOS
  const [eventos, setEventos] = useState([
    {
      title: "Reunião equipe",
      start: new Date(),
      end: new Date(),
    },
  ]);

  // 📅 DATA ATUAL
  const [date, setDate] = useState(new Date());

  // 👀 VISUALIZAÇÃO
  const [view, setView] = useState("month");

  // ➕ ADICIONAR EVENTO
  function adicionarEvento({ start, end }) {

  const titulo = prompt(
    "Digite o nome do evento:"
  );

  if (!titulo) return;

  const categoria = prompt(
    "Categoria: reuniao | vendas | urgente | marketing"
  );

  setEventos([
    ...eventos,
    {
      title: titulo,
      start,
      end,
      categoria,
    },
  ]);
}

  return (

    <div className="flex bg-gray-100 dark:bg-[#0f172a] min-h-screen transition-all">

      <Sidebar />

      <div className="flex-1 p-8">

        {/* TOPO */}
        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Calendário Corporativo
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Gerencie reuniões, tarefas e eventos
          </p>

        </div>

        {/* CALENDÁRIO */}
        <div className="bg-white dark:bg-[#111827] p-6 rounded-3xl shadow-2xl h-[80vh]">

          <Calendar
            localizer={localizer}
            events={eventos}

            // ✅ FUNCIONA BACK/NEXT/TODAY
            date={date}
            onNavigate={(newDate) =>
              setDate(newDate)
            }

            // ✅ FUNCIONA MONTH/WEEK/DAY/AGENDA
            view={view}
            onView={(newView) =>
              setView(newView)
            }

            startAccessor="start"
            endAccessor="end"

            selectable
            onSelectSlot={adicionarEvento}

            popup

            style={{
              height: "100%",
            }}

            eventPropGetter={(event) => {

  let backgroundColor = "#6366f1";

  if (event.categoria === "vendas") {
    backgroundColor = "#10b981";
  }

  if (event.categoria === "urgente") {
    backgroundColor = "#ef4444";
  }

  if (event.categoria === "marketing") {
    backgroundColor = "#a855f7";
  }

  return {
    style: {
      backgroundColor,
      borderRadius: "10px",
      border: "none",
      color: "white",
      padding: "4px",
    },
  };
}}

          />

        </div>

      </div>

    </div>
  );
}
