import axios from 'axios';
import l from '../../../common/logger';
import Stat from '../../../models/stats';
import User from '../../../models/users';
//import 'axios-debug-log';

const YOUTUBE_SEARCH = 'https://www.googleapis.com/youtube/v3/search';
const opts = {
  part: 'id,snippet',
  maxResults: 20,
  videoEmbeddable: 'true',
  type: 'video',
  key: process.env.GOOGLE_API_KEY,
};

export class Controller {
  async what(req, res, fn) {
    try {
      await fn(req, res);
    } catch (e) {
      l.error(e);
      res.status(500).send({ description: 'Internal error.' });
    }
  }

  async search(req, res) {
    const { q } = req.query;

    l.debug(`Opts ${JSON.stringify({ ...opts, q })}`);

    const googleRes = await axios.get(YOUTUBE_SEARCH, {
      params: { ...opts, q },
      headers: { Accept: 'application/json' },
    });

    //l.debug(googleRes.data);
    res.send(googleRes.data);
  }

  async stats(req, res) {
    const uid = req.user._id;
    l.debug(`Stats for uid=${uid}`);
    const { videoId, searchString, videoDuration, thumbUrl } = req.body;

    const resDb = await Stat.create({
      uid,
      videoId,
      searchString,
      videoDuration,
      thumbUrl,
    });

    res.send({ _id: resDb._id });
  }

  async setAdmin(req, res) {
    const { _id } = req.user;
    l.warn(`Setting admin for uid=${req.user.email}`);

    const resDb = await User.updateOne({ _id }, { isAdmin: true });

    res.send({ _id: resDb._id });
  }
}

export default new Controller();
