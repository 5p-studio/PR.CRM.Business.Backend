import morgan from 'morgan';
import { URL } from 'url';
import { Request } from 'express';

const requestFormat = `
[:date[iso]][:method :url HTTP/:http-version] Started for :remote-addr
Parameters: :params
`;

const responseFormat = `
Completed :status in :response-time[1] ms
`;

morgan.token('params', (req: Request, res) => {
  if (req.method === 'GET') {
    const params: { [k: string]: string } = {};
    new URL(
      req.protocol + '://' + req.get('host') + req.originalUrl,
    ).searchParams.forEach((v, k) => (params[k] = v));

    return JSON.stringify(params);
  }
  return JSON.stringify(req.body);
});

export const morganLogger = () => {
  return [morgan(requestFormat, { immediate: true }), morgan(responseFormat)];
};
