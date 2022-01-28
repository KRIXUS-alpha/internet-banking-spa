import { Component, OnInit } from '@angular/core';
import { Beneficiary } from 'src/app/models/Beneficiary';
import { Transaction } from 'src/app/models/Transaction';
import { User } from 'src/app/models/User';
import { TransferService } from 'src/app/services/transfer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  currentUser = this.userService.currentUser


  constructor(private userService: UserService, private transferService: TransferService) { }

  ngOnInit(): void {
  }
  decline(ben:Beneficiary){
    this.userService.decline(ben);
  }
  approve(ben:Beneficiary){
    this.userService.approve(ben)
  }
  approveTrans(tran:Transaction){
    this.transferService.approveTrans(tran)
  }
  declineTrans(tran:Transaction){
    this.transferService.declineTrans(tran)
  }
  getUsersForApproval(){
    return this.userService.users.filter(user => user.approved=="false")
  }
  approveUser(user:User){
    user.approved = "true";
  }
  declineUser(user:User){
    user.approved = "wrong account number"
  }

}
