import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth.service';
import { User } from '../modelo/User';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  user: User;
  constructor(public formBuilder: FormBuilder, public fireAuth: FirebaseAuthService, private navCtrl: NavController) { }

  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      password: new FormControl("", Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
      email: new FormControl("", Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+[@]{1}[a-zA-Z0-9-]+[.]{1}[a-zA-Z]+$'),
        Validators.required
      ]))
    });
  }

  onSubmit(values){
    this.fireAuth.loginUser(values.email, values.password)
    
    .then( (data)=>{
      this.navCtrl.navigateForward('home');
      console.log("Registro correcto");
      
      })
      
      .catch( (error)=>{
      
        console.log("Error en el registro: "+error['message']);
      
      });
  }

  register(values){
    this.fireAuth.registerUser(values.email, values.password)

    .then( (data)=>{

      console.log("login correcto");
      
      this.fireAuth.userDetails()
      
        .subscribe( data => {
      
          console.log(data);
      
        });
      
      })
      
      .catch( (error)=>{
      
        console.log("Error en el login: "+error['message']);
      
      });
      
      
  }
}
