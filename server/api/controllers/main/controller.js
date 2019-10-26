import axios from 'axios';
import l from '../../../common/logger'

const YOUTUBE_SEARCH = 'https://www.googleapis.com/youtube/v3/search';
const opts = {
  parts: 'id,snippet',
  maxResults: 20,
  videoEmbeddable: 'true',
  type: 'video',
};

export class Controller {
  async search(req, res) {
    const { q } = req.query;
    try {
      const googleRes = await axios.get(YOUTUBE_SEARCH, {
        params: { ...opts, q}
      });

      res.send(googleRes);

    } catch (e) {
      l.error(e);
      res.status(500).send({description: "Internal error."});
    }
  }
}

export default new Controller();
