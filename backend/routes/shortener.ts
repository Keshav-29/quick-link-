import { Router } from "../deps.ts";
import { db } from "../db.ts";
import { generateCode } from "../services/shortCode.ts";

export const router = new Router();

router.post("/shorten", async (ctx) => {
  const header = ctx.request.headers.get("X-Intern-Challenge");
  if (!header) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Unauthorized" };
    return;
  }

  const { longUrl } = await ctx.request.body({ type: "json" }).value;

  try {
    const url = new URL(longUrl);

    if (url.hostname.includes("blocked.com")) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Domain blocked" };
      return;
    }

    const code = generateCode();
    db.query("INSERT INTO urls (code, longUrl) VALUES (?, ?)", [code, longUrl]);

    ctx.response.body = {
      shortUrl: `http://localhost:8000/${code}`,
    };
  } catch {
    ctx.response.status = 400;
    ctx.response.body = { error: "Invalid URL" };
  }
});

router.get("/:code", (ctx) => {
  const code = ctx.params.code!;
  const result = [
    ...db.query("SELECT longUrl FROM urls WHERE code = ?", [code]),
  ];

  if (result.length === 0) {
    ctx.response.status = 404;
    ctx.response.body = "Not found";
    return;
  }

  ctx.response.redirect(result[0][0] as string);
});
