import prisma from '../../../../../server/db/prisma';
import fs from 'fs';

const postQueryHandler = async (req, res) => {
  const body = req.body;
  const method = req.method;

  switch (method) {
    case 'GET': {
      const id = req.query;
      return res.status(200).json(id);
    }
    case 'DELETE': {
      const id = req.query.postId;

      const { image } = await prisma.post.findUnique({
        where: {
          id: id,
        },
      });

      const deletedPost = await prisma.post.delete({ where: { id: id } });

      if (image) {
        console.log(image);
        fs.rm('./public/' + image, { recursive: true }, (err) => {
          if (err) {
            console.log(err.message);
            return;
          }
        });
      }

      return res.status(200).json(deletedPost);
    }
    //Add PUT request here later to change a single post
  }
  res.status(200).json('posts');
};

export default postQueryHandler;
