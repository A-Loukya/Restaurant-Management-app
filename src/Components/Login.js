import Bg from "../Images/BG.svg";
import UserImg from "../Images/user.svg";
import passwordImg from "../Images/password.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const details = { username, password };
        console.log(details);
        if (details.username && details.password) {
            navigate("/dashboard");
        } else {
            console.log("please fill in the details");
        }
    };

    return (
        <div className="relative h-[100vh] w-[100vw] overflow-hidden font-montserrat text-white login">
            <img src={Bg} className="absolute top-0 left-0 w-full h-full object-cover" alt="Background"/>
            <div className="relative flex flex-col items-center justify-center h-full">
                <h1 className="font-bold text-xl sm:text-2xl sm:mb-20 mb-10">POS</h1>
                <form onSubmit={handleSubmit}>
                    <div className="sm:w-[380px] sm:h-[60px] border-2 border-white rounded-md flex items-center mb-5 w-[85vw] h-12 m-auto">
                        <img src={UserImg} className="mx-4 sm:w-7 w-6" alt="User icon"/>
                        <input
                            className="flex-1 bg-transparent outline-none text-white px-2 sm:text-[16px] text-sm"
                            placeholder="USERNAME"
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="sm:w-[380px] sm:h-[60px] border-2 border-white rounded-md flex items-center mb-5 w-[85vw] h-12 m-auto">
                        <img src={passwordImg} className="mx-4" alt="Password icon"/>
                        <input
                            className="flex-1 bg-transparent outline-none text-white px-2 text-sm sm:text-[16px]"
                            placeholder="PASSWORD"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <p className="font-medium sm:text-[16px] mt-1 text-sm fpassword">Forgot Password?</p>
                    <button
                        type="submit"
                        className="sm:w-[380px] sm:h-[60px] bg-white rounded-md text-primary font-semibold text-lg sm:text-xl flex items-center justify-center sm:mt-14 mt-12 w-[85vw] h-12 m-auto"
                    >
                        LOGIN
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
