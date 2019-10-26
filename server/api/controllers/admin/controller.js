import Stats from '../../../models/stats';
import l from '../../../common/logger';

export class Controller {
  async stats(req, res) {
    try {
      /* TODO: implement limit and pages */
      const dbRes = await Stats.all();
      res.send(dbRes);
    } catch (e) {
      l.error(e);
      res
        .status(500)
        .send({ ok: false, code: 500, description: 'Internal error.' });
    }
  }
}

export default new Controller();