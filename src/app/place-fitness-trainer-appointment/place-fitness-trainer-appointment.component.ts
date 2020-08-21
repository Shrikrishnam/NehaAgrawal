import { Component, OnInit} from '@angular/core';
import {  FormGroup,FormControl,FormBuilder } from "@angular/forms";
import { UserService } from '../_services/user.service';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

export class Fitness {
  constructor(
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname:string,
    public lastname: string,
    public age:number,
    public trainerpreference: string,
    public physiotherapist: string,
   public packages: string
  ) { }
}
@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html',
  styleUrls: ['./place-fitness-trainer-appointment.component.css']
  
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {

  fitnessForm : FormGroup;
  preference: any = ['Male Trainer','Female Trainer','No preference'];
  packag: any = ['200','500','1000','5000'];
  phsio:any= ['yes','no'];
  pagetitle:string;

  constructor(private dataservice: UserService,private fb:FormBuilder,public acRoute: ActivatedRoute,
    public router: Router) { }

  
  namevalidpattern: string = "[a-zA-Z]*";
  editb:boolean = false;

  ngOnInit() {
    const id=this.acRoute.snapshot.params.id;
  if(this.acRoute.snapshot.params.id > 0){
    this.editb= true;
    this.pagetitle="Edit Details"
    this.dataservice.getfitnessdatatoedit(id).subscribe(
      res => {
        this.fitnessForm.patchValue({
          firstname: res.firstname,
          lastname: res.lastname,
          age:res.age,
          phonenumber: res.phonenumber,
          email: res.email,
          streetaddress: res.streetaddress,
          city: res.city,
          state:res.state,
          country: res.country,
          pincode: res.pincode,
          inr: res.inr,
          paisa:res.paisa,
          trainerpreference:res.trainerpreference,
          physiotherapist:res.physiotherapist,
          packages:res.packages
        });
      }
    )
  }
  else{
    this.pagetitle="Place Appointment"
  }
  this.fitnessForm=this.fb.group
      ({
        firstname: [null, [Validators.required,Validators.pattern(this.namevalidpattern)]],
        lastname: [null,[Validators.required,Validators.pattern(this.namevalidpattern)]],
        age:[null, [Validators.required,Validators.min(19),Validators.max(59)]],
        phonenumber: [null, Validators.required],
        email: [null, [Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]],
        streetaddress: [null, Validators.required],
        city: [null, Validators.required],
        state:[null, Validators.required],
        country: [null, Validators.required],
        pincode: [null, [Validators.required,Validators.pattern("[0-9]{6}")]],
        inr: [null, Validators.required],
        paisa: [null, Validators.required],
        trainerpreference:[null,Validators.required],
        physiotherapist:[null,Validators.required],
        packages:[null,Validators.required]
      });
  }
  editappoint(){
     const id=this.acRoute.snapshot.params.id;
    console.log(id);
        this.dataservice.editfitnessdata(
          this.fitnessForm.value,id).subscribe
        (
          (response)=>
          {
          console.log(response)
          this.router.navigate(['view-appointment']);
          },
          (error) => {console.log(error)
            alert('Error')}
        )
  }
  onSubmit() {
   const { value : formData} = this.fitnessForm;
    if(this.fitnessForm.valid){
      this.dataservice.postfitnessdata(
        new Fitness(
          formData.inr,
          formData.paisa,
          formData.streetaddress,
          formData.city,
          formData.state,
          formData.country,
          formData.pincode,
          formData.phonenumber,
          formData.email,
          formData.firstname,
          formData.lastname,
          formData.age,
          formData.trainerpreference,
          formData.physiotherapist,
          formData.packages
        )
      ).subscribe(
        (res) => {
         // alert("Submited");
         // this.fitnessForm.reset()
          this.router.navigate(['view-appointment']);
        },(err) => {
          alert("Error")
        }
      )
    }
  } 
}
