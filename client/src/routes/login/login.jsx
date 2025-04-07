import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_BASE_API;

const Login = () => {
    const [tog, setTog] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const verifyToken = async () => {
        const response = await fetch(`${API}/login/auth`, {
            credentials: "include"
        })
        const data = await response.json();

        if (response.status === 200) {
            navigate("/", { state: data.user });
        }
    }

    const handleToggle = () => {
        setIsAnimating(true);
        if (tog) {
            setTimeout(() => {
                setTog(false);
                setIsAnimating(false);
            }, 500);
        } else {
            setTog(true);
            setTimeout(() => {
                setIsAnimating(false);
            }, 500);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch(`${API}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email: email, password: password })
            });
            if (response.status === 200) {
                await verifyToken();
            } else if (response.status === 401) {
                console.log(123);
                setError("Email hoặc mật khẩu không đúng!");
            }
        } catch (error) {
            setError("Failed to connect to the server");
        }
    };

    useEffect(() => {
        verifyToken()
    }, []);

    return (
        <div className="cover">
            <div className="main">
                <input type="checkbox" id="chk" aria-hidden="true" className="search-input" />
                <div className="signup relative flex flex-col items-center justify-center rounded-2xl shadow-lg p-8 max-w-sm text-center">
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    {tog && (
                        <div className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'} flex items-center justify-center min-h-screen`}>
                            <div className="relative bg-transparent rounded-2xl max-w-sm text-center">
                                <h2 className="text-2xl font-bold text-white mb-6">Library Management</h2>
                                <p className="text-white mb-6">Only new employees can access the system. Contact admin for account.</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="login">
                    <div>
                        <form onSubmit={handleSubmit} className="mt-[90px] flex flex-col items-center justify-center">
                            <label htmlFor="chk" aria-hidden="true" onClick={handleToggle}>Sign In</label>
                            <input className="search-input p-4" type="email" name="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input className="search-input p-4" type="password" name="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            {!!error && <p className="text-red-500">{error}</p>}
                            <button className="sumbmit btn-signin" type="submit">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
