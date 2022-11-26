import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetail:CarDetailDto[];
  cars: Car[] = [];
  carImagePaths:string[]=[];
  dataLoaded = false;
  carImages:CarImage[]=[]
  state:boolean=false;
  imageUrl = "https://localhost:44344/Uploads/images/"
  constructor(private carDetailService:CarService, private carImageService:CarImageService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getImageByCarId(params["carsId"]);
      this.getCarById(params["carsId"]);
      

      this.getCarDetailsByCarId(params["carsId"]);
    
    })
  }

getCarById(carsId:number){
  this.carDetailService.getById(carsId).subscribe(response => {
     this.cars = response.data;
     this.dataLoaded = true;
   })
}

 getImageByCarId(carsId:number){
   this.carImageService.getByCarId(carsId).subscribe(response => {
     this.carImages = response.data;
     this.dataLoaded = true;
   })
 }
 getCarDetailsByCarId(carsId:number){
   this.carDetailService.getCarDetailsByCarId(carsId).subscribe(response=>{
     this.carDetail=response.data
   })
     }
 getButtonClass(image: CarImage) {
   if ((image === this.carImages[0])) {
     return 'active';
   } else {
     return '';
   }
 }

 getCurrentImageClass(image: CarImage) {
   if (this.carImages[0] == image) {
     return 'carousel-item active';
   } else {
     return 'carousel-item ';
   }
 }

//  setCurrentImageClass(image: CarImage) {
//    this.currentImage = image;
//  }

 getCarImage(carImage:CarImage, carsId: number){
   if (carImage.carsId == 0) {
     let path = this.imageUrl + "/images/default.png"
     return path;

   }
   else{
     let path = this.imageUrl + carImage.imagePath;
     return path;
   }
 }
}
