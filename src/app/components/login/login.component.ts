import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private UserService:UserService,private Router: Router) { }
  user:User = new User
  userEmail:string = ""
  userPass:string = ""
  ngOnInit(): void {
  }
  login(){
    this.user.email = this.userEmail
    this.user.password = this.userPass
    this.UserService.login(this.user)
    setTimeout(() => {
      if(this.UserService.passwrong == true){
        alert("Wrong Password")
        this.userPass =  ""
      }
      else if(this.UserService.rerouteToProfile == true){
  
        this.Router.navigate(["/profile"])
      }
      else if (this.UserService.rerouteToRegister == true){
        alert("User not present, please register")
        this.Router.navigate(["/register"])
      }
      else{
        console.log("failed to login")
      }
      
    }, 2000);
    
  }
  

}
