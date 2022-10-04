import { UserService } from './../../util/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.scss']
})
export class ProfComponent implements OnInit {
  board!: string;
  errorMessage!: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getProfessorBoard().subscribe(
      data => {
        this.board = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    )
  }

}
