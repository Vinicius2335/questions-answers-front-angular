import { AuthService } from 'src/app/security/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss']
})
export class ProfessorComponent implements OnInit {
  jwtDecoder = this.authService.getJwtDecoder();
  date = this.authService.getTokenDateExpiration();
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
