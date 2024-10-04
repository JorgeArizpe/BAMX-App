import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export const uploadImage = async (image, nombre, storage) => {
    if (!image) return null;
    
    const response = await fetch(image);
    const blob = await response.blob();
    const extension = image.split('.').pop();
    const filename = `Productos/${nombre}.${extension}`;
    const storageRef = ref(storage, filename);

    const uploadTask = uploadBytesResumable(storageRef, blob);

    return new Promise((resolve, reject) => {
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Optional: You can monitor upload progress here if needed
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                // Error handling
                console.error("Upload failed", error);
                reject(error);
            },
            async () => {
                // When the upload completes successfully
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(downloadURL);
                } catch (error) {
                    console.error("Failed to get download URL", error);
                    reject(error);
                }
            }
        );
    });
};
