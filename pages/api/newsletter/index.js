import dbConnect from "./../../../lib/dbConnect";
import NewsLetter from "../../../models/NewsLetter";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newNewsLetter = await NewsLetter.create(req.body);
        res.status(201).json({ success: true, data: newNewsLetter });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
