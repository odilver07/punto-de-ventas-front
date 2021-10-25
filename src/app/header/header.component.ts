import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  term: string;

  constructor(public authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  logout():void{
    this.authService.logout();
    Swal.fire({
      position: 'center',
      background:'#2e2926',
      title: '<span class="fs-1 text-white">PokerCel</span><i class="bi bi-suit-club-fill" style="color: white;"> <br>'
             +'<i class="bi bi-suit-club-fill" style="color: green;"></i><i class="bi bi-suit-diamond-fill" style="color: #ff00ff;"></i>'
             +'<i class="bi bi-suit-heart-fill" style="color: #ff0000;"></i><i class="bi bi-suit-spade-fill" style="color: black;"></i> <br>'
             +'<span class="fs-5">Se ha cerrado sesion correctamente</span>',
      showConfirmButton: false,
      icon: 'success',
      timer: 1500
    })
    this.router.navigate(['/login'])
  }

  buscar():void{
    if(this.term == null){
      this.term = 'redmi'
    }
    this.router.navigate([`/productos/disponibles/${this.term}`]);
  }

}
