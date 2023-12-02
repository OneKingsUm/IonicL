import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  products: Product[]=[];
  categoryId?: number;

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state;
    if (state && 'categoryId' in state) {
      this.categoryId = state['categoryId'];
      this.loadProductsForCategory();
    } else {
      this.loadDefaultProducts();
    }
  }

  loadProductsForCategory() {
    this.productService.getProductsByCategory(this.categoryId!).subscribe(
      (data) => this.products = data,
      (error) => console.error('Error al cargar productos:', error)
    );
  }

  loadDefaultProducts() {
    this.productService.getDefaultProducts().subscribe(
      (data) => this.products = data,
      (error) => console.error('Error al cargar productos por defecto:', error)
    );
  }

  handleImageError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = '/path/to/default/image.png';
  }
}
