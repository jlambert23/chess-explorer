import PlayerModel from '../models/player.model';

export function findPlayer(
  playerName: string,
  options?: { populateRef: boolean }
) {
  let query = PlayerModel.findOne({ playerName });
  if (options?.populateRef) {
    query = query.populate('games');
  }
  return query;
}

export function findPlayerNames() {
  return PlayerModel.find({}, 'playerName');
}

export function playerExists(playerName: string) {
  return PlayerModel.exists({ playerName });
}
