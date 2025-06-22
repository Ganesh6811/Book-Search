import { useState, useEffect } from "react";
import Header from "../components/Header.component.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Books = () => {
  const { searchData } = useParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchData) {
      setSearch(searchData);
    }
  }, [searchData]);

  useEffect(() => {
    if (search) {
      fetchBooks();
    }
  }, [search, category]);

  const clickedBook = (id) => {
    navigate(`/displayPage/${id}`);
  };

  const fetchBooks = async () => {
    const query = `${search}${category ? "+subject:" + category : ""}`;
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=12`
      );
      setBooks(response.data.items || []);
    } catch (err) {
      console.error("Error while fetching books:", err);
    }
  };

  const handleSearchClick = () => {
    if (search || category) {
      fetchBooks();
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      <div className="flex flex-col items-center pt-16 px-6">
        <h1 className="text-4xl font-bold text-[#CC9600] mb-8">
          Explore All Books Here
        </h1>

        <div className="flex flex-col md:flex-row gap-4 w-full max-w-3xl justify-center items-center mb-8">
          <input
            type="text"
            placeholder="Search a book"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#CC9600]"
          />
          <input
            type="text"
            placeholder="Enter category (e.g., Fiction)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#CC9600]"
          />
          <button
            onClick={handleSearchClick}
            className="bg-[#28a745] text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Search
          </button>
        </div>

        {books.length === 0 ? (
          <div className="text-gray-500 text-lg italic mt-8">
            No books available...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 w-full max-w-6xl">
            {books.map((book) => {
              const info = book.volumeInfo;
              return (
                <div
                  onClick={() => clickedBook(book.id)}
                  key={book.id}
                  className="bg-white border border-gray-200 shadow-lg rounded-xl p-4 flex flex-col cursor-pointer hover:shadow-xl transition"
                >
                  <img
                    src={
                      info.imageLinks?.thumbnail ||
                      "https://via.placeholder.com/128x200?text=No+Image"
                    }
                    alt={info.title}
                    className="h-64 object-contain rounded mb-4 mx-auto"
                  />
                  <h2 className="text-lg font-bold mb-1">{info.title}</h2>
                  <p className="text-sm text-gray-600 mb-2">
                    {info.authors?.join(", ") || "Unknown Author"}
                  </p>
                  <p className="text-sm text-gray-500 italic mb-2">
                    {info.categories?.[0] || "Uncategorized"}
                  </p>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto bg-[#CC9600] text-white text-center py-2 px-4 rounded hover:bg-yellow-700 transition duration-300"
                  >
                    Preview Book
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
