import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(cars:Car){
    let item=CartItems.find(c=>c.cars.carsId===cars.carsId);
    if(item){
      item.quantity+=1;
    }
    else{
      let carItem=new CartItem();
      carItem.cars=cars;
      carItem.quantity=1;
      CartItems.push(carItem);
    }
  }
  
  removeFromCart(cars:Car){
    let item=CartItems.find(c=>c.cars.carsId===cars.carsId);
    CartItems.splice(CartItems.indexOf(item),1);
  }

  list():CartItem[]{
    return CartItems;
  }
}
