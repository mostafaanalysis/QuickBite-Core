import { UnAuthorisedError } from "../../../common/auth/errors";
import { youAreUnthoraized } from "../../auth/error";
import { notAuthorized, RestaurantNotFoundError } from "../../restaurants/errors";
import { findRestaurantById } from "../../restaurants/repo/restaurants.repo";
import { system_role_ent } from "../../user/enums";
import { ProductNotFoundError } from "../error";
import { CreateProductDTO, UpdateProductDTO } from "../product.dto";
import { createCategory, findCategoriesByRestaurant, findCategoryByName } from "../repo/category.repo";
import { updateBranchDetails } from "../repo/prd.branch.details";
import { createProduct, findProductById, findProductsByBranch, findProductsByRestaurant, updateProduct } from "../repo/product.repo";

export class ProductService {
    create = async (restaurantId: number, userId: number, userRole: system_role_ent, data: CreateProductDTO) => {
        const restaurant = await findRestaurantById(restaurantId);
        if (!restaurant) throw RestaurantNotFoundError;
        if (userRole !== system_role_ent.SYSTEM_ADMIN && Number(restaurant.ownerId) !== Number(userId)) {
            throw youAreUnthoraized;
        }
    
        let categoryId: number | null = null;
        if (data.categoryName) {
            let category = await findCategoryByName(restaurantId, data.categoryName);
            if (!category) {
                category = await createCategory(restaurantId, data.categoryName);
            }
            categoryId = category.id;
        }

        return await createProduct({
            name: data.name,
            description: data.description,
            imageUrl: data.imageUrl,
            restaurantId,
            categoryId,
        });
    }

    update = async (productId: number, userId: number, userRole: system_role_ent, data: UpdateProductDTO, branchId?: number) => {
        const product = await findProductById(productId);
        if (!product) {
            throw ProductNotFoundError;
        }

        const restaurant = await findRestaurantById(product.restaurantId);
        if (!restaurant) throw RestaurantNotFoundError;
        if (userRole !== system_role_ent.SYSTEM_ADMIN && Number(restaurant.ownerId) !== Number(userId)) {
            throw UnAuthorisedError;
        }

        let categoryId: number | undefined = undefined;
        if (data.categoryName) {
            let category = await findCategoryByName(product.restaurantId, data.categoryName);
            if (!category) {
                category = await createCategory(product.restaurantId, data.categoryName);
            }
            categoryId = category.id;
        }

        const updatedProduct = await updateProduct(productId, {
            name: data.name,
            description: data.description,
            imageUrl: data.imageUrl,
            categoryId,
        });

        let branchDetails;
        if (branchId && (data.price !== undefined || data.stock !== undefined || data.isAvailable !== undefined)) {
            branchDetails = await updateBranchDetails(branchId, productId, {
                price: data.price,
                stock: data.stock,
                isAvailable: data.isAvailable,
            });
        }

        return {product: updatedProduct, branchDetails};
    }

findCategories = async (restaurantId: number) => {

    return await findCategoriesByRestaurant(restaurantId);

};

findProductsByBranchService =async (branchId: number)=>{
    return await findProductsByBranch(branchId);
}

findByRestaurant = async (restaurantId: number,userId: number,role: string)=> {

    const restaurant = await findRestaurantById(restaurantId);

    if (!restaurant) {
        throw RestaurantNotFoundError;
    }

    const isOwner = Number(restaurant.ownerId) === userId;

    const isAdmin = role === "system_admin";

    if (!isOwner && !isAdmin) {
        throw notAuthorized;
    }

    const rows = await findProductsByRestaurant(restaurantId);

    return rows;
}
findById = async (id: number) => {
        const product = await findProductById(id);
        if (!product) {
            throw ProductNotFoundError;
        }
        return product;
    }

}

export const productService = new ProductService();