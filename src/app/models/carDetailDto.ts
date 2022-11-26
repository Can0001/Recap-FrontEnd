import { CarImage } from "./carImage";

export interface CarDetailDto{
    carsId:number;
    brandsId:number;
    colorId:number;
    description:string;
    colorName:string;
    brandsName:string;
    modelYears:number;
    dailyPrice:number;
    imagePath:CarImage[];
}