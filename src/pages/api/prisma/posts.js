import prisma from '../../../../server/db/prisma';

const postHandler = async (req, res) => {
  const body = req.body;
  const method = req.method;

  switch (method) {
    case 'GET': {
      const posts = await prisma.post.findMany();
      return res.status(200).json(posts);
    }
    case 'POST': {
      const text = body.text;
      const createdPost = await prisma.post.create({ data: { text: text } });

      return res.status(200).json(createdPost);
    }
  }
  res.status(200).json('posts');
};

export default postHandler;
