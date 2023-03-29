import dbConnect from "./../../../lib/dbConnect";
import Blog from "../../../models/Blog";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const blogs = await Blog.find({});
        res.status(200).json({ success: true, data: blogs });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const newBlog = await Blog.create(req.body);
        res.status(201).json({ success: true, data: newBlog });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Methood ${method} Not Allowed`);
      break;
  }
}
