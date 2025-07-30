import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class ObjectRendererService {
  getCardsbyNandR (n: number, r: number, set: string) {
    let image_urls: SafeUrl[] = []
    let image_bytes = this.http.get("http://127.0.0.1:5000/api/binary/" + set + "/n_r",{params: {
        n: n, r: r}}).subscribe( (res: any) => {
          for (let result of res.result) {
            let objectURL = 'data:image/png;base64,' + result;
            image_urls.push( this.sanitizer.bypassSecurityTrustUrl(objectURL));
          }
    })
    // console.log("http request completed - returning URLS")
  //   to do
    return image_urls;
  }
  constructor(private sanitizer: DomSanitizer, private http: HttpClient) { }
}
