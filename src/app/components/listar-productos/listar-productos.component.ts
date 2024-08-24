import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { NgFor, NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.css'
})
export class ListarProductosComponent {
  listProductos: Producto[] = [];

  constructor(private _productoService: ProductoService,
              private toastr: ToastrService
  ) {  }

  ngOnInit(): void {
    this.obtenerproductos();
  }

  obtenerproductos() {
    this._productoService.getProductos().subscribe(data => {
      console.log(data);
      this.listProductos = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarProducto(id: any) {
    this._productoService.eliminarProducto(id).subscribe(data => {
      this.toastr.error('El producto fue eliminado con exito!', 'Producto Eliminado');
      this.obtenerproductos();
    }, error => {
      console.log(error);
    })
  }
}
