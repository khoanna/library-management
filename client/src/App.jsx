import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
import { useState, useEffect } from "react";
import Layout from "@/routes/layout";
import DashboardPage from "./routes/dashboard/page";
import Login from "./routes/login/login";
import DocGia from "./routes/docgia/DocGia";
import MuonSach from "./routes/muonsach/MuonSach";
import TienPhat from "./routes/tienphat/TienPhat";
import Sach from "./routes/sach/Sach";
import TacGia from "./routes/tacgia/TacGia";
import NhanVien from "./routes/nhanvien/NhanVien";

const API = import.meta.env.VITE_BASE_API;

function ProtectedRoute({ children }) {
    const navigate = useNavigate();  

    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${API}/login/auth`, {
                    credentials: "include",
                });

                const data = await response.json();
                if (response.ok) {
                    setUser(data.user);
                } else {
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error verifying token:", error);
                navigate("/login");
            }
        };
        checkAuth();
    }, [navigate]);

    if (user === null) {
        return <Login />;
    }

    return children;
}

function App() {

    const router = createBrowserRouter([
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/",
            element: <ProtectedRoute><Layout /></ProtectedRoute>,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "docgia",
                    element: <DocGia />,
                },
                {
                    path: "muonsach",
                    element: <MuonSach />,
                },
                {
                    path: "phieuphat",
                    element: <TienPhat />,
                },
                {
                    path: "nhanvien",
                    element: <NhanVien />,
                },
                {
                    path: "sach",
                    element: <Sach />,
                },
                {
                    path: "tacgia",
                    element: <TacGia />,
                },
                {
                    path: "settings",
                    element: <h1 className="title">Settings</h1>,
                },
            ],
        }
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
