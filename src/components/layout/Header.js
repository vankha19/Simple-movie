import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
    const [scrollY, setScrollY] = useState(0);
    const headerRef = useRef();
    console.log(headerRef);

    return (
        <header
            ref={headerRef}
            className="sticky header cursor-pointer header flex items-center justify-between p-5  text-white  gap-x-5"
        >
            <NavLink to="/">
                <img
                    src="https://xemphim.club/static/skin/logo-full.png"
                    className="w-[112px] h-[28px]"
                    alt=""
                />
            </NavLink>

            <div className="flex gap-5 text-lg">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "text-primary" : ""
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="movies"
                    className={({ isActive }) =>
                        isActive ? "text-primary" : ""
                    }
                >
                    Movies
                </NavLink>
            </div>
            <button className="bg-primary px-6 py-2 rounded-lg"> Login</button>
        </header>
    );
};

export default Header;
