import { Application } from "./deps.ts";
import { router } from "./routes/shortener.ts";

const app = new Application();

/* 🔓 CORS Middleware */
app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Intern-Challenge"
  );
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  );

  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 204;
    return;
  }

  await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Backend running on http://localhost:8000");
await app.listen({ port: 8000 });
