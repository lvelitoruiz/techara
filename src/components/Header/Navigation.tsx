import React from "react";
import Link from "next/link";
import LinearIcon from "../LinearIcon";

interface NavigationProps {
  onSearchClick: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onSearchClick }) => {
  return (
    <nav>
      <ul className="flex space-x-8 font-light text-base uppercase">
        <li>
          <Link href="/" className="hover:text-blue-500">
            Inicio
          </Link>
        </li>
        <li>
          <Link href="/productos" className="hover:text-blue-500">
            Productos
          </Link>
        </li>
        <li>
          <Link href="/sobre-nosotros" className="hover:text-blue-500">
            Sobre Nosotros
          </Link>
        </li>
        <li>
          <Link href="/contacto" className="hover:text-blue-500">
            Contacto
          </Link>
        </li>
        <li>
          <button onClick={onSearchClick}>
            <LinearIcon name="magnifier" size={20} color="" />
          </button>
        </li>
        <li>
          <Link href="/user">
            <LinearIcon name="user" size={20} color="" />
          </Link>
        </li>
        <li>
          <Link href="/carrito">
            <LinearIcon name="cart" size={20} color="" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;