import { Link, useNavigate } from 'react-router-dom'; 
const Navbar = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user")) || null;  
    console.log("User data from localStorage:", user); 

    

    return (
        <div>
            <div className="nav-bar">
                <Link to="/">
                    <div><p className="hospo-logo">hospo</p></div>
                </Link>

                <div className="nav-bar-1">
                    <Link to="/doctors" >
                        <p className="nav-btn">Doctors</p>
                    </Link>
                    <Link to="/error">
                        <p className="nav-btn">About</p>
                    </Link>
                    <Link to="/error">
                        <p className="nav-btn">Our&nbsp;services</p>
                    </Link>
                    <Link to="/delivary" >
                        <p className="nav-btn">Delivery</p>
                    </Link>
                    <Link to="/track" >
                        <p className="nav-btn">Track</p>
                    </Link>
                    <Link to="/error">
                        <p className="nav-btn">Contact</p>
                    </Link>
                    {/* <Link to="/reports">
                    <p>Report.Smile</p>
                    </Link> */}

                </div>

              
            </div>
        </div>
    );
};

export default Navbar;