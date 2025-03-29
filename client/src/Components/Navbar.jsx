import { Link, useNavigate } from 'react-router-dom'; 
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const Navbar = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user")) || null;  
    console.log("User data from localStorage:", user); 

    const isAuthenticated = user; 

    const handleLogout = () => {
        localStorage.removeItem("user");
        toast.success("Logged out successfully!", { position: "top-right" });
        navigate("/auth");
    };

    const handleProtectedClick = (e) => {
        if (!isAuthenticated) {
            e.preventDefault();
            toast.warning("Please log in to access this!", { position: "top-right" });
        }
    };

    return (
        <div>
            <div className="nav-bar">
                <Link to="/">
                    <div><p className="hospo-logo">hospo</p></div>
                </Link>

                <div className="nav-bar-1">
                    <Link to="/doctors" onClick={handleProtectedClick}>
                        <p className="nav-btn">Doctors</p>
                    </Link>
                    <Link to="/error">
                        <p className="nav-btn">About</p>
                    </Link>
                    <Link to="/error">
                        <p className="nav-btn">Our&nbsp;services</p>
                    </Link>
                    <Link to="/delivary" onClick={handleProtectedClick}>
                        <p className="nav-btn">Delivery</p>
                    </Link>
                    <Link to="/track" onClick={handleProtectedClick}>
                        <p className="nav-btn">Track</p>
                    </Link>
                    <Link to="/error">
                        <p className="nav-btn">Contact</p>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <div className="flex items-center gap-2">
                                <span className="text-black font-semibold">
                                    {user.username || "User"}
                                </span>
                                <FaUserCircle className="text-2xl text-gray-300" />
                            </div>
                            <button 
                                className="logout-btn bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/auth">
                            <button className="border rounded-md border-black flex p-2 items-center gap-2">
                                Login/Register
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;