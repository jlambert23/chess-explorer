import { useEffect, useState } from 'react';

import { poster } from '.';
import { ExplorerData } from '../models/explorer.model';

export const useExplorer = (): [
  ExplorerData,
  (explorer: ExplorerData) => Promise<void>
] => {
  const [explorer, _setExplorer] = useState({} as ExplorerData);

  useEffect(() => {
    async function init() {
      const res = await poster<ExplorerData>('explorer', { fen: 'start' });
      _setExplorer(res);
    }
    init();
  }, []);

  function setExplorer(explorer: ExplorerData) {
    return new Promise<void>(async (resolve) => {
      _setExplorer(explorer);
      const res = await poster<ExplorerData>('explorer', explorer);
      _setExplorer(res);
      resolve();
    });
  }

  return [explorer, setExplorer];
};
