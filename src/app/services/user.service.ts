import { Injectable } from '@angular/core';
import { Beneficiary } from '../models/Beneficiary';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [{
    name: "a",
    email: "a@a.com",
    password: "12345678",
    role: "Retail User",
    userName: "a",
    accNo: "1",
    balance: 1000,
    beneficiaries: [{
      toAcc: "2",
      fromAcc: "1",
      id: 0,
      status: "approved",
      conditions: "match",
    }],
    transactions: [],
    approveTrans: [],
    approveBen: [],
    approved: "true"
  }, {
    name: "b",
    email: "b@b.com",
    password: "12345678",
    role: "Retail User",
    userName: "b",
    accNo: "2",
    balance: 2000,
    beneficiaries: [{
      toAcc: "1",
      fromAcc: "2",
      id: 0,
      status: "approved",
      conditions: "match",
    }],
    transactions: [],
    approveTrans: [],
    approveBen: [],
    approved: "true"
  },
  {
    name: "Super Admin",
    email: "admin@admin.com",
    password: "12345678",
    role: "Admin",
    userName: "admin",
    accNo: "",
    balance: 0,
    beneficiaries: [],
    transactions: [],
    approveTrans: [],
    approveBen: [],
    approved: "true"
  },
  ];
  constructor() { }
  rerouteToProfile: boolean = false
  rerouteToRegister: boolean = false
  passwrong: boolean = false
  currentUser!: User | null
  userPresent: boolean = false
  transferUser!: User

  login(user: User) {
    console.log(this.users)


    let obj = this.users.find(o => o.email === user.email);

    console.log(obj);
    if (obj == undefined) {
      this.rerouteToRegister = true

    }
    else {
      if (obj.password === user.password) {
        this.rerouteToProfile = true
        this.currentUser = obj
        console.log(JSON.stringify(this.currentUser) + " Current User")
      }
      else {
        this.passwrong = true
      }
    }
  }
  addUser(user: User) {
    var search = this.users.findIndex(item => item.email == user.email)
    if (search == -1) {
      this.users.push(user)
      console.log(this.users)
    }
    else {
      this.userPresent = true
    }
  }
  checkUserPresent(transferUser: string): User  {
    let obj = this.users.find(o => o.accNo === transferUser);
    if (obj != undefined) {
      this.transferUser = obj
      console.log(typeof obj.balance)
      return obj
    }
    else return this.transferUser

  }
  addBenApproval(ben: Beneficiary) {
    let userPresent: User = this.checkUserPresent(ben.toAcc)
    if(userPresent){
      ben.conditions = "matched"
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].role === "Admin") {
          this.users[i].approveBen.push(ben)
        }
      }
    }
    else{
      ben.conditions = "not matched"
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].role === "Admin") {
          this.users[i].approveBen.push(ben)
        }
      }
    }

    this.currentUser?.beneficiaries.push(ben)

  }
  approve(ben: Beneficiary) {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].role === "Admin") {
        let key = this.users[i].approveBen.findIndex(o => o.fromAcc === ben.fromAcc && o.toAcc === ben.toAcc);
        this.users[i].approveBen.splice(key, 1)
      }
    }
  
    let key = this.users.findIndex(o => o.accNo === ben.fromAcc);
    var updatedBen = this.users[key].beneficiaries.find(o=> o.toAcc === ben.toAcc && o.fromAcc === ben.fromAcc)
    if (updatedBen != null) {
      updatedBen.status = "approved"
      updatedBen.conditions = "matched"
    }

  }
  decline(ben: Beneficiary) {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].role === "Admin") {
        let key = this.users[i].approveBen.findIndex(o => o.fromAcc === ben.fromAcc && o.toAcc === ben.toAcc);
        this.users[i].approveBen.splice(key, 1)
      }
    }
    ben.status = "not Approved"
    ben.conditions = "not matched"
    let key = this.users.findIndex(o => o.accNo === ben.fromAcc);
    this.users[key].beneficiaries.push(ben)
  }
  logout() {
    this.currentUser = null
  }
}
