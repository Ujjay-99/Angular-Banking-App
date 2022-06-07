import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DataService } from 'src/app/Service/data.service';
import { IUserRegister } from "src/app/IUserRegister";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  data = false;  
  registerForm: any; 
  massage:string | undefined; 
  
  constructor( private formbulider: FormBuilder,private dataService: DataService) { 
    
  }

  ngOnInit(): void {
    // this.registerForm = new FormGroup({
    //   FirstName: new FormControl(''),
    //   LastName: new FormControl(''),
    //   Email: new FormControl(''),
    //   Balance:new FormControl(''),
    //   Password: new FormControl(''),
    //   ConfirmPassword: new FormControl('')
    // });

    this.registerForm=this.formbulider.group({
      UserName: ['', [Validators.required]],
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Balance:['', [Validators.required]],
      Password: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]]
    })
  }
  onFormSubmit(form: NgForm)    
  { 
    console.log("hit register");
       
    const user = this.registerForm.value;    
    this.registerNew(user);    
  } 
  registerNew(register:IUserRegister)    
  {    
  this.dataService.CreateUser1(register).subscribe(    
    ()=>    
    {    
      this.data = true;    
      this.massage = 'Data saved Successfully';    
      this.registerForm.reset();    
    });    
  }   
  // public validateControl = (controlName: string) => {
  //   return this.registerForm.get(controlName)?.invalid && this.registerForm.get(controlName)?.touched
  // }
//   public registerUser = (registerFormValue: any) => {
//     const formValues = { ...registerFormValue };
//     const user: IUserRegister = {
//       FirstName: formValues.firstName,
//       LastName: formValues.lastName,
//       Email: formValues.email,
//       Balance:formValues.balance,
//       Password: formValues.password,
//       ConfirmPassword: formValues.confirm
//     };

// this.dataService.RegisterUser("http://localhost:3492/api/user/register", user)
//     .subscribe({
//       next: (_: any) => console.log("Successful registration"),
//       error: (err: HttpErrorResponse) => console.log(err.error.errors)
//     })
}



