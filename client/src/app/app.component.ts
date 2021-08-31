import { Component } from "@angular/core";
import { FormatDate } from "./datetime.decorator";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "assignment14";
  displaytable: boolean = false;
   
  constructor(private authService: AuthService){

  }
  
// @FormatDate()

  
}
