export const ingredientsService = async () => {
    try {
        const response = await fetch("http://localhost:3000/ingredients")
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};