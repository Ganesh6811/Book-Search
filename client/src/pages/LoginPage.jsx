import { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../config.jsx";
import axios from "axios";
import useAuthStore from "../store/Auth.store.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { fetchUser } = useAuthStore();

  const clickedSignUp = () => {
    navigate("/signUp");
  };

  const formSubmit = async () => {
    if (!email || !password) {
      setEmail("");
      setPassword("");
    } else {
      try {
        const res = await axios.post(
          `${baseUrl}/auth/login`,
          { email, password },
          { withCredentials: true }
        );

        if (res.status === 204) {
          await fetchUser();
          navigate("/");
        }

        if (res.status === 400) {
          alert("Credentials are wrong...");
        }
      } catch (err) {
        console.log("Login IN failed..");
        setPassword("");
        setEmail("");
      }
    }
  };

  return (
    <div className="bg-black flex justify-center items-center min-h-screen w-full">
      <div
        className="w-full max-w-[420px] p-8 rounded-xl border border-[#2A2A2A] shadow-[0_0_15px_rgba(185,169,247,0.1),0_0_40px_rgba(185,169,247,0.08),0_0_80px_rgba(185,169,247,0.05)]"
        style={{
          background: "linear-gradient(to bottom, #131417, #000000)",
        }}
      >
        <div className="text-center mb-6">
          <h3 className="text-white font-bold text-[28px]">Book Search</h3>
          <p className="text-white text-sm m-0">
            Search your Favourite Book and Enjoy
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); formSubmit(); }}>
          <div className="flex flex-col gap-1">
            <label className="text-white">Email</label>
            <input
              type="text"
              className="bg-[#1f1f1f] text-white rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-[#B9A9F7] placeholder-gray-400"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-white">Password</label>
            <input
              type="password"
              className="bg-[#1f1f1f] text-white rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-[#B9A9F7] placeholder-gray-400"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-[#B9A9F7] text-black font-bold py-2 rounded-full hover:bg-[#a998f0] transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-4 text-white text-sm">
          No account yet?{" "}
          <span
            className="text-[#B9A9F7] cursor-pointer hover:underline"
            onClick={clickedSignUp}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
