import { doc, getDoc } from 'firebase/firestore';

export const fetchCategorias = async (db: any) => {
    try {
        if (db) {
            const docRef = doc(db, 'Inventario', 'Categorias');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data().categorias;
                const categoriasFormatted = data.map((categoria: string) => ({
                    label: categoria,
                    value: categoria
                }));
                return categoriasFormatted;
            } else {
                console.log("No categories found!");
            }
        }
    } catch (error) {
        console.error('Error fetching categorias:', error);
    }
    return [];
};