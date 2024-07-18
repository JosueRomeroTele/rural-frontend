import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, subscribeOn } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  private socket:Socket | undefined;
  url:string = 'http://3.228.66.133:3000'
  // url:string = 'http://localhost:3000'
  constructor() {
    // this.socket = io(this.url);
   }

  connect() {
    if (!this.socket) {
      this.socket = io('http://3.228.66.133:3000');
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      // this.socket = undefined;
    }
  }

  getSocket() {
    return this.socket;
  }

}
