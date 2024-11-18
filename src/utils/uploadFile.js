import { storage } from "../firebase/configFireBase"
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"
const uploadFile = async (file) => {
    const fileName = file.name
    console.log(fileName);

    const storageRef = ref(storage, `images/${fileName}`)

    const res = await uploadBytes(storageRef, file)

    if (res) {
        if (res.metadata.size === file.size) {
            return getDownloadURL(storageRef)
        } else {
            return "Uploading"
        }
    } else {
        return "Error uploading file"
    }
}

export default uploadFile