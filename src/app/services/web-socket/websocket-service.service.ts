import { Injectable } from '@angular/core';
import { reverse } from 'd3';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket!: WebSocket;
  url : string = 'ws://3.228.66.133:3000';
  constructor() {
   }

   connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(this.url);

      this.socket.onopen = (event) => {
        console.log('Connected to WebSocket', event);
        resolve();  // Resuelve la promesa cuando la conexión está abierta
      };

      this.socket.onmessage = (event) => {
        console.log('Message from server', event.data);
        this.handleMessage(event);
      };

      this.socket.onclose = (event) => {
        console.log('WebSocket closed', event);
      };

      this.socket.onerror = (event) => {
        console.error('WebSocket error', event);
        reject(event);  // Rechaza la promesa en caso de error
      };
    });
  }

   public send(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log('manda mensaje')
      this.socket.send(message);
    }
  }

  private handleMessage(event: MessageEvent): void {
    try {
      const message = JSON.parse(event.data);
      console.log('Mensaje recibido desde el servidor:', message);
      // Aquí puedes procesar el mensaje recibido del servidor
    } catch (error) {
      console.error('Error al parsear el mensaje JSON:', error);
    }
  }

  sendMessage(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    }
  }

  desconectar(){
   if(this.socket) this.socket.close()
  }
}
