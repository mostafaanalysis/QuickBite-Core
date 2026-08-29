import { db } from "../../../common/knex/knex";
import { Product } from "../entity/product.entity";

const PRODUCT_COLUMNS = ['id', 'name', 'description', 'image_url', 'restaurant_id', 'category_id', 'created_at', 'updated_at', 'deleted_at'];
function toEntity(row: any): Product {
    return new Product({
        id: row.id,
        name: row.name,
        description: row.description,
        imageUrl: row.image_url,
        restaurantId: row.restaurant_id,
        categoryId: row.category_id,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        deletedAt: row.deleted_at,
    });
}
export async function createProduct(data: Partial<Product>): Promise<Product> {
    const [row] = await db("products").insert({
        name: data.name,
        description: data.description,
        image_url: data.imageUrl,
        restaurant_id: data.restaurantId,
        category_id: data.categoryId,
    }).returning(PRODUCT_COLUMNS);
    return toEntity(row);
    
}
export async function updateProduct(id: number, data: Record<string, any>): Promise<Product> {
    const [row] = await db("products").where("id", id).update({
        name: data.name,
        description: data.description,
        image_url: data.imageUrl,
        category_id: data.categoryId,
        updated_at: new Date(),
    }).returning(PRODUCT_COLUMNS);
    return toEntity(row);
}

export async function findProductsByBranch(branchId: number) {
    const rows = await db("products")
        .join(
            "product_branch_details",
            "products.id",
            "product_branch_details.product_id"
        )
        .leftJoin(
            "product_categories",
            "products.category_id",
            "product_categories.id"
        )
        .select(
            "products.id",
            "products.name",
            "products.description",
            "products.image_url as imageUrl",
            "products.restaurant_id as restaurantId",
            "products.category_id as categoryId",
            "product_categories.name as categoryName",
            "product_branch_details.price",
            "product_branch_details.stock",
            "product_branch_details.is_available as isAvailable"
        )
        .where("product_branch_details.branch_id", branchId)
        .whereNull("products.deleted_at");

    return rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        imageUrl: row.image_url,
        restaurantId: row.restaurant_id,
        categoryId: row.category_id,
        categoryName: row.category_name,
        price: row.price,
        stock: row.stock,
        isAvailable: row.is_available,
    }));
}

export async function findProductsByRestaurant(restaurantId: number) {
    const rows = await db("products as p")
        .where("p.restaurant_id", restaurantId)
        .whereNull("p.deleted_at")
        .select(
            "p.id",
            "p.name",
            "p.description",
            "p.image_url",
            "p.restaurant_id",
            "p.category_id",
            "p.created_at",
            "p.updated_at",
        );

    return rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        imageUrl: row.image_url,
        restaurantId: row.restaurant_id,
        categoryId: row.category_id,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    }));
}

export async function findProductById(id: number): Promise<Product | undefined> {
    const row = await db("products")
        .select(PRODUCT_COLUMNS)
        .where("id", id)
        .whereNull("deleted_at")
        .first();
    return row ? toEntity(row) : undefined;
}
