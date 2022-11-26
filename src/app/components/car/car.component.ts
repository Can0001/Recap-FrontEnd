import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carDetailDtos: CarDetailDto[]=[];
  carImage: CarImage[]=[];
  colors:Color[]=[];
  colorFilter:number=0;
  brands:Brand[] = [];
  brandFilter:number=0;
  carDetailFilter:string=""
  filterText="";
  dataLoaded = false;
  currentCar:Car;

  imageUrl:string="https://localhost:44344/Uploads/images/"

  constructor(
    private carService: CarService,
    private activatedRoute:ActivatedRoute,
    private colorService:ColorService,
    private brandService:BrandService,
    private cartService:CartService,
    private toastrService:ToastrService
    ) {}

  ngOnInit(): void {
      this.activatedRoute.params.subscribe(params=>{
        this.getAllBrands();
        this.getAllColors();
  
        if(params["colorId"]&&params["brandId"]){
          
          this.getCarsDetailByBrandAndColorId(params["colorId"],params["brandId"])
        
        }else if(params["brandId"]){
          this.getCarsByBrand(params["brandId"])
        
        }else if(params["colorId"]){
          this.getCarsByColor(params["colorId"])
        
        }else{
          this.getCars();
        }
  
      })
    }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }


  getCarsByBrand(brandsId:number) {
    this.carService.getCarsByBrand(brandsId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId:number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  setCurrentCar(car:Car){
    // this.currentCar=car;
    console.log(car.carsId)
  }


  getCurrentCarClass(car: Car) {
    if (car == this.currentCar) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }

  getAllCarClass(){
    if(!this.currentCar){
      return 'list-group-item';
    }
    else{
      return 'list-group-item active';
    }
  }
  getCarDetailsByCarId(carid:number) {
    this.carService.getCarDetailsByCarId(carid).subscribe(response=>{
      this.carDetailDtos=response.data
     
    })
  }

  getSelectedColor(colorId: number){
    if(this.colorFilter==colorId) return true;
    else return false; 
  }
  getSelectedBrand(brandId: number){
    if(this.brandFilter==brandId) return true;
    else return false; 
  }
 
  getAllColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      console.log(this.colors);
    });
  }

  getAllBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      console.log(this.brands);
    });
  }
  
  addToCart(cars:Car){
    this.toastrService.success("Sepete Eklendi",cars.description)
  }

  getCarsDetailByBrandAndColorId(brandId:number, colorId:number) {
    this.carService.getCarsDetailByBrandAndColorId(colorId, brandId).subscribe(response=>{
      console.log(response)
      this.carDetailDtos=response.data;
      this.dataLoaded= true;     
    })
  }


}