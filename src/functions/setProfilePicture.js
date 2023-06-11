const handleUploadImage = async (uploadImage) => {
  const form = new FormData();

  form.append('images', uploadImage);

  const response = await fetch('/api/images', {
    method: 'POST',
    body: form,
  });

  if (response.ok) {
    return await response.json();
  } else {
    //console.log(await response.text());
    return new Error();
  }

  //return await data;
};

const setProfilePicture = async (uploadImage) => {
  console.log('recieved', uploadImage);

  const image = await handleUploadImage(uploadImage);
  if (image instanceof Error) {
    return;
  }

  const response = await fetch('/api/prisma/profilepicture', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image }),
  });
};

export default setProfilePicture;
