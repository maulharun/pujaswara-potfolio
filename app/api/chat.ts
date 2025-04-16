import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message } = req.body;

  res.status(200).json({
    reply: `Kamu mengetik: "${message}", Ini jawaban dari chatbot 🤖`,
  });
}
