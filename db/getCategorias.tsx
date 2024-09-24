import { doc, getDoc } from "firebase/firestore";

const getCategorias = async (db: any) => {
    if (db) {
        const docRef = doc(db, 'Inventario', 'Categorias');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            const categoriasArray: any[] = data.categorias || [];
            return categoriasArray;
        } else {
            console.log("No such document!");
        }
    }
    return [];
};

export default getCategorias;