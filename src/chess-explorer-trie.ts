import { Game, Move } from '@mliebelt/pgn-parser';

interface Meta {
  count: number;
  chance: {
    win: number;
    lose: number;
    draw: number;
  };
}

interface MoveNode {
  children: MoveNode[];
  meta: Meta;
  value: Move;
}

interface NotationNode {
  [value: string]: NotationNode[];
}

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

    this._put(moves as Move[], this.root);
    return this.root;
  }

  toNotation() {
    return this._toNotation(this.root);
  }

  private _isEqual(a: Move, b: Move) {
    return (
      a.moveNumber === b.moveNumber &&
      a.turn.toLowerCase() === b.turn.toLowerCase() &&
      a.notation.notation.toLowerCase() === b.notation.notation.toLowerCase()
    );
  }

  private _put(moves: Move[], node: MoveNode) {
    if (!moves || !moves.length) {
      return;
    }

    const current = moves[0];
    const next = node.children.find(({ value }) =>
      this._isEqual(value, current)
    );

    if (next) {
      next.meta.count += 1;
      return this._put(moves.slice(1), next);
    }

    const newNode = {
      children: [],
      value: current,
      meta: {
        count: 1,
        chance: null,
      },
    };
    node.children.push(newNode);
    return this._put(moves.slice(1), newNode);
  }

  private _toNotation(node: MoveNode) {
    let value: string;

    if (node.value) {
      const ellipses = node.value.turn === 'b' ? '...' : '';
      value = `${node.value.moveNumber}. ${ellipses}${node.value.notation.notation} (${node.meta.count})`;
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
}
