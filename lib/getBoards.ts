import axios from "axios";

const GetBoards = async (token) => {
    if (!token) return null;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const boards = await axios.get(`https://api.management.parse25proje.link/api/boards`, config)
        .then(response => response.data)
        .then(boards => boards.data)

    return boards;
}

export default GetBoards;