import { Component, OnInit } from '@angular/core';

import { DataService } from "../data.service";
import { ActivatedRoute,Router } from "@angular/router";
import { User } from '../user.model';
import { Role } from '../user.model';

@Component({
  selector: 'app-showusers',
  templateUrl: './showusers.component.html',
  styleUrls: ['./showusers.component.css']
})
export class ShowusersComponent implements OnInit {
  li: Array<User>
  currentUser=null;
  allRole: Role;
  roleName: string;

  keys() : Array<string> {
    var keys = Object.keys(this.allRole);
    return keys;
}

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {

    let givenid=this.route.snapshot.paramMap.get('id');
    this.getMembers(givenid);
  }
  getMembers(id): void {
    this.dataService.readCustomer(id).subscribe(
      (members) => {
        this.currentUser= members;
        this.currentUser=members;
        console.log("CurrentUser:", Object.entries(members));
        console.log("CurrentUser", this.currentUser);
        this.li=this.currentUser;
        
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getRole(index: number): string{
    this.roleName=Role[index];
    return Role[index];
  }
  deleteMember(id): void {
    
    {
     
     this.dataService.delete(id).subscribe(
       (response) => {
         console.log(response);
         this.router.navigate(["/view-members"]);
       },
       (error) => {
         console.log(error);
       }
     );
   }
 }

}
