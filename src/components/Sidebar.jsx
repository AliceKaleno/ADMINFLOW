import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart3,
  Moon,
  Sun,
  CalendarDays,
  User
} from "lucide-react";

export default function Sidebar() {

  const usuario = JSON.parse(
    localStorage.getItem("usuario") || "{}"
  );

  const location = useLocation();

  const [darkMode, setDarkMode] = useState(() => {

    const temaSalvo =
      localStorage.getItem("theme");

    return temaSalvo === "dark";

  });

  useEffect(() => {

    if (darkMode) {

      document.documentElement.classList.add("dark");

      localStorage.setItem(
        "theme",
        "dark"
      );

    } else {

      document.documentElement.classList.remove("dark");

      localStorage.setItem(
        "theme",
        "light"
      );

    }

  }, [darkMode]);

  const menu = [
    {
      nome: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },

    {
      nome: "Usuários",
      icon: <Users size={20} />,
      path: "/usuarios",
    },

    {
      nome: "Vendas",
      icon: <ShoppingCart size={20} />,
      path: "/vendas",
    },

    {
      nome: "Analytics",
      icon: <BarChart3 size={20} />,
      path: "/analytics",
    },

    {
      nome: "Calendário",
      icon: <CalendarDays size={20} />,
      path: "/calendar",
    },

    {
      nome: "Perfil",
      icon: <User size={20} />,
      path: "/profile",
    },
  ];

  return (

    <div className="
      w-72 h-screen
      bg-white dark:bg-[#111827]
      border-r border-gray-200 dark:border-white/10
      text-gray-800 dark:text-white
      flex flex-col p-6
      transition-all duration-300
    ">

      {/* LOGO */}
      <div className="mb-10">

        <h1 className="
          text-3xl font-extrabold
          bg-gradient-to-r
          from-indigo-500 to-purple-600
          bg-clip-text text-transparent
        ">
          AdminFlow
        </h1>

        <p className="
          text-gray-500 dark:text-gray-400
          text-sm mt-2
        ">
          Enterprise Management
        </p>

      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-3">

        {menu.map((item, index) => {

          const ativo =
            location.pathname === item.path;

          return (

            <Link
              key={index}
              to={item.path}

              className={`
                flex items-center gap-3
                px-4 py-3 rounded-2xl
                transition-all duration-300

                ${
                  ativo
                    ? `
                      bg-indigo-600
                      text-white
                      shadow-lg
                      shadow-indigo-600/30
                    `
                    : `
                      hover:bg-gray-100
                      dark:hover:bg-white/10
                    `
                }
              `}
            >

              {item.icon}

              <span className="font-medium">
                {item.nome}
              </span>

            </Link>

          );

        })}

      </nav>

      {/* DARK MODE */}
      <button
        onClick={() =>
          setDarkMode(!darkMode)
        }

        className="
          mt-10
          bg-gradient-to-r
          from-indigo-600
          to-purple-600
          p-5 rounded-3xl
          shadow-2xl
          hover:scale-[1.02]
          transition-all
          text-left
          text-white
        "
      >

        <div className="
          flex items-center gap-3 mb-3
        ">

          {darkMode
            ? <Sun />
            : <Moon />
          }

          <h2 className="font-bold text-lg">

            {darkMode
              ? "Modo Claro"
              : "Modo Escuro"}

          </h2>

        </div>

        <p className="text-sm text-white/80">

          {darkMode
            ? "Clique para voltar ao tema claro."
            : "Ative o visual premium escuro."}

        </p>

      </button>

      {/* FOOTER */}
      <div className="
        mt-auto
        border-t border-gray-200
        dark:border-white/10
        pt-5
      ">

        <div className="
          flex items-center gap-3
        ">

          {/* AVATAR */}
          <div className="
            w-11 h-11 rounded-full
            overflow-hidden
            bg-indigo-600
          ">

            {usuario?.avatar ? (

              <img
                src={usuario.avatar}
                alt="avatar"
                className="
                  w-full h-full object-cover
                "
              />

            ) : (

              <div className="
                w-full h-full
                flex items-center justify-center
                text-white font-bold
              ">

                {usuario?.nome?.charAt(0) || "A"}

              </div>

            )}

          </div>

          {/* INFO */}
          <div>

            <p className="
              font-semibold
              dark:text-white
            ">
              {usuario?.nome || "Usuário"}
            </p>

            <p className="
              text-sm
              text-gray-500 dark:text-gray-400
            ">
              {usuario?.role || "Administrador"}
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}
