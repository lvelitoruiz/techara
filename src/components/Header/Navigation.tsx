import React from "react";
import Link from "next/link";
import LinearIcon from "../LinearIcon";

interface NavigationProps {
  onSearchClick: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onSearchClick }) => {
  return (
    <nav className="w-full flex justify-between items-center">
      <ul className="md:flex font-light text-base uppercase items-center gap-10 hidden">
        <li className="header__primary-nav-item">
          <Link href="/" className="text-xs tracking-widest">
            Inicio
          </Link>
        </li>
        <li className="header__primary-nav-item">
          <Link href="/productos" className="text-xs tracking-widest">
            Productos
          </Link>
        </li>
        <li className="header__primary-nav-item">
          <Link href="/sobre-nosotros" className="text-xs tracking-widest">
            Sobre Nosotros
          </Link>
        </li>
        <li className="header__primary-nav-item">
          <Link href="/contacto" className="text-xs tracking-widest">
            Contacto
          </Link>
        </li>
      </ul>
      <ul className="flex font-light text-base uppercase items-center gap-5">
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