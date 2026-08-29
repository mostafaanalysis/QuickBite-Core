export class Category {
    id: number;
    restaurantId: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: Partial<Category>) {
        this.id = data.id!;
        this.restaurantId = data.restaurantId!;
        this.name = data.name!;
        this.createdAt = data.createdAt ?? new Date();
        this.updatedAt = data.updatedAt ?? new Date();
    }
}

export class Product {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    restaurantId: number;
    categoryId: number | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    constructor(data: Partial<Product>) {
        this.id = data.id!;
        this.name = data.name!;
        this.description = data.description ?? "";
        this.imageUrl = data.imageUrl ?? "";
        this.restaurantId = data.restaurantId!;
        this.categoryId = data.categoryId ?? null;
        this.createdAt = data.createdAt ?? new Date();
        this.updatedAt = data.updatedAt ?? new Date();
        this.deletedAt = data.deletedAt ?? null;
    }
}

export class ProductBranchDetails {
    id: number;
    branchId: number;
    productId: number;
    price: number;
    stock: number;
    isAvailable: boolean;

    constructor(data: Partial<ProductBranchDetails>) {
        this.id = data.id!;
        this.branchId = data.branchId!;
        this.productId = data.productId!;
        this.price = data.price ?? 0;
        this.stock = data.stock ?? 0;
        this.isAvailable = data.isAvailable ?? false;
    }
}