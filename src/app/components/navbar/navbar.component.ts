import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  isLoggedIn:boolean;
  loggedInUser:string;
  showRegister:boolean;


  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessages:FlashMessagesService
    
  ) { }

  ngOnInit(): void {

    this.authService.getAuth().subscribe(auth=>{
      if(auth){
        this.isLoggedIn=true;
        this.loggedInUser=auth.email;
      }else{
        this.isLoggedIn=false;
      }
    });
  }

  onLogOutClick(){
    this.authService.logOut();
    this.flashMessages.show('You are now Logged out',{
      clssClass: 'alert-success', timeout:4000
    });
    this.router.navigate(['/login']);

  }

}
