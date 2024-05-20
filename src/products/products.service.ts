import { Injectable } from '@nestjs/common';
import { ProductEntity } from './products.entity';
import { Product } from 'src/schema/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { ProductDTO, UpdateProdcutDTO } from 'src/DTO/product.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: PaginateModel<Product>){}

    async getProducts(
        limit: number,
        category: string,
        brand: string,
        page: number,
        sort: string,
        sub_category: string
    ) : Promise<{success: boolean, message: string, products: any}> {
        try {
            const filterCategory = category ? {category: category}: {}
            const filterBrand = brand && brand.length > 0 ? { brand: { $in: brand.split(',')} } : {};
            const filterSubCategory = sub_category && sub_category.length > 0 ? { sub_category: { $in: sub_category.split(',')} } : {};
           
            const filters = {
                ...filterCategory,
                ...filterBrand,
                ...filterSubCategory,
            }

            const  products = await this.productModel.paginate(filters,{
                limit: limit,
                page: page,
                sort: sort,
                lean: true
            })
            
            return {success: true, message: 'Get Products', products: products}
        } catch (error) {
            
        }
    }

    async getBrandAndSubCategory(category: string): Promise<{success: boolean, message: string, data?: any }>{
        try {
            const products = await this.productModel.find({category: category})
            const uniqueSubCategory = new Set(products.map(product => product.sub_category));

            const uniqueBrands = new Set(products.map(product => product.brand));

            const data = {
                brands: [...uniqueBrands],
                sub_categories: [...uniqueSubCategory]
            }
            return {success: true, message: 'Get Brands and sub categories', data}
        } catch (error) {
            return {success: false, message: "Can't get brands and sub categories"}
        }
    }

    async getProductById(id: string) : Promise<{success: boolean, message: string, product?: ProductEntity}>{
        try {
            const product = await this.productModel.findById(id)
            if (!product) {
                return {success: false, message: 'Product not found'}
            }
            return {success: true, message: 'Get product successfully', product: product}
        } catch (error) {
            return {success: false, message: error.message}
        }
    }

    async createProduct(product: any, files: Express.Multer.File[]) : Promise<{success: boolean, message: string}>{
        try {
            product.images = files.map(file => `/upload/images/products/${file.filename}`)
            console.log(product);
            
            const newProduct = await this.productModel.create(product);
            return {success: true, message: 'Create Product'}
        } catch (error) {
            return {success: false, message: error.message}
        }
    }

    async updateProduct(id: string, data: UpdateProdcutDTO, files?: Express.Multer.File[]) : Promise<{success: boolean, message: string}> {
        try {
            if(files && files.length > 0 ){
                data.images = files.map(file => `/upload/images/${file.filename}`)
            }
            const product = await this.productModel.findByIdAndUpdate(id, data);
            if (!product) {
                return {success: false, message: 'Product not found'};
            }
            return {success: true, message: 'Product updated'}
        } catch (error) {
            return {success: false, message: error.message}
        }
    }
}
