import { prisma } from "../../utils/prisma.js";




const createCategory = async (payload: any) => {

    const result = await prisma.category.create({
        data: payload
    });

    return result;
};


const getAllCategories = async () => {

    const result = await prisma.category.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });

    return result;
};


const getSingleCategory = async (id: string) => {

    const result = await prisma.category.findUnique({
        where: {
            id
        }
    });

    return result;
};


const updateCategory = async (
    id: string,
    payload: any
) => {

    const result = await prisma.category.update({
        where: {
            id
        },
        data: payload
    });

    return result;
};


const deleteCategory = async (id: string) => {

    const result = await prisma.category.delete({
        where: {
            id
        }
    });

    return result;
};


export const CategoryService = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
};