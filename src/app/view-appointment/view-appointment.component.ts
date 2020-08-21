import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.css']
})
export class ViewAppointmentComponent implements OnInit {

  constructor(private dataservice:UserService) { }
  columns = ["Sl NO","Name","Address", "City", "Package", "Trainer Preference","Phone"];
  index = ["id","firstname", "streetaddress","city","packages","trainerpreference","phonenumber"];
  users =[];

  ngOnInit() {
    this.dataservice.getfitnessdata().subscribe
    (
      (response)=>
      {
        this.users = response;
      },
      (error) => console.log(error)
    )
    
  }
  deletecust(id){
    this.dataservice.deletefitnessdata(id).subscribe
    (
      (response)=>
      {
      console.log(response)
      },
      (error) => console.log(error)
    )
    this.ngOnInit();
 }
  getfitness() {
    
  }
}