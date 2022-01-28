import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Validation from '../../utils/validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup = new FormGroup({
    name: new FormControl('Thinker'),
    userName: new FormControl('thinker007'),
    email: new FormControl('thinker@thoughts.com'),
    password: new FormControl('thinker'),
    confirmPassword: new FormControl('thinker'),
    accNo: new FormControl('101'),
    acceptTerms: new FormControl(false),
    role: new FormControl('Retail User')
  });
  adminForm: FormGroup = new FormGroup({
    name: new FormControl('Thinker'),
    userName: new FormControl('thinker007'),
    email: new FormControl('thinkerthinks@thoughts.com'),
    password: new FormControl('thinker'),
    confirmPassword: new FormControl('thinker'),
    acceptTerms: new FormControl(false),
    role: new FormControl('Admin')
  });
  submitted = false;
  content!: User;
  private newUser!: User
  role: string = ""
  constructor(private UserService: UserService, private router: Router, private formBuilder: FormBuilder) { }


  ngOnInit(): void {

    this.form = this.formBuilder.group(
      {
        name: ['Thinker', Validators.required],
        userName: [
          'thinker007',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['thinkerthinks@thoughts.com', [Validators.required, Validators.email]],
        password: [
          'thinker',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['thinker', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
        accNo: ['', Validators.required],
        role:['Retail User']

      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
    this.adminForm = this.formBuilder.group(
      {
        name: ['Thinker', Validators.required],
        userName: [
          'thinker007',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['thinker@thoughts.com', [Validators.required, Validators.email]],
        password: [
          'thinker',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['thinker', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
        role:['Admin']
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    if (this.role == "Admin"){
      return this.adminForm.controls
    }
    else{
      return this.form.controls;

    }
  }



  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      console.log("form invalid")
      return;
    }


    // console.log(JSON.stringify(this.form.value, null, 2));
    // console.log(JSON.parse(JSON.stringify(this.form.value, null, 2)))
    // this.content = JSON.parse(JSON.stringify(this.form.value, null, 2))
    // this.content = Object.assign(this.content, JSON.parse(JSON.stringify(this.form.value, null, 2)));
    // console.log(this.content)
    this.newUser = new User(JSON.parse(JSON.stringify(this.form.value, null, 2)))
    console.log(this.newUser, "new user")
    this.role = "Retail User yo"
    setTimeout(() => {
    this.register();
      
    }, 1000);
    setTimeout(() => {
      this.onReset()

    }, 2000);

  }
  onSubmitAdmin(): void {
    this.submitted = true;

    if (this.adminForm.invalid) {
      console.log("adminForm invalid")
      return;
    }


    // console.log(JSON.stringify(this.adminForm.value, null, 2));
    // console.log(JSON.parse(JSON.stringify(this.adminForm.value, null, 2)))
    // this.content = JSON.parse(JSON.stringify(this.adminForm.value, null, 2))
    // this.content = Object.assign(this.content, JSON.parse(JSON.stringify(this.adminForm.value, null, 2)));
    // console.log(this.content)
    this.newUser = new User(JSON.parse(JSON.stringify(this.adminForm.value, null, 2)))
    console.log(this.newUser, "new user")
    this.role = "Admin"
    setTimeout(() => {
    this.register();
      
    }, 1000);
    setTimeout(() => {
      this.onResetAdmin()

    }, 2000);

  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  onResetAdmin(): void {
    this.submitted = false;
    this.adminForm.reset();
  }



  // name:string = ""
  // userEmail:string = ""
  // userPassw:string = ""
  // accNo:string = ""
  // role:string = ""
  // userName:string = ""

  register() {
    console.log(this.newUser, "cool")
    if (this.newUser.role == "Admin") {
      let user: User = new User
      user.name = this.newUser.name
      user.email = this.newUser.email
      user.password = this.newUser.password
      user.userName = this.newUser.userName
      user.role = this.newUser.role
      this.UserService.addUser(user)
      if (this.UserService.userPresent == true) {
        alert("user with email present, please login")
        this.router.navigate(["/login"])
      }
    }
    else if (this.newUser.role ==  "Retail User") {
      console.log("called on admin", this.newUser)
      let user: User = new User
      user.name = this.newUser.name
      user.email = this.newUser.email
      user.password = this.newUser.password
      user.accNo = this.newUser.accNo
      user.userName = this.newUser.userName
      user.role = this.newUser.role
      this.UserService.addUser(user)
      if (this.UserService.userPresent == true) {
        alert("user with email present, please login")
        this.router.navigate(["/login"])
      }
    }
   

  }


}
