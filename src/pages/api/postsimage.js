import nextConnect from 'next-connect';
import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';
/* import { nanoid } from 'nanoid'; */
import { customAlphabet } from 'nanoid';
import prisma from '../../../server/db/prisma';

const apiRoute = nextConnect();

const storage = multer.memoryStorage();

const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-';

const nanoid = customAlphabet(alphabet);

const fileFilter = (req, file, cb) => {
  const filetype = file.mimetype.split('/')[0];

  if (filetype === 'image') {
    cb(null, true);
  } else {
    cb(new Error('File is not of the correct type'), false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 500000 } });
apiRoute.use(upload.single('image'));

apiRoute.post(async (req, res) => {
  if (req.file) {
    const subfolder = nanoid(2);
    if (!fs.existsSync(`public/uploads/${subfolder}`)) {
      fs.mkdirSync(`public/uploads/${subfolder}`);
    }

    const path = `/uploads/${subfolder}/${nanoid(10)}${
      req.file.originalname.split('.')[0]
    }.webp`;

    console.log(`./public${path}`);

    sharp(req.file.buffer).webp({ quality: 80 }).toFile(`./public/${path}`);
    /* res.json({
    status: 'success',
    url: path,
    body: req.body.text,
  }); */
    console.log('before');
    const createdPost = await prisma.post.create({
      data: { text: req.body.text, image: path },
    });
    await res.status(200).json(createdPost);
  } else {
    const createdPost = await prisma.post.create({
      data: { text: req.body.text },
    });
    await res.status(200).json(createdPost);
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
