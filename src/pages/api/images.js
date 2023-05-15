import prisma from '../../../server/db/prisma';
import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';
import { customAlphabet } from 'nanoid';
import nextConnect from 'next-connect';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

// Multer needs to recieve the post request as "FormData" and not Json.

// Using nextConnect for the ability to apply middleware.
const apiRoute = nextConnect();

// Setting multer to store the incoming image in memory
const storage = multer.memoryStorage();

// Setting nanoid to not use "_" since it didn't seem to play nice with nextjs in file paths
const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-';
const nanoid = customAlphabet(alphabet);

// Setting multer to filter out anything that isn't of image/____ minetype (image/jpg, image/png).
const fileFilter = (req, file, cb) => {
  const filetype = file.mimetype.split('/')[0];
  //console.log(file.mimetype);
  if (filetype === 'image') {
    cb(null, true);
  } else {
    cb(new Error('File is not of the correct type'), false);
  }
};

// Setting up multer with the previous options + a filesize limit, and appying it as middleware.
const upload = multer({ storage, fileFilter, limits: { fileSize: 1000000 } });
//apiRoute.use(upload.single('image'));

apiRoute.use(upload.array('images', 10));

apiRoute.post(async (req, res) => {
  // Getting user from database
  /* const user = await prisma.user.findUnique({
    where: { email: req.body.userEmail },
  }); */
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  //console.log(req.files);

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  let images = [];

  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      if (!fs.existsSync(`public/uploads`)) {
        fs.mkdirSync(`public/uploads`);
      }

      // Making user folder if it doesn't exist
      if (!fs.existsSync(`public/uploads/${user.id}`)) {
        fs.mkdirSync(`public/uploads/${user.id}`);
      }

      // Making a two digit subfolder if it doesn't already exist.
      const subfolder = nanoid(2);
      if (!fs.existsSync(`public/uploads/${user.id}/${subfolder}`)) {
        fs.mkdirSync(`public/uploads/${user.id}/${subfolder}`);
      }

      // Concatenate the save destination path for the image
      const path = `/uploads/${user.id}/${subfolder}/${nanoid(10)}${
        req.files[i].originalname.split('.')[0]
      }.webp`;

      // Using sharp to slightly compress the image + make it a webp. And outputting the file to the file system.
      // Will probably have to play with setting here to make sure images still look good.
      await sharp(req.files[i].buffer)
        .webp({ quality: 80 })
        .toFile(`./public/${path}`);

      const createdImage = await prisma.Image.create({
        data: { url: path, author_id: user.id },
      });

      images.push(createdImage.id);
    }

    await res.status(200).json(images);
  }
});

export default apiRoute;

// Stopping nextjs built-in bodyparser.

export const config = {
  api: {
    bodyParser: false,
  },
};
