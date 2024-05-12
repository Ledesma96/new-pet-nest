
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength, MaxLength } from "class-validator";

export class ProductDTO {
    @IsString()
    @IsNotEmpty()
    code: string;
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsOptional()
    price: number;

    @IsNumber()
    @IsOptional()
    stock: number;

    @IsOptional()
    @IsArray()
    @MinLength(1, { message: 'Debe haber al menos un elemento en la matriz' })
    @MaxLength(5, { message: 'No se permiten más de 5 elementos en la matriz' })
    images: any[];

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsString()
    @IsNotEmpty()
    sub_category: String;

    @IsString()
    @IsNotEmpty()
    brand: string;

    constructor(product: Partial<ProductDTO>) {
        this.name = product.name;
        this.price = product.price;
        this.description = product.description;
        this.category = product.category;
        this.images = product.images;
        this.brand = product.brand;
    }
}

export class UpdateProdcutDTO {
    @IsString()
    @IsOptional()
    code: string;
    
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsOptional()
    price: number;

    @IsNumber()
    @IsOptional()
    stock: number;

    @IsOptional()
    @IsArray()
    @MinLength(1, { message: 'Debe haber al menos un elemento en la matriz' })
    @MaxLength(5, { message: 'No se permiten más de 5 elementos en la matriz' })
    images: any[];
}