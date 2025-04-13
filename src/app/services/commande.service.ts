import { inject, Injectable } from '@angular/core';
import { Commande } from '../models/command';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommandeService {
  commandBehavSubject = new BehaviorSubject<Commande[]>([]);

  //readOnly observale
  commandBehavSubjectObser = this.commandBehavSubject.asObservable();

  //inject httpClient service
  http: HttpClient = inject(HttpClient);

  /**
   * @description ajouter une commande
   * @param {Commande} command
   */
  addCommand(command: Commande) {
    return this.http.post(
      'https://angularhttpclient-ac5df-default-rtdb.firebaseio.com/Commandes.json',
      command
    );
  }
  /**
   * @description supprimer une commande
   * @param {number} id
   */
  deleteCommand(id: string | undefined) {
    return this.http.delete(
      'https://angularhttpclient-ac5df-default-rtdb.firebaseio.com/Commandes/' +
        id +
        '.json'
    );
  }

  /**
   * @description récupérer la liste des commandes
   */
  getAllCommandes() {
    return this.http
      .get<{ [key: string]: Commande }>(
        'https://angularhttpclient-ac5df-default-rtdb.firebaseio.com/Commandes.json'
      )
      .pipe(
        map((response) => {
          let cmds = [];
          for (let key in response) {
            if (response.hasOwnProperty(key)) {
              cmds.push({ ...response[key], id: key });
            }
          }
          this.commandBehavSubject.next(cmds);
          return cmds;
        })
      );
  }
}
