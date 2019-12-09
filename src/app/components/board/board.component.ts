import { Component } from '@angular/core';
import { WinnercheckService } from '../../winnercheck.service'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

  constructor(private winnercheckService: WinnercheckService){}

  board = this.winnercheckService.board;
  xTurn = this.winnercheckService.xTurn;
  winner = Array(9).fill(false);
  haveWinner = false;

addSymbol(id: number) {
  if (this.board[id]) return;
  this.board[id] = (this.xTurn ? "X" : "O") ;
  this.xTurn = !this.xTurn;
}

handleSquareClick(index:number){
  (this.winner.find(item => item == true) ? this.haveWinner = true : this.haveWinner = false);
  if(this.haveWinner == false) this.addSymbol(index)
  let indexes = this.winnercheckService.checkWinner(this.board)
  indexes.map(item => this.winner[item] = true)
}

handleReset(){
  this.board = Array(9).fill(null);
  this.winner = Array(9).fill(false);
}
}
