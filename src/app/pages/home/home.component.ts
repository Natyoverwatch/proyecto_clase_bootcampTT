import { Component, OnInit } from '@angular/core';
import { TablaComponent } from '../../components/tabla/tabla.component';
import { PersonaComponent } from "../persona/persona.component";
import Swal from 'sweetalert2';
import { ProductsComponent } from "../products/products.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [TablaComponent, PersonaComponent, ProductsComponent]
})
export class HomeComponent implements OnInit {
    nombre: string = '';

    ngOnInit(): void {
        this.nombre = 'Nathalia Saiz';
        this.showSlides();
    }

    showSlides() {
        var slideIndex = 0;
        var i;
        var slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
        for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        }
        slideIndex++;
        if(slideIndex > slides.length) {slideIndex = 1}
        slides[slideIndex-1].style.display = "block";
        setTimeout(this.showSlides,2000);
    }

    mostrarModal(): void {
        Swal.fire({
            title: 'The Internet?',
            text: 'That thing is still around?',
            icon: 'question',

        })
        
    }
}
