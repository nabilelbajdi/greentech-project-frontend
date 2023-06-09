export const handleDelete = async (item, push, type) => {
  const response = await fetch(`/api/prisma/${type}s/${item.id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status !== 200) {
    console.log('something went wrong');
    //add error banner
  } else {
    const deletedEvent = await response.json();
    push(`/${type}s`);
  }
};

export const handleEdit = async (item, setEdit, type) => {
  const response = await fetch(`/api/prisma/${type}s/${item.id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status !== 200) {
    console.log('something went wrong');
    //add error banner
  } else {
    const eventInEdit = await response.json();
    setEdit(true);
  }
};
