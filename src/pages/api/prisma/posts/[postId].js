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

      const deletedPost = await prisma.post.delete({ where: { id: id } });

      if (deletedPost.image) {
        const parentFolder = deletedPost.image.substr(
          0,
          deletedPost.image.lastIndexOf('/')
        );

        fs.rm('./public/' + deletedPost.image, { recursive: true }, (err) => {
          if (err) {
            console.log(err.message);
            return;
          }
          if (fs.readdirSync('./public/' + parentFolder).length === 0) {
            fs.rm('./public/' + parentFolder, { recursive: true }, (err) => {
              if (err) {
                console.log(err.message);
                return;
              }
            });
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
