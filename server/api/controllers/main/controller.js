import axios from 'axios';
import l from '../../../common/logger'
import Stat from '../../../models/stats';

const YOUTUBE_SEARCH = 'https://www.googleapis.com/youtube/v3/search';
const opts = {
  parts: 'id,snippet',
  maxResults: 20,
  videoEmbeddable: 'true',
  type: 'video',
};

export class Controller {

  async what(req, res, fn) {
    try {
      await fn(req, res);
    } catch (e) {
      l.error(e);
      res
          .status(500)
          .send({ description: 'Internal error.' });
    }
  }

  async search(req, res) {
    const { q } = req.query;

    l.debug(YOUTUBE_SEARCH)

    const googleRes = await axios.get(YOUTUBE_SEARCH, {
      params: { ...opts, q}
    });

    res.send(googleRes);
  }

  async stats(req, res) {
    const uid = req.params.uid;
    const { videoId, searchString, videoDuration } = req.body;

    const resDb = await Stat.insertOne({
      uid, videoId, searchString, videoDuration
    });

    res.send({ id: resDb._id });

  }
}

export default new Controller();
