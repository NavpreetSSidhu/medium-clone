import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { bufferToHex } from "./utils/authUtils";
import {
  signInInput,
  signUpInput,
  updatePostInput,
  postInput,
} from "@nav_pb03/medium-common";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

app.use("/api/*", cors());

app.use("/api/v1/blog/*", async (c, next) => {
  const jwt = c.req.header("Authorization") || "";
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  const token = jwt.split(" ")[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  //@ts-ignore
  c.set("userId", payload.id);
  await next();
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/v1/signup", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = signUpInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({ error: "wrong inputs" });
    }
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(body.password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", passwordBuffer);
    const hashedPassword = bufferToHex(hashBuffer);
    const user = await prisma.user.create({
      data: {
        emal: body.email,
        password: hashedPassword,
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    c.status(200);
    return c.json({ jwt });
  } catch (error) {
    c.status(403);
    return c.json({ error: "error while signing up" });
  }
});

app.post("/api/v1/signin", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = signInInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({ error: "wrong inputs" });
    }
    const user = await prisma.user.findUnique({
      where: {
        emal: body.email,
      },
    });
    if (!user) {
      c.status(404);
      return c.json({ error: "user does not exists" });
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    c.status(200);
    return c.json({ jwt });
  } catch (error) {
    c.status(403);
    return c.json({ error: "error while signing in" });
  }
});

app.get("/api/v1/blog/:id", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const id = c.req.param("id");
    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!blog) {
      c.status(404);
      return c.json({ error: "no blog found with this id" });
    }
    c.status(200);
    return c.json({ blog });
  } catch (error) {
    c.status(403);
    return c.json({ error: "error while fetching" });
  }
});

app.get("/api/v1/blogs", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    c.status(200);
    return c.json({ blogs });
  } catch (error) {
    c.status(403);
    return c.json({ error: "error while fetching" });
  }
});

app.post("/api/v1/blog", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = postInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({ error: "wrong inputs" });
    }
    const authorId = c.get("userId");
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
      },
    });
    c.status(200);
    return c.json({ id: blog.id });
  } catch (error) {
    c.status(403);
    return c.json({ error: "error while posting blog" });
  }
});

app.put("/api/v1/blog", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = updatePostInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({ error: "wrong inputs" });
    }
    const blog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    c.status(200);
    return c.json({ id: blog.id, message: "updated successfully" });
  } catch (error) {
    c.status(403);
    return c.json({ error: "error while updating blog" });
  }
});

export default app;
