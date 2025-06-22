import useAuthStore from "../store/Auth.store.jsx";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const { name } = useAuthStore();

    const clickedHome = () => {
        navigate("/");
    }

    const clickedProfile = () =>{
        navigate("/aboutMe");
    }

    const clickedBooks = () => {
        navigate("/books/");
    }

    return (<div className="bg-black px-15 py-6">
        <div className="flex justify-between items-center">
            <div className="flex gap-8 items-center">
                <img src="/pictures/LogoPic.svg" />
                <p className="text-[#CC9600] text-3xl font-semibold">Book Store</p>
            </div>

            <div className="flex gap-10 items-center mt-4 px-6">
                <a onClick={clickedHome} className="text-lg font-medium text-white  hover:text-[#CC9600] transition duration-300 cursor-pointer border-b-2 border-transparent  hover:no-underline pb-1">
                    Home
                </a>
                <a onClick={clickedBooks} className="text-lg font-medium text-white hover:text-[#CC9600] transition duration-300 cursor-pointer border-b-2 border-transparent  hover:no-underline pb-1">
                    Books
                </a>
            </div>


            <div className="flex gap-5 items-center" >
                <img src="/pictures/UserLogo.svg" className="hover:cursor-pointer" onClick={()=>clickedProfile()} width={70} height={20} />
                <p className="text-white hover:cursor-pointer" onClick={()=>clickedProfile()}>{name}</p>
            </div>
        </div>
    </div>)
}

export default Header;