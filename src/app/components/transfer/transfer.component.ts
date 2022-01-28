import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Beneficiary } from 'src/app/models/Beneficiary';
import { User } from 'src/app/models/User';
import { TransferService } from 'src/app/services/transfer.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  transactionStatus!: boolean;
  beneficiaries: Beneficiary[] | undefined = []
  currentUser: User | null = this.userService.currentUser
  approved: Beneficiary[] | undefined
  benName: string = ""
  benAcc: string = ""
  tquery: string = ""
  sendingPower: number = 0
  constructor(private userService: UserService, private transferService: TransferService) { }

  ngOnInit(): void {
    this.beneficiaries = this.userService.currentUser?.beneficiaries
    this.approved = this.userService.currentUser?.beneficiaries.filter(value => value.status == "approved")
    this.currentUser = this.userService.currentUser
    setTimeout(() => {
      this.getUnlockedAmount()

    }, 1000);
  }
  toAcck: Beneficiary = new Beneficiary
  amount: number = 0
  transfer() {
    let fromUser: User | null = this.userService.currentUser
    this.transactionStatus = this.transferService.transfer(fromUser, this.toAcck.toAcc, this.amount)

  }
  transferapp() {
    let fromUser: User | null = this.userService.currentUser
    this.transferService.addTransfer(fromUser, this.toAcck.toAcc, this.amount)
    this.getUnlockedAmount()
  }
  addBen() {
    console.log(this.benAcc)
    let beneficiary = new Beneficiary
    beneficiary.toAcc = this.benAcc
    beneficiary.fromAcc = this.currentUser?.accNo == undefined ? "" : this.currentUser.accNo
    beneficiary.id = this.userService.currentUser?.beneficiaries.length == undefined ? 1 : this.userService.currentUser?.beneficiaries.length + 1
    beneficiary.conditions = "under check"
    beneficiary.status = "not approved"
    this.userService.addBenApproval(beneficiary)
  }
  getUnlockedAmount() {
    if (this.userService.currentUser) {
      console.log(this.userService.currentUser?.transactions.filter(item => item.status == "not approved").map(item => Number(item.amount))?.reduce((prev, next) => prev + next, 0), "sum")
      this.sendingPower = Number(this.userService.currentUser?.balance) - this.userService.currentUser?.transactions.filter(item => item.status == "not approved").map(item => Number(item.amount))?.reduce((prev, next) => prev + next, 0)
    }
  }
  validateAmount():boolean {

    return (this.amount > this.sendingPower)&&(typeof this.amount=="number");
  }
  

}


