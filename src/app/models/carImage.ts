import { Car } from "./car";

export interface CarImage{
    carImageId:Number;
    carsId:Number;
    imagePath:String;
    date:Date;
    c:Car[];
}