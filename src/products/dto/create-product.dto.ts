import { IsArray, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";
import { IsNull } from "typeorm";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1, { message: 'Title must be at least 1 character long' })
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    price?: number;

    @IsString()
    @IsOptional()
    slug?: string;

    @IsInt()
    @IsPositive({ message: 'Stock must be a positive number' })
    @IsOptional()
    stock?: number;

    @IsString({ each: true })
    @IsArray({ message: 'Sizes must be an array of strings' })
    sizes: string[];

    @IsIn(['men', 'women', 'kid', 'unisex'], { message: 'Gender must be one of: men, women, kid, unisex' })
    gender: string;

    @IsString({ each: true })
    @IsArray({ message: 'Tags must be an array of strings' })
    @IsOptional()
    tags?: string[];

    @IsString({ each: true })
    @IsArray({ message: 'Images must be an array of strings' })
    @IsOptional()
    images?: string[];
}
