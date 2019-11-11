import Stats from '../../../models/stats';
import l from '../../../common/logger';

export class Controller {
  async stats(req, res) {
    l.debug('Showing stats');
    /* TODO: implement limit and pages */
    const dbRes = await Stats.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'uid',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
    ]);

    const dbResFlat = dbRes.map(row => {
      const { name, email } = row.user;
      //console.log(JSON.stringify(row.user))
      const { searchString, videoId, videoDuration, thumbUrl } = row;
      return {
        date: row.timestamp,
        name,
        email,
        searchString,
        videoId,
        videoDuration,
        thumbUrl,
      };
    });

    res.send(dbResFlat);
  }
}

export default new Controller();
