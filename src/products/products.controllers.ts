import { Body, Controller, Get, Param, Patch, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { ProductDTO, UpdateProdcutDTO } from 'src/DTO/product.dto';
import { ProductEntity } from './products.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/v1/products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    async getProducts(
        @Query('limit') limit: number,
        @Query('category') category: string,
        @Query('brand') brand: string,
        @Query('sub_category') sub_category: string,
        @Query('page') page: number,
        @Query('sort') sort: string,
    ) : Promise<{success: boolean, message: string, products: any}> {
            try {
                const products = await this.productsService.getProducts(
                    limit,
                    category,
                    brand,
                    page,
                    sort,
                    sub_category)
                return  products
            } catch (error) {
                
            }
        }

    @Get('brands')
    async getBrand(
        @Query('category') category: string,
    ) : Promise<{success: boolean, message: string, data?: { brands: string[], subCategories: string[] }}> {
        try {
            const data = await this.productsService.getBrandAndSubCategory(category)
            return data
        } catch (error) {
            return {success: false, message: error.message}
        }
    }

    @Get('filter/:id')
    async getProductById(
        @Param('id') id: string
    ) : Promise<{success: boolean, message: string, product?: ProductEntity}>
    {
        try {
            const product = await this.productsService.getProductById(id)
            if(!product) {
                return {success: false, message: 'Product not found'}
            }
            return product
        } catch (error) {
            return {success: false, message: error.message}
        }
    }

    @Get('search')
    async searchProduct(
        @Query('search') prefix: string
    ) : Promise<{success: boolean, message: string, products?: ProductEntity[]}> {
        try {
            if(prefix != ''){
                const products = await this.productsService.searchProduct(prefix)
                return products
            }
            return 
        } catch (error) {
            return {success: false, message: error.message}
        }
    }

    @UseInterceptors(
        FilesInterceptor(
            'file' , undefined, 
            {
                storage: diskStorage({
                    destination: './upload/images/products',
                    filename: function(req, file, cb) {
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                        const originalName = file.originalname.replace(/\.[^/.]+$/, '');
                        cb(null, `${originalName}-${uniqueSuffix}${extname(file.originalname)}`)
                    }
                })
            }
        )
    )
    @Post('create-product')
    async createProduct(
      @Body() product: any,
      @UploadedFiles() files: Express.Multer.File[]
    ) : Promise<{success: boolean, message: string}> {
        try {
            const result = await this.productsService.createProduct(product, files);
            return result
        } catch (error) {
            return {success: false, message: error.message}
        }
    }

    @UseInterceptors(
        FilesInterceptor(
            'file' , undefined, 
            {
                storage: diskStorage({
                    destination: './upload/images/products',
                    filename: function(req, file, cb) {
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                        const originalName = file.originalname.replace(/\.[^/.]+$/, '');
                        cb(null, `${originalName}-${uniqueSuffix}${extname(file.originalname)}`)
                    }
                })
            }
        )
    )
    @Patch('upload-product/:id')
    async upadateProduct(
        @Param('id') id : string,
        @Body() data: UpdateProdcutDTO,
        @UploadedFiles() files?: Express.Multer.File[]
    ) : Promise<{success: boolean, message: string}> {
        try {
            const result = await this.productsService.updateProduct(id, data, files);
            return result
        } catch (error) {
            return {success: false, message: error.message}
        }
    }

}
