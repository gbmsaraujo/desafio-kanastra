import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-green-800">
      <nav>
        <ul className="flex text-white p-2 justify-center gap-14">
          <li className="cursor-pointer hover:font-semibold">
            <Link to="/"> Home</Link>{" "}
          </li>
          <li className="cursor-pointer hover:font-semibold">
            <Link to="/list"> Listar Arquivos</Link>{" "}
          </li>
        </ul>
      </nav>
    </header>
  );
}
