import { Component, OnInit,Input } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/service/todo.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const httpRequest = req.clone({
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 3000 00:00:00 GMT'
      })
    });

    return next.handle(httpRequest);
  }
  @Input('value_app') value_app: string;
  id:any;
  sub:any;
  constructor(private route:ActivatedRoute,private todoServcie:TodoService) { }
  public data_deatail:string = "<img src='/assets/images/loading/05.gif'>";
  public data_title:string;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id =  params['id'];
      if(this.value_app!=null){
        this.id = this.value_app;
      }
     // this.id =  params['id'];
      this.todoServcie.getDataPage(this.id).subscribe((response)=>{
        if(this.id=='register'||this.id=='deposit'||this.id=='withdraw'){
          $("#content_html").replaceWith(response.data.menu_detail);
        }else{
          this.data_title = response.data.menu_name;
          this.data_deatail = response.data.menu_detail;
        }
        
      });
    });
  }

}
