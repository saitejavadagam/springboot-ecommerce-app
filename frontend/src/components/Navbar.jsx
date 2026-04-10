import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from '../store/useAuthStore';
import AccountDropDown from './AccountDropDown';


const Navbar = () => {


  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const token = useAuthStore(state => state.token);

  const handleSearch = (e) => {
    if (e.key == "Enter") {
      navigate(`/products?search=${encodeURIComponent(search)}`);
    }
  }


  const cartLength = useCartStore(state =>
    state.cart?.items.reduce(
      (total, item) => total + (item.quantity || 0),
      0
    ) || 0
  );

  return (
    <header className="w-full bg-white border-b drop-shadow-sm border-slate-200 sticky top-0 z-50">
      <nav className="px-4 md:px-6 lg:px-10 h-16 flex items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-wide text-slate-900"
        >
          ShopEase
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-full
              border border-slate-300
              focus:outline-none focus:ring-2 focus:ring-slate-900
              focus:border-slate-900"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>

        {/* Links */}
        <ul className="hidden md:flex gap-8 text-slate-700 font-medium">
          {["/products"].map((path, i) => {
            const label = ["Products"][i];
            return (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `transition ${isActive
                      ? "text-slate-900"
                      : "hover:text-slate-900"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className='ml-auto'>
          {
            !token ? (
              <Link to="/login"
                className='ml-auto px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-full hover:bg-slate-700 transition'
              >
                Sign In
              </Link>
            ) : (
              <div className='flex items-center gap-6'>
                <AccountDropDown />
                <Link
                  to="/cart"
                  className="relative text-slate-700 hover:text-slate-900 transition"
                >
                  <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                  <span className="absolute -top-2 -right-3 bg-slate-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartLength}
                  </span>
                </Link>
              </div>

            )
          }
        </div>

      </nav>
    </header>
  );
};

export default Navbar;
