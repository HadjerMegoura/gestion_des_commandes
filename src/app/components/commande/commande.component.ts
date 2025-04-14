import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommandeService } from '../../services/commande.service';
import { Commande } from '../../models/command';
import { map, Observable } from 'rxjs';
import { AppState } from '../../states/app.state';
import { Store } from '@ngrx/store';
import {
  addCommand,
  deleteCommand,
  getListCommands,
} from '../../states/command/command.actions';
import { selectCommande } from '../../states/command/command.selector';
import { NgForm } from '@angular/forms';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css',
})
export class CommandeComponent implements OnInit {
  constructor(
    private commandeService: CommandeService,
    private store: Store<AppState>
  ) {}
  commandes$: Observable<Commande[]>;
  addFormBtn: Boolean = false;
  commande: Commande = {
    product_id: '',
    quantity: 1,
    status: 'en cours',
  };
  status = ['validée', 'expédiée', 'en cours'];
  nmbrTotalCmds$: Observable<number>;

  productService = inject(ProductService);
  AvailableProducts: Product[] = this.productService.getListProduct();

  @ViewChild('commandForm') form: NgForm;

  ngOnInit() {
    this.getAllCommandes();
    this.commandes$ = this.commandeService.commandBehavSubjectObser;
    this.getTotalCmds();
  }

  /**
   * @description récupérer la liste des commandes
   */
  getAllCommandes() {
    this.store.dispatch(getListCommands());
  }

  /**
   * @description ajouter une commande
   * @param {Commande} command
   */

  addCommande() {
    let productOutOfStock = !(
      this.productService.getQuantityInStock(this.commande.product_id) > 0
    );
    if (this.form.touched && this.form.valid && !productOutOfStock) {
      console.log(this.commande.quantity);
      this.store.dispatch(addCommand({ cmd: { ...this.commande } }));
      //updater le stock aprés insertion du commande
      this.productService.productOrdered(
        this.commande.product_id,
        this.commande.quantity
      );
      this.addBtnClicked();
    }
  }
  /**
   * @description supprimer une commande
   * @param {string} id
   */
  deleteCommande(id: string) {
    this.store.dispatch(deleteCommand({ id: id }));
  }

  /**
   * @description afficher la form d'ajout d'une commande
   */
  addBtnClicked() {
    this.addFormBtn = !this.addFormBtn;
    this.form.reset();
  }

  /**
   * @description calculer le nombres totales des commandes
   */

  getTotalCmds() {
    this.nmbrTotalCmds$ = this.commandes$.pipe(map((res) => res.length));
  }

  /**
   * @description filtrer les commandes par status
   * @param {string} status
   */
  filterByStatus(status: string | undefined) {
    this.getAllCommandes();
    this.commandes$ = this.commandeService.commandBehavSubjectObser.pipe(
      map((res) => {
        if (status) {
          return res.filter((cmd) => cmd.status === status);
        } else {
          return res;
        }
      })
    );

    this.getTotalCmds();
  }

  /**
   * @description recupérer le nom du produit a partir son id
   * @param {string} id du produit
   * @returns {string} le nom du produit
   */
  getProductName(pro_id: string) {
    return this.productService.getProductNameById(pro_id);
  }

  /**
   * @description recupérer la quantité disponible d'un produit a partir son id
   * @param {string} id du produit
   * @returns {number} la quantité disponible
   */
  getProductQntinStock(pro_id: string) {
    return this.productService.getQuantityInStock(pro_id);
  }
}
