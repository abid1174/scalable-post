import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator'
import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";
import kafkaConfig from './config/kafka.config.ts';
import { initiateKafka } from './services/kafka.service.ts';

const app = new Hono()
initiateKafka()

const createPostSchema = z.object({
  title: z.string(),
  content: z.string()
})

app.post('/create-post', zValidator("json", createPostSchema), async (ctx) => {
  const { title, content } = ctx.req.valid("json");
  
  try {
    await kafkaConfig.sendToTopic('post', JSON.stringify({ title, content }));
    return ctx.json({ message: "Post created." });
  } catch (error) {
    console.error("Error sending message: ", error);
    ctx.json({ error: "Error sending message" }, 500);
  }
})

Deno.serve(app.fetch)
