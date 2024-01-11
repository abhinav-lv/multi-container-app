import express from "express";
import { createClient } from "@redis/client";

async function init() {
  const redisClient = createClient({
    socket: {
      host: process.env.REDIS_HOST,
    },
  });
  const pub = redisClient.duplicate();
  pub.on("error", (err) => console.error(err));
  await Promise.all([pub.connect(), redisClient.connect()]);

  const app = express();
  app.use(express.json());

  app.get("/api", (_, res) =>
    res.json({ service: "Express Server", route: "root" })
  );

  app.post("/api/index", async (req, res) => {
    const { index }: { index: number } = req.body;
    await pub.publish("fibo", `${index}`);
    console.log("published index: ", index);
    res.json({
      service: "Express Server",
      route: "/index",
      method: "POST",
      message: "Successful",
    });
  });

  app.get("/api/calculated", async (_, res) => {
    const results = await redisClient.hGetAll("values");
    res.json({ service: "Express Server", results });
  });

  const PORT = 3000;
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
}

init();
