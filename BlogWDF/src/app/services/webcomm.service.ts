import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class WebcommService {
  @Output() public onMessage: EventEmitter<string> = new EventEmitter();
  constructor(private httpC:HttpClient) { }

  public SendAuthenticatedRequest(){
    let token = 'xxx';
    return this.httpC.get("https://localhost:4200/api/values",{headers:{Authorization:"Bearer "+token}}).subscribe((data)=>{

    });
  }
}
