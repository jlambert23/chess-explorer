declare module '@mliebelt/pgn-parser' {
  interface Game {
    tags: Tags;
    moves: [...Move[], string];
  }

  interface Move {
    turn: string;
    moveNumber: number;
    notation: {
      fig: any;
      strike: any;
      col: string;
      row: string;
      check: any;
      notation: string;
      promotion: any;
    };
    commentBefore: any;
    commentAfter: any;
    commentMove: any;
    variations: any[];
    nag: any;
    commentDiag: {
      clock: {
        type: string;
        value: string;
      };
      text: any;
    };
  }

  interface Tags {
    Event: string;
    Site: string;
    Date: string;
    Round: string;
    White: string;
    Black: string;
    Result: string;
    CurrentPosition: string;
    Timezone: string;
    ECO: string;
    ECOUrl: string;
    UTCDate: string;
    UTCTime: string;
    WhiteELO: number;
    BlackELO: number;
    TimeControl: string;
    Termination: string;
    StartTime: string;
    EndDate: string;
    EndTime: string;
    Link: string;
  }

  function parse(input: string, options: { startRule: 'game' }): Game;
  function parse(input: string, options: { startRule: 'games' }): Game[];
  function parse(input: string, options: { startRule: 'pgn' }): Move[];
  function parse(input: string, options: { startRule: 'tags' }): Tags;
}
