import { collection, query, getDocs } from 'firebase/firestore';

export const fetchProductos = async (db, selectedCategoria) => {
    try {
        if (db) {
            const q = query(collection(db, 'Inventario/Categorias/' + selectedCategoria));
            const snapshot = await getDocs(q);
            const productosData = snapshot.docs.map(doc => ({
                label: doc.data().nombre,
                value: doc.id
            }));
            return productosData;
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    }
    return [];
};