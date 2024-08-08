import axios from "axios"

const CreateNewTask = async (data, token) => {
    if (!token) return null;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const respon = await axios.post(`https://api.management.parse25proje.link/api/tasks`, data, config)
    .then(response => response.data)
    .then(boards => boards.data)

    return respon;

}

export default CreateNewTask;