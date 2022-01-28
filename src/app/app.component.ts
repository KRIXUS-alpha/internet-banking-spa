import { Component } from '@angular/core';
import { User } from './models/User';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'internet-banking-spa';
  currentUser!:User| null 
  userLoggedIn:boolean = false
  constructor(private UserService:UserService ){
    // this.currentUser = this.UserService.currentUser!=null?this.UserService.currentUser:this.currentUser
    // this.userLoggedIn = this.currentUser == undefined ? false : true
    // console.log(this.currentUser)
    // console.log("app constructor")
  }
  
  // setUserStatus(appObj:AppComponent){
    
  //   console.log("setUserStatus")
  //   console.log(this)
  //   appObj.currentUser = appObj.UserService.currentUser
  //   appObj.userLoggedIn = appObj.currentUser == undefined ? false : true
  //   console.log(this.userLoggedIn)
  // }
  isUserLoggedIn(){
    this.currentUser = this.UserService.currentUser
    this.userLoggedIn = this.currentUser == undefined ? false : true
    console.log(this.currentUser)
    if(this.userLoggedIn ==  false){
      return false
    }
    else{
      return true
    }
  }
  isAdmin(){
    if(this.currentUser?.role == "Admin"){
      return true
    }
    else{
      return false
    }
  }
  logout(){
    this.UserService.logout()
  }
}
