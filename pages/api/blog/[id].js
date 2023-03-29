import dbConnect from "./../../../lib/dbConnect";
import Blog from "../../../models/Blog";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;
  console.log(id);
  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const blog = await Blog.findById(id);
        if (!blog) {
          return res
            .status(400)
            .json({ success: false, message: "No Blog with this id is found" });
        }
        res.status(200).json({ success: true, data: blog });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Methood ${method} Not Allowed`);
      break;
  }
}
