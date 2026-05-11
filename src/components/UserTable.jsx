export default function UserTable({ usuarios }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-4">Usuário</th>
            <th className="text-left p-4">Email</th>
            <th className="text-left p-4">Cargo</th>
            <th className="text-left p-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((u, i) => (
            <tr
              key={i}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
                  {u.nome.charAt(0)}
                </div>

                <span>{u.nome}</span>
              </td>

              <td className="p-4">{u.email}</td>

              <td className="p-4">
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                  {u.role}
                </span>
              </td>

              <td className="p-4">
                <span className="text-green-500 font-semibold">
                  Online
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
