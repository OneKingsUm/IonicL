import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Profile } from 'src/app/interfaces/user';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  profile!: Profile;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.authService.getUserProfile().subscribe(
      (profileData) => {
        this.profile = profileData;
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario', error);
      }
    );
  }
}
