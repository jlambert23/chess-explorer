import { useEffect, useState } from 'react';

import { poster } from '.';
import { ExplorerData } from '../models/explorer.model';

export const useExplorer = (): [
  ExplorerData,
  (explorer: ExplorerData) => void
] => {
  const [explorer, _setExplorer] = useState({} as ExplorerData);

  useEffect(() => {
    async function init() {
      const initExplorer: ExplorerData = {
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        color: 'white',
        source: 'all',
      };
      const res = await poster<ExplorerData>('explorer', initExplorer);
      _setExplorer(res);
    }
    init();
  }, []);

  async function setExplorer(explorer: ExplorerData) {
    _setExplorer(explorer);
    const res = await poster<ExplorerData>('explorer', explorer);
    _setExplorer(res);
  }

  return [explorer, setExplorer];
};
