import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/modules/api/api.service';

interface User {
  id: number;
  name: string;
  device: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;

  constructor(private  apiService: ApiService) {
    this.user = {
      id: -1,
      name: null,
      device: null
    };
  }

  defineUser() {
    this.apiService.getUser()
      .then(data => {
        console.log(data);
        this.user.name = data.name;
      });
  }

}
