import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom'

const AccountDropDown = () => {

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const logout = useAuthStore(state => state.logout);

    const handleLogout = () => {
        logout();
        setOpen(false);
        navigate("/login");
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div
            className='relative'
            ref={dropdownRef}
        >
            <button
                onClick={() => setOpen(prev => !prev)}
                className='flex items-center gap-2 text-slate-700 hover:text-slate-900 transition font-medium'
            >
                Account
                <svg
                    className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""
                        }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {
                open && (
                    <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-2 z-50">
                        <Link
                            to="/profile"
                            onClick={() => setOpen(false)}
                            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        >
                            Profile
                        </Link>
                        <Link
                            to="/orders"
                            onClick={() => setOpen(false)}
                            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        >
                            Orders
                        </Link>
                        <Link to="/wishlist" onClick={() => setOpen(false)}
                            className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                            Wishlist
                        </Link>

                        <hr className="my-2 border-slate-200" />

                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                            Logout
                        </button>
                    </div>
                )
            }

        </div>
    )
}

export default AccountDropDown