import { forwardRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { navbarLinks } from "@/constants";
import { useNavigate } from "react-router-dom";

import logoLight from "@/assets/logo-light.svg";
import logoDark from "@/assets/logo-dark.svg";

import { cn } from "@/utils/cn";

import PropTypes from "prop-types";
import { LogOutIcon } from "lucide-react";

const API = import.meta.env.VITE_BASE_API;

export const Sidebar = forwardRef(({ collapsed }, ref) => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    
    const handleLogout = async () => {
        const respone = await fetch(`${API}/logout`, {
            credentials: "include"
        });
        if (respone.ok) {
            navigate("/login")
        }
    };

    useEffect(() => {
        const checkAdmin = async () => {
            const response = await fetch(`${API}/login/auth`, {
                credentials: "include",
            });
            const data = await response.json();
            if (data.user.VaiTro === "Admin") {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        }
        checkAdmin();
    }, []);

    return (
        <aside
            ref={ref}
            className={cn(
                "fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border-r border-slate-300 bg-white [transition:_width_300ms_cubic-bezier(0.4,_0,_0.2,_1),_left_300ms_cubic-bezier(0.4,_0,_0.2,_1),_background-color_150ms_cubic-bezier(0.4,_0,_0.2,_1),_border_150ms_cubic-bezier(0.4,_0,_0.2,_1)] dark:border-slate-700 dark:bg-slate-900",
                collapsed ? "md:w-[70px] md:items-center" : "md:w-[240px]",
                collapsed ? "max-md:-left-full" : "max-md:left-0",
            )}
        >
            <div className="flex gap-x-3 p-3">
                <img
                    src={logoLight}
                    alt="Logoipsum"
                    className="dark:hidden"
                />
                <img
                    src={logoDark}
                    alt="Logoipsum"
                    className="hidden dark:block"
                />
                {!collapsed && <p className="text-lg font-medium text-slate-900 transition-colors dark:text-slate-50">SE Library</p>}
            </div>
            <div className="flex w-full h-full flex-col justify-between gap-y-4 overflow-y-auto overflow-x-hidden p-3 [scrollbar-width:_thin]">
                <div className="flex flex-col items-center justify-around h-1/4">
                    {navbarLinks.map((navbarLink) => {
                        if (isAdmin) return (
                            <nav
                                key={navbarLink.title}
                                className={cn("sidebar-group  my-2", collapsed && "md:items-center ")}
                            >
                                <p className={cn("sidebar-group-title", collapsed && "md:w-[45px] text-center pt-2")}>{navbarLink.title}</p>
                                {navbarLink.links.map((link) => (
                                    <NavLink
                                        key={link.label}
                                        to={link.path}
                                        className={cn("sidebar-item", collapsed && "md:w-[45px]")}
                                    >
                                        <link.icon
                                            size={22}
                                            className="flex-shrink-0"
                                        />
                                        {!collapsed && <p className="whitespace-nowrap">{link.label}</p>}
                                    </NavLink>
                                ))}
                            </nav>
                        )
                        if (!isAdmin && !navbarLink.admin) return (
                                <nav
                                    key={navbarLink.title}
                                    className={cn("sidebar-group my-2", collapsed && "md:items-center")}
                                >
                                    <p className={cn("sidebar-group-title", collapsed && "md:w-[45px] text-center pt-2")}>{navbarLink.title}</p>
                                    {navbarLink.links.map((link) => (
                                        <NavLink
                                            key={link.label}
                                            to={link.path}
                                            className={cn("sidebar-item", collapsed && "md:w-[45px]")}
                                        >
                                            <link.icon
                                                size={22}
                                                className="flex-shrink-0"
                                            />
                                            {!collapsed && <p className="whitespace-nowrap">{link.label}</p>}
                                        </NavLink>
                                    ))}
                                </nav>
                        )
                    }
                    )}
                </div>
                <div className="cursor-pointer" onClick={handleLogout}>
                    <nav className="flex flex-row">
                        <div className={cn("sidebar-item", collapsed && "md:w-[45px]")}>
                            <LogOutIcon />
                            {!collapsed && <p className="whitespace-nowrap">Đăng xuất</p>}
                        </div>
                    </nav>
                </div>
            </div>
        </aside >
    );
});

Sidebar.displayName = "Sidebar";

Sidebar.propTypes = {
    collapsed: PropTypes.bool,
};
