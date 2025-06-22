import Header from "../components/Header.component.jsx";
import baseUrl from "../config.jsx";
import useAuthStore from "../store/Auth.store.jsx";
import axios from 'axios';

const AboutMe = () => {
  const { name, email, logOut } = useAuthStore();

  const handleLogout = async() => {
    logOut();
    try{
        const check = await axios.get(`${baseUrl}/auth/logOut`, {
            withCredentials:true
        });
    }
    catch(err){
        console.log("Error while logging out ", err);
    } 
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />

      <div className="flex flex-col items-center justify-center pt-16 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
          <img
            src="/pictures/UserLogo.svg"
            alt="User Avatar"
            className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-[#CC9600]"
          />

          <h2 className="text-2xl font-bold mb-2 text-[#CC9600]">{name || "Anonymous"}</h2>
          <p className="text-gray-600 mb-4">{email || "No email provided"}</p>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow-md"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
