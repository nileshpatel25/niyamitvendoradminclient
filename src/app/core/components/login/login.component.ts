import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import { AppService } from '../../services/app.service';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  currantYear: number = new Date().getFullYear();
  public loginform!: FormGroup;
  formSubmitted: boolean =false;
  test: string='Hello   ';
  constructor(
    private apiservice:ApiService,
    private router:Router,private toast:ToastrService,
    // private toast:ToastrService,
     private appservice:AppService,
    // private sppiner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
  console.log(this.test.charAt(0));
  this.loginform = new FormGroup({
    userName:new FormControl('',[Validators.required]),
    password:new FormControl('',Validators.required),
    grantType:new FormControl('password')
  });
  }

login()
{

  this.formSubmitted=true;
  if(this.loginform.valid && this.formSubmitted)
  {
   // this.sppiner.show();
    const body=new URLSearchParams();
    body.set('userName',this.loginform.value.username);
    body.set('password',this.loginform.value.password);
    body.set('grantType','password');
    const options = {
      headers: new HttpHeaders().set('Access-Control-Allow-Origin','*')
    };


    this.apiservice.postapi('Vendor/vendorlogin',this.loginform.value).subscribe(resp=>{
      if(resp.status){
        this.router.navigate(['/dashboard']);
        this.toast.success('login successfully..');
        this.appservice.login(resp);
      }
      else{
       
        this.toast.error('Message Error!', 'Title Error!');
        this.toast.error('Error!','Invalid User!');
        alert('username and password incorrect');
        this.toast.error(resp.message);
      }
    });
  }else
  {
   // this.toast.error(resp.message);
    //this.toast.error('Error!','Invalid User!');
  }
}

}
