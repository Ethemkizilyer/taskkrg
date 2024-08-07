import axios from "axios"

const DeleteTask= async (data, token) => {
    if (!token) return null;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    await axios.delete(`https://api.management.parse25proje.link/api/tasks/${data}`, config)
    .then(response => console.log(response))

}

export default DeleteTask;