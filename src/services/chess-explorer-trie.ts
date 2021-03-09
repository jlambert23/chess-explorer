import { Game, Move } from '@mliebelt/pgn-parser';
import { MoveNode, NotationNode } from '../models/chess-explorer.model';

export class ChessExplorerTrie {
  root: MoveNode;

  constructor(games?: Game[]) {
    this.root = {
      children: [],
      value: null,
      meta: null,
    };

    if (games) {
      for (const game of games) {
        this.put(game);
      }
    }
  }

  put(game: Game) {
    let moves: Move[] | [...Move[], string] = game.moves;

    if (typeof moves[moves.length - 1] === 'string') {
      moves = game.moves.slice(0, game.moves.length - 1) as Move[];
    }

    this._put(moves as Move[], this.root, game.tags.Result);
    return this.root;
  }

  toNotation() {
    return this._toNotation(this.root);
  }

  private _createNode(value: Move) {
    return {
      children: [],
      value: value,
      meta: {
        result: {
          white: 0,
          black: 0,
          draw: 0,
        },
      },
    };
  }

  private _getNextNode(currentMove: Move, node: MoveNode) {
    let next = node.children.find(({ value }) =>
      this._isEqual(value, currentMove)
    );
    if (!next) {
      next = this._createNode(currentMove);
      node.children.push(next);
    }
    return next;
  }

  private _isEqual(a: Move, b: Move) {
    return (
      a.moveNumber === b.moveNumber &&
      a.turn.toLowerCase() === b.turn.toLowerCase() &&
      a.notation.notation.toLowerCase() === b.notation.notation.toLowerCase()
    );
  }

  private _put(moves: Move[], node: MoveNode, result: string) {
    if (!moves || !moves.length) {
      return;
    }
    this._updateResult(node, result);
    return this._put(moves.slice(1), this._getNextNode(moves[0], node), result);
  }

  private _toNotation(node: MoveNode) {
    let value: string;

    if (node.value) {
      const ellipses = node.value.turn === 'b' ? '...' : '';
      value =
        `${node.value.moveNumber}. ${ellipses}${node.value.notation.notation} ` +
        `(${node.meta.result.white}/${node.meta.result.black}/${node.meta.result.draw})`;
    } else {
      value = 'root';
    }

    return node.children.reduce(
      (prev, curr) => {
        prev[value].push(this._toNotation(curr));
        return prev;
      },
      { [value]: [] }
    ) as NotationNode;
  }

  private _updateResult(node: MoveNode, result: string) {
    if (node.value) {
      const nodeResult = node.meta.result;
      const resultKey =
        result === '1-0' ? 'white' : result === '0-1' ? 'black' : 'draw';
      nodeResult[resultKey] += 1;
    }
  }
}
