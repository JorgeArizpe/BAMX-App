import { collection, getDocs } from 'firebase/firestore';

export async function getProductos(setProductos, db, title) {
    if (db) {
        const querySnapshot = await getDocs(collection(db, `/Inventario/Categorias/${title}`));
        const productos = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setProductos(productos);
    }
};