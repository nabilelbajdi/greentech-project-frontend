import prisma from '../../../../../server/db/prisma';

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

      return res.status(200).json(deletedPost);
    }
    //Add PUT request here later to change a single post
  }
  res.status(200).json('posts');
};

export default postQueryHandler;
