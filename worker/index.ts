import { createClient } from "@redis/client";

const fib = async (idx: number): Promise<number> => {
  if (idx < 2) return 1;
  const [res1, res2] = await Promise.all([fib(idx - 1), fib(idx - 2)]);
  return res1 + res2;
};

async function init() {
  const redisClient = createClient({
    socket: {
      host: process.env.REDIS_HOST,
    },
  });
  const sub = redisClient.duplicate();
  sub.on("error", (err) => console.error(err));
  await Promise.all([sub.connect(), redisClient.connect()]);

  // subscribe to fibo channel
  await sub.subscribe("fibo", async (message) => {
    const idx = parseInt(message);
    const fibRes = await fib(idx);
    console.log("setting calculated fib values");
    redisClient.hSet("values", `${idx < 0 ? 0 : idx}`, fibRes);
  });
}

init();
