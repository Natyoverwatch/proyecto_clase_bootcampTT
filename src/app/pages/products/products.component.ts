import { Component } from '@angular/core';
import { ContadorComponent } from "../../components/contador/contador.component";

@Component({
    selector: 'app-products',
    standalone: true,
    templateUrl: './products.component.html',
    styleUrl: './products.component.css',
    imports: [ContadorComponent]
})
export class ProductsComponent {

}
