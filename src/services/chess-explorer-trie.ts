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

    const current = moves[0];
    const next = node.children.find(({ value }) =>
      this._isEqual(value, current)
    );
    this._updateResult(node, result);

    if (next) {
      return this._put(moves.slice(1), next, result);
    }

    const newNode = this._createNode(current);
    node.children.push(newNode);
    return this._put(moves.slice(1), newNode, result);
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
