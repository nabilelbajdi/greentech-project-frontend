import prisma from '../../../../server/db/prisma';
import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';
import { customAlphabet } from 'nanoid';
import nextConnect from 'next-connect';

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
  console.log(file.mimetype);
  if (filetype === 'image') {
    cb(null, true);
  } else {
    cb(new Error('File is not of the correct type'), false);
  }
};

// Setting up multer with the previous options + a filesize limit, and appying it as middleware.
const upload = multer({ storage, fileFilter, limits: { fileSize: 500000 } });
apiRoute.use(upload.single('image'));

apiRoute.post(async (req, res) => {
  // Getting user from database
  const user = await prisma.user.findUnique({
    where: { email: req.body.userEmail },
  });

  if (req.file) {
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
      req.file.originalname.split('.')[0]
    }.webp`;

    // Using sharp to slightly compress the image + make it a webp. And outputting the file to the file system.
    await sharp(req.file.buffer)
      .webp({ quality: 80 })
      .toFile(`./public/${path}`);

    // Creating post in DB and returning it.
    const createdPost = await prisma.post.create({
      data: { text: req.body.text, image: path, author_id: user.id },
    });
    await res.status(200).json(createdPost);
  } else {
    // Creating post in DB and returning it.
    const createdPost = await prisma.post.create({
      data: { text: req.body.text, author_id: user.id },
    });
    await res.status(200).json(createdPost);
  }
});

apiRoute.get(async (req, res) => {
  const posts = await prisma.post.findMany();
  return res.status(200).json(posts);
});

export default apiRoute;

// Stopping nextjs built-in bodyparser.

export const config = {
  api: {
    bodyParser: false,
  },
};
