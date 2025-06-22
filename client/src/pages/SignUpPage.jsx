import { useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../config.jsx";
import axios from "axios";
import useAuthStore from "../store/Auth.store.jsx";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { fetchUser } = useAuthStore();

  const clickedLogin = async () => {
    navigate("/login");
  };

  const formSubmit = async () => {
    if (!email || !password || !name) {
      setName("");
      setEmail("");
      setPassword("");
    } else {
      try {
        const res = await axios.post(
          `${baseUrl}/auth/signUp`,
          {
            email,
            password,
            name,
          },
          { withCredentials: true }
        );

        if (res.status === 201) {
          await fetchUser();
          navigate("/");
        }
      } catch (err) {
        console.log("SignUp failed");
        setEmail("");
        setPassword("");
        setName("");
      }
    }
  };

  return (
    <div className="bg-black flex justify-center items-center w-screen h-screen">
      <div
        className="p-6 rounded-xl w-full max-w-sm border"
        style={{
          background: "linear-gradient(to bottom, #131417, #000000)",
          borderColor: "#2A2A2A",
          boxShadow:
            "0 0 15px rgba(185, 169, 247, 0.1), 0 0 40px rgba(185, 169, 247, 0.08), 0 0 80px rgba(185, 169, 247, 0.05)",
        }}
      >
        <div className="text-center mb-4">
          <h3 className="text-white font-bold text-[28px]">Book Search</h3>
          <p className="text-white text-sm m-0">
            Search your Favourite Book and Enjoy
          </p>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            formSubmit();
          }}
        >
          <div className="flex flex-col gap-1">
            <label className="text-white">Name</label>
            <input
              type="text"
              className="bg-zinc-900 text-white rounded-full px-4 py-2 outline-none"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-white">Email</label>
            <input
              type="text"
              className="bg-zinc-900 text-white rounded-full px-4 py-2 outline-none"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 mb-2">
            <label className="text-white">Password</label>
            <input
              type="password"
              className="bg-zinc-900 text-white rounded-full px-4 py-2 outline-none"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-[#B9A9F7] text-black font-bold py-2 rounded-full hover:opacity-90 transition"
          >
            Create an Account
          </button>
        </form>

        <p className="text-center mt-3 text-white text-sm">
          Have an account already?{" "}
          <button
            onClick={clickedLogin}
            className="text-[#B9A9F7] underline hover:text-violet-300 transition"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
