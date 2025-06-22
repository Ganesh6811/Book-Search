import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import baseUrl from "../config.jsx";
import Header from "../components/Header.component.jsx";

const DisplayBook = () => {
  const { id } = useParams();
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${baseUrl}/books/getBookById/${id}`, {
        withCredentials: true,
      });
      setBookData(data.item);
      console.log("data is :", data);
    };
    getData();
  }, [id]);

  if (!bookData) {
    return <div className="text-center mt-10">Loading book details...</div>;
  }

  const volume = bookData.volumeInfo;
  const sale = bookData.saleInfo;

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      <div className="flex justify-between">
        {/* Left Side */}
        <div className="w-[40vw] h-[140vh]  bg-black text-white p-10 flex flex-col ">
          <h1 className="text-4xl font-bold mb-4">{volume?.title}</h1>
          <p className="text-xl font-medium text-[#FFDD7E]">
            {volume?.authors?.join(", ") || "Unknown Author"}
          </p>
        </div>

        {/* Book Image */}
        <div className="z-10 relative top-70 right-50">
          <img
            src={
              volume?.imageLinks?.thumbnail ||
              "https://via.placeholder.com/200x300?text=No+Image"
            }
            alt={volume?.title}
            className="rounded-lg shadow-lg max-h-[500px] h-[500px] w-[400px]"
          />
        </div>

        {/* Right Side Content */}
        <div className="w-[50vw] p-10 flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <img src="/pictures/BookIcon.svg" className="w-6 h-6" />
            <p className="text-2xl font-semibold">
              Category: {volume?.categories?.[0] || "N/A"}
            </p>
          </div>

          <p className="text-lg text-gray-700">
            {volume?.subtitle || "No subtitle available"}
          </p>

          <div className="flex items-center gap-3">
            <img src="/pictures/WalletIcon.svg" className="w-6 h-6" />
            <p className="text-2xl text-[#CA891D] font-semibold">
              Rs. {sale?.retailPrice?.amount || "N/A"}
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href={sale?.buyLink || "#"}
              target="_blank"
              rel="noreferrer"
              className="bg-[#FFD700] hover:bg-[#e6c200] text-black font-semibold px-6 py-2 rounded-full shadow transition duration-300"
            >
              Secure the copy
            </a>
          
          </div>

          <div>
            <p className="text-3xl font-bold mb-2">About this book</p>
            <p className="text-gray-700 leading-relaxed">
              {volume?.description ||
                "No description available for this book."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayBook;
