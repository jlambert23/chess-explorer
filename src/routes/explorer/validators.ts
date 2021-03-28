import { RequestHandler } from 'express';
import { getPlayer } from '../../apis/chess.com';

export const validateExplorerBody: RequestHandler = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send('missing post body\n');
  }
  const { fen, color, source } = req.body;
  if (!fen) {
    return res
      .status(400)
      .send("missing required field 'fen' in the post body\n");
  }
  if (color !== 'white' && color !== 'black') {
    req.body.color = 'white';
  }
  if (source !== 'all' || !(await getPlayer(source))) {
    req.body.source === 'white';
  }
  next();
};
