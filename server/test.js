import './common/env'
import Server from './common/server';
import routes from './routes';
import l from './common/logger';

export default function app() {
    l.info(`Starting app on port ${process.env.PORT}...`);
    return new Server()
        .router(routes)
        .listen(process.env.PORT) //this return promise
}