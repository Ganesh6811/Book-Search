import axios from "axios";

export const getLatestBooks = async(req, res)=>{
    try{
        const getBooks = await axios.get("https://www.googleapis.com/books/v1/volumes?q=technology&orderBy=relevance&maxResults=20");
        if(!getBooks){
            return res.status(500).json({message:"There are no latest books"});
        }

        res.status(200).json(getBooks.data);
    }
    catch(err){
        console.log("Error in getLatestBoks controller:", err);
        res.status(500).json({message:"Internal Server Error"});
    }
}


export const getBookById = async (req, res) => {
    const bookId = req.params.id;

    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
        const bookData = response.data;

        res.status(200).json({ item: bookData });
    } catch (err) {
        console.log("Error in getBookById:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const searchingBook = async (req, res) => {
    const { search, category } = req.body;

    try {
        const query = `${search ? `${encodeURIComponent(search)}` : ""}${category ? `+subject:${encodeURIComponent(category)}` : ""}`;

        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`);

        res.status(200).json(response.data); 
    } catch (err) {
        console.log("Error in the searching Book controller:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};