import { IsArray, IsString, IsNumber } from 'class-validator';

export class ProductEntity {
    _id;

    @IsString()
    code: string;

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsNumber()
    stock: number;

    @IsArray()
    images: [];

    @IsString()
    category: string;

    @IsString()
    sub_category: String;

    @IsString()
    brand: string;

}
