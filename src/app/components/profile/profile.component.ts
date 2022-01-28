import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userStatus:string = ""
  constructor(private UserService:UserService) { 
    this.getCurrentUser()
  }
  user!:User | undefined
  userAcc:string =""
  ngOnInit(): void {
  }
  getCurrentUser(){
    this.user = this.UserService.currentUser == undefined ? undefined : this.UserService.currentUser
  }
  getUserStatus():string{
    this.userStatus = this.UserService.currentUser?.approved==undefined ? "" : this.UserService.currentUser.approved
    return this.UserService.currentUser?.approved==undefined ? "" : this.UserService.currentUser.approved
  }
  updateAcc(){
    if(this.UserService.currentUser?.accNo){
      this.UserService.currentUser.accNo = this.userAcc
      this.UserService.currentUser.approved = "false"
    }
  }
}
