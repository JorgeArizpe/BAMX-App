import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export const uploadImage = async (image, nombre, storage) => {
    
    if (!image) return null;
    
    const response = await fetch(image);
    const blob = await response.blob();
    const filename = `Productos/${nombre}.png`;
    const storageRef = ref(storage, filename);

    const uploadTask = uploadBytesResumable(storageRef, blob);

    return new Promise((resolve, reject) => {
        uploadTask.on(
            'state_changed',
            (error) => {
                reject(error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(downloadURL);
            }
        );
    });
};