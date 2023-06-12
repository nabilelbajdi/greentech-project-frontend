const getImage = (type) => {
  const image = {
    group: '/group-pre.jpg',
    event: '/event-pre.jpg',
    donation: '/donation-pre.jpg',
  };

  return image[type];
};

export default getImage;
