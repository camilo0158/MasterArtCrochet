import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlobStorageService {
  constructor(private http: HttpClient) {}

  loadFile(files: any, idProduct: string): Observable<any> {
    return this.http.post<any>(
      `${environment.masterAppBlobStorageApi.baseApi}/Image?idProduct=${idProduct}`,
      files
    );
  }
}
