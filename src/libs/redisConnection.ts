import Redis from 'ioredis';

const PORT = 6379;
const HOST = '127.0.0.1';

const opts = {
  createClient () {
    return new Redis(PORT, HOST);
  },
};

export default opts;
