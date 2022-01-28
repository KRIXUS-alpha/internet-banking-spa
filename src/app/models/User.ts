import { Beneficiary } from "./Beneficiary"
import { Transaction } from "./Transaction"

export class User {
    name:string
    email:string
    password:string
    role:string
    userName:string
    accNo:string 
    balance: number 
    beneficiaries:Beneficiary[]= []
    transactions:Transaction[] = []
    approveTrans:Transaction[] = []
    approveBen:Beneficiary[] = []
    approved: string = "false"

    constructor(init?:Partial<User>){
        this.name = ""
        this.email = ""
        this.password = ""
        this.role = ""
        this.userName = ""
        this.accNo = ""
        this.balance = 0
        Object.assign(this,init)
    }
}