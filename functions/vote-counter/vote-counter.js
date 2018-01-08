const redisOpts = {
  host:process.env.COUNTERS_REDIS_SERVICE_HOST,
  port:process.env.COUNTERS_REDIS_SERVICE_PORT,
  auth_pass:process.env.REDIS_PASSWORD
}

const redisDB = require('redis').createClient(redisOpts)

redisDB.on('error', (err) => { console.log(`redisDB error: ${err}`); })

module.exports = (vote) => new Promise((resolve, reject) => {

// only count valid votes
if (!{boot:1, framework:1, reactor:1, riff:1}.hasOwnProperty(vote)) {
  resolve('_boo')
}

redisDB.hincrby("demo:votes", vote, 1, redisDone)

function redisDone(err) {
  if (err) return reject(err);
  resolve(vote);
}

})
