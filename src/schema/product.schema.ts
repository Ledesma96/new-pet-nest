import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsArray } from "class-validator";
import { Document } from "mongoose";
import * as paginate from "mongoose-paginate-v2";

@Schema({
    timestamps: true,
    collection: 'products',
})

export class Product extends Document{
    @Prop({
        unique: true,
        required: true,
        trim: true,
        type: String,
    })
    code: string;

    @Prop({
        required: true,
        trim: true,
        type: String,
    })
    name: string;

    @Prop({
        required: true,
        trim: true,
        type: String,
    })
    description: string;

    @Prop({
        trim: true,
        type: Number,
    })
    price: number;

    @Prop({
        trim: true,
        type: Number,
    })
    stock: number;

    @IsArray()
    @Prop({
        type: [String], // Especifica que `images` es un array de strings
    })
    images: [];

    @Prop({
        required: true,
        trim: true,
        type: String,
    })
    category: string;

    @Prop({
        required: true,
        trim: true,
        type: String,
    })
    sub_category: String;

    @Prop({
        required: true,
        trim: true,
        type: String,
    })
    brand: string;
}

const schema = SchemaFactory.createForClass(Product)
schema.plugin(paginate)
export const ProductSchema = schema