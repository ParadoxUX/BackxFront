import { Request, Response } from "express";
import { posts } from "./data.js";

export function getAllPosts(req: Request, res: Response) {
  res.json({
    success: true,
    data: { posts },
  });
}

export function getPostById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    res.status(404).json({ success: false, message: "Пост не найден" });
    return;
  }

  res.json({ success: true, data: { post } });
}

export function createPost(req: Request, res: Response) {
  const { content, author } = req.body;

  if (!content || !author) {
    res.status(400).json({ success: false, message: "Нужны content и author" });
    return;
  }

  const newPost = {
    id: String(posts.length + 1),
    content,
    author,
    createdAt: new Date().toISOString(),
  };

  posts.push(newPost);

  res.status(201).json({ success: true, data: { post: newPost } });
}

export function notFound(req: Request, res: Response) {
  res.status(404).json({ success: false, message: "Маршрут не найден" });
}
