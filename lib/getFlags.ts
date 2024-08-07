import axios from "axios";

const GetFlags = async (token) => {
    if (!token) return null;

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const flags = await axios.get(`https://api.management.parse25proje.link/api/commons/flags`, config)
        .then(response => response.data)
        .then(flags => flags.data)

    return flags;
}

export default GetFlags;