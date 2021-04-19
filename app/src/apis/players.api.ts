import { fetcher, poster } from '.';
import { PlayerInfo } from '../models/player.model';

export async function getPlayer(playerName: string) {
  const player = await fetcher<PlayerInfo>(`player/${playerName}`);
  player.lastUpdated = toDate(player.lastUpdated);
  return player;
}

export async function updatePlayerGames(playerName: string) {
  const player = await poster<PlayerInfo>('player', { playerName });
  player.lastUpdated = toDate(player.lastUpdated);
  return player;
}

function toDate(date: Date | string | undefined) {
  return date ? new Date(date) : undefined;
}
