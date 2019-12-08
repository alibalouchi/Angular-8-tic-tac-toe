import { Component } from '@angular/core';
import { WinnercheckService } from '../../winnercheck.service'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

  constructor(private winnercheckService: WinnercheckService){}

  board = this.winnercheckService.board
  xTurn = this.winnercheckService.xTurn
  winner = null

handleSquareClick(index:number){
  const promise = new Promise((resolve, reject) => {
    if (this.winner == null){
      this.winnercheckService.addSymbol(index)
      this.winner = this.winnercheckService.checkWinner(this.board);
      this.xTurn = this.winnercheckService.xTurn
    }else{
      resolve("success")
    }
  }) 
  .then(() => {
    if (this.winner != null){
      this.winner != "D" ? window.alert(`${this.winner} has won the game`) : window.alert("Draw");
      this.winner = null;
      this.winnercheckService.board = Array(9).fill(null);
      this.board = this.winnercheckService.board;
    }
  })
}
}
