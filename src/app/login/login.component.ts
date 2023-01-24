import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from '../api.service';
import { Credentials } from './credentials';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {


  creds : Credentials = {
    email: '',
    password: ''
  }

  constructor(
    private router: Router,
    private apiService: ApiService){
    
  }
  ngOnInit(): void {
    
  }


  hide = true;

  login(){
        
    this.apiService.login(this.creds)
    .subscribe(response => {
      this.router.navigate(['/navegacion']);      
    })
  }

}
