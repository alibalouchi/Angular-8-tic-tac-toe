import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WinnercheckService {

  constructor(private winnerCheckService: WinnercheckService) { }

  dimension = 3
  board = []
  xTurn = false

  addSymbol(id: number) {
    if (this.board[id]) return;
    this.board[id] = (this.xTurn ? "X" : "O") ;
    this.xTurn = !this.xTurn;
  }

  indexFinder(board: Array<string>) {
    let xIndex = [];
    let oIndex = [];
    board.map(
      (item, index) => {
        item === "X" ? xIndex.push([Math.floor(index / this.dimension), (index % this.dimension)])
          : (item === "O" ? oIndex.push([Math.floor(index / this.dimension), index % this.dimension])
            : void (0))
      })
    return [xIndex, oIndex];
  }

  checkX(board: Array<string>): any[]{
    let xIndex = this.indexFinder(board)[0];
    let xRow:any[] = Array(this.dimension).fill(0);
    let xColumn: any[] = Array(this.dimension).fill(0);
    let xMainDia: number = xIndex.filter((item) => item[0] == item[1]).length;
    let xSubDia: number = 0;
    let currentDimension = this.dimension;
    xIndex.forEach(item => { xRow[item[0]]++; xColumn[item[1]]++ });

    for (let iter = 0; iter <= this.dimension; iter++) {
      xIndex.forEach(item => {
        item[0] == iter && item[1] == (currentDimension - 1) && (xSubDia++);
      })
      currentDimension--;
    }
    return [xColumn, xRow, xMainDia, xSubDia];
  }

  checkO(board: Array<string>): any[]{
    let oIndex = this.indexFinder(board)[1];
    let oRow: any[] = Array(this.dimension).fill(0);
    let oColumn: any[] = Array(this.dimension).fill(0);
    let oMainDia: number = oIndex.filter((item) => item[0] == item[1]).length;
    let currentDimension = this.dimension;
    let oSubDia: number = 0;
    oIndex.forEach((item) => { oRow[item[0]]++; oColumn[item[1]]++ });

    for (let iter = 0; iter <= this.dimension; iter++) {
      oIndex.map((item) => item[0] == iter && item[1] == (currentDimension - 1)
        ? oSubDia++ : oSubDia = oSubDia)
      currentDimension--;
    }
    return [oColumn, oRow, oMainDia, oSubDia];
  }

  makeDias(board: Array<string>){
    let xSubDia = this.checkX(board)[3];
    let xMainDia = this.checkX(board)[2];
    let oSubDia = this.checkO(board)[3];
    let oMainDia = this.checkO(board)[2];

    return [xMainDia, oMainDia, xSubDia, oSubDia];
  }

  checkWinner(board: Array<string>) {
    let xIndex = this.indexFinder(board)[0];
    let oIndex = this.indexFinder(board)[1];
    let xRow: any[] = this.checkX(board)[1];
    let oRow: any[] = this.checkO(board)[1];
    let oColumn: any[] = this.checkO(board)[0];
    let xColumn: any[] = this.checkX(board)[0];

    if (oRow.find(item => item == 3) || oColumn.find(item => item == 3)) return "O"
    if (xRow.find(item => item == 3) || xColumn.find(item => item == 3)) return "X"
    
    let Dias = this.makeDias(board);
    if (Dias[0] == 3) return "X";
    if (Dias[1] == 3) return "O";
    if (Dias[2] == 3) return "X";
    if (Dias[3] == 3) return "O";

    if (xIndex.length + oIndex.length == 9) return "D";

  }
}
