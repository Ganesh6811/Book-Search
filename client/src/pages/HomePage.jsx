import { useState } from "react";
import Header from "../components/Header.component.jsx";
import axios from "axios";
import baseUrl from "../config.jsx";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
    const [searchData, setSearchData] = useState("");
    const [latestBooks, setLatestBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const getBooks = await axios.get(`${baseUrl}/books/getLatestBooks`, {
                withCredentials: true
            });

            setLatestBooks(getBooks.data.items);
            console.log("books are", getBooks.data.items);
        }
        getData();
    }, [])

    const clickedSearch = async () => {
        navigate(`/books/${searchData}`);
        setSearchData("");
    }
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const container = scrollRef.current;
        if (direction === "left") {
            container.scrollBy({ left: -300, behavior: "smooth" });
        } else {
            container.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    const clickedBook = (id)=>{
        navigate(`/displayPage/${id}`);
    }


    return (<div>
        <div>
            <Header />
        </div>

        <div className="bg-[url('/pictures/BookImage.svg')] bg-cover bg-center bg-no-repeat w-screen h-[90vh]">

            <div className="flex flex-col gap-7 justify-center items-center pt-10">
                <p className="text-5xl text-[#FF7700] font-semibold">The Book Lover's Dreamland Awaits</p>
                <p className="text-white text-2xl w-[60%] text-center">Welcome to the ultimate book lover's paradise! Search for your favirate book and enjoy it.
                    This is the vast store that you can search most of the books
                </p>

                <div className="flex items-center border-2 border-yellow-600 rounded-2xl overflow-hidden w-fit bg-black/60 py-3">
                    <input type="text" placeholder="Search a Book" onChange={(e) => setSearchData(e.target.value)} className="px-4 py-2 bg-transparent text-white placeholder:text-slate-400 focus:outline-none w-64" />
                    <button onClick={clickedSearch} className="px-6 py-2 bg-[#4b3200] text-white font-medium hover:bg-[#614100] mr-3 transition rounded-xl">
                        Search
                    </button>
                </div>
            </div>
        </div>


        <div className="flex flex-col pt-30 gap-20">
            <p className="text-5xl text-center font-bold">Our Best Picks</p>
            <div>
                <div className="relative p-6 pb-30 px-20">

                    {/* Scroll Buttons */}
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2  text-3xl font-bold rounded-full shadow hover:bg-gray-200 w-10 h-10 flex items-center justify-center z-10"
                    >
                        &#8592;
                    </button>

                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2  text-3xl font-bold rounded-full shadow hover:bg-gray-200 w-10 h-10 flex items-center justify-center z-10"
                    >
                        &#8594;
                    </button>

                    {/* Scrollable Book List */}
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto gap-10 scrollbar-hide scroll-smooth px-2"
                    >
                        {latestBooks.length === 0 ? (
                            <p className="text-gray-600">No books available</p>
                        ) : (
                            
                            latestBooks.map((book, index) => {
                                const volume = book.volumeInfo;
                                const title = volume.title;
                                const author = volume.authors?.[0] || "Unknown Author";
                                const image =
                                    volume.imageLinks?.thumbnail || "https://via.placeholder.com/150";

                                return (
                                    <div
                                        key={index}
                                        onClick={()=>clickedBook(book.id)}
                                        className="relative bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 w-[180px] flex-shrink-0"
                                    >
                                       

                                        <img
                                            src={image}
                                            alt={title}
                                            className="w-full h-[180px] object-cover rounded-t-lg"
                                        />

                                        <div className="p-3">
                                            <h3 className="text-sm font-bold text-gray-800">{title}</h3>
                                            <p className="text-xs text-gray-600 mt-1">{author}</p>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

            </div>
        </div>



        <div className="bg-black flex gap-15 py-20 px-10 pl-40">
            <img src="/pictures/BottomBookImage.svg"/>
            <div className="flex flex-col gap-5 justify-center ">
                <p className="text-4xl text-white">Your favourite <span className="text-[#FF7700]">Reads Are Here</span></p>
                <p className="text-white text-xl w-[60%]">Read your favourite book online and enjoy it.Divive into our collection
                    and find special books and make things better to enjoy.
                </p>

                <div className="flex gap-8">
                    <div className="flex flex-col gap-5">
                         <p className="text-4xl text-[#FF7700]">800+</p>
                         <p className="text-[#FF7700]">Book Listing</p>
                    </div>
                    <div className="flex flex-col gap-5">
                         <p className="text-4xl text-[#FF7700]">1K+</p>
                         <p className="text-[#FF7700]">Registered Users</p>
                    </div>
                    <div className="flex flex-col gap-5">
                         <p className="text-4xl text-[#FF7700]">100+</p>
                         <p className="text-[#FF7700]">Daily Logins</p>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default HomePage;