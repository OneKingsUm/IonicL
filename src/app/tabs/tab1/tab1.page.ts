import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/interfaces/category'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  categories: Category[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.productService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error al cargar categorías:', error);
      }
    );
  }

  goTo(categoryId: number) {
    this.router.navigate(['/tabs/tab2', { categoryId: categoryId }]);
  }

  handleImageError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'path/to/default/image.png';
  }
}

