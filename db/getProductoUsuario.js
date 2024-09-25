import { doc, getDoc } from 'firebase/firestore';

export const getProductoUsuario = async (db, item, setProducto, setUsuario) => {
    if (db && item.producto && item.producto.path) {
        try {
            const docRef = doc(db, item.producto.path);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProducto(docSnap.data());
            } else {
                console.error('No such product document!');
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }

    if (db && item.usuario && item.usuario.path) {
        try {
            const userDocRef = doc(db, item.usuario.path);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                setUsuario(userDocSnap.data());
            } else {
                console.error('No such user document!');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }
};