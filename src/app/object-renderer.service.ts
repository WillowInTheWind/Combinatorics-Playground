import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ObjectRendererService {
    api_url: string = "http://127.0.0.1:5000";
   getCardsbyNandR (n: number, r: number, set: string) {
    let image_urls: SafeUrl[] = []


      return this.http.get( this.api_url + '/api/binary/' + set + "/n_r",{params: {
         n: n, r: r}}).pipe(
       map(res => {
         /* Your processing here */
         // @ts-ignore
         // console.log(res)
       return res.result.map(result => {
          this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + result.graphic);
       });}),
     )

   }
  getCardsbyFixedTotal (total: number, set: string) {
    let image_urls: SafeUrl[] = []


    return this.http.get<CardPackage[]>( this.api_url + '/api/fixed_total/' + set ,{params: {
        total: total}})
  }
  constructor(private sanitizer: DomSanitizer, private http: HttpClient) { }
}

export interface CardPackage{
  graphic: string,
  id: number,
  n: number,
  r: number,
}
