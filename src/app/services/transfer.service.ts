import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { Transaction } from '../models/Transaction';
import { User } from '../models/User';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  err: boolean = false
  toUserNotFound: boolean = false
  constructor(private userService: UserService) { }

  // transfer(fromUser: User | null, toUser: string, amount: number): boolean {
  //   let userPresent: boolean = this.userService.checkUserPresent(toUser)
  //   if (userPresent) {
  //     if (fromUser) {
  //       fromUser.balance = fromUser.balance == 0 ? fromUser.balance : (fromUser.balance!) - amount
  //       this.userService.transferUser.balance = Number(this.userService.transferUser.balance) + Number(amount)
  //       console.log(typeof this.userService.transferUser.balance)
  //       console.log(this.userService.users)
  //       return true
  //     }
  //     else {
  //       return false
  //     }
  //   }
  //   else {
  //     this.toUserNotFound = true
  //     return false
  //   }

  // }
  transfer(fromUser: User | null, toUser: string, amount: number): boolean {
    return true
  }
  addTransfer(fromUser: User | null, toUser: string, amount: number) {

    let userPresent: User = this.userService.checkUserPresent(toUser)
    if (userPresent) {
      if (fromUser) {
        var newTrans: Transaction = new Transaction
        newTrans.fromAcc = fromUser.accNo
        newTrans.toAcc = toUser
        newTrans.amount = amount
        newTrans.id = this.userService.currentUser?.transactions.length == undefined ? 1 : this.userService.currentUser?.transactions.length + 1
        newTrans.date = new Date()
        newTrans.status = "not approved"
        newTrans.conditions = "matched"
        this.userService.currentUser?.transactions.push(newTrans)
        for (var i = 0; i < this.userService.users.length; i++) {
          if (this.userService.users[i].role === "Admin") {
            this.userService.users[i].approveTrans.push(newTrans)
          }
        }
      }
    }
    else{
      if (fromUser) {
        var newTrans: Transaction = new Transaction
        newTrans.fromAcc = fromUser.accNo
        newTrans.toAcc = toUser
        newTrans.amount = amount
        newTrans.id = this.userService.currentUser?.transactions.length == undefined ? 1 : this.userService.currentUser?.transactions.length + 1
        newTrans.date = new Date()
        newTrans.status = "not approved"
        newTrans.conditions = "not matched"
        this.userService.currentUser?.transactions.push(newTrans)
        for (var i = 0; i < this.userService.users.length; i++) {
          if (this.userService.users[i].role === "Admin") {
            this.userService.users[i].approveTrans.push(newTrans)
          }
        }
      }
    }

  }
  approveTrans(tran: Transaction) {
    for (var i = 0; i < this.userService.users.length; i++) {
      if (this.userService.users[i].role === "Admin") {
        let key = this.userService.users[i].approveTrans.findIndex(o => o.fromAcc === tran.fromAcc && o.toAcc === tran.toAcc && tran.id == o.id);
        this.userService.users[i].approveTrans.splice(key, 1)
      }
    }

    let key = this.userService.users.findIndex(o => o.accNo === tran.fromAcc);
    console.log(key, "key")
    var updatedTrans = this.userService.users[key].transactions.find(o => o.toAcc === tran.toAcc && o.fromAcc === tran.fromAcc && tran.id === o.id)
    console.log(updatedTrans, "updatedTrans")
    if (updatedTrans != null) {
      updatedTrans.status = "approved"
      updatedTrans.conditions = "matched"

      let toUser: User | undefined = this.userService.users.find(o => o.accNo === updatedTrans?.toAcc)
      let fromUser: User | undefined = this.userService.users.find(o => o.accNo === updatedTrans?.fromAcc)


      if (toUser && fromUser) {
        fromUser.balance = fromUser.balance == 0 ? fromUser.balance : (fromUser.balance!) - updatedTrans.amount
        toUser.balance = Number(toUser.balance) + Number(updatedTrans.amount)
        // console.log(typeof this.userService.transferUser.balance)
        console.log(this.userService.users)



      }
    }
  }
  declineTrans(tran: Transaction) {
    for (var i = 0; i < this.userService.users.length; i++) {
      if (this.userService.users[i].role === "Admin") {
        let key = this.userService.users[i].approveTrans.findIndex(o => o.fromAcc === tran.fromAcc && o.toAcc === tran.toAcc && tran.id == o.id);
        this.userService.users[i].approveTrans.splice(key, 1)
      }
    }

    let key = this.userService.users.findIndex(o => o.accNo === tran.fromAcc);
    console.log(key, "key")
    var updatedTrans = this.userService.users[key].transactions.find(o => o.toAcc === tran.toAcc && o.fromAcc === tran.fromAcc)
    console.log(updatedTrans, "updatedTrans")
    if (updatedTrans != null) {
      updatedTrans.status = "declined"
      updatedTrans.conditions = "not matched"

     
    }
  }
}
