import Image from 'next/image';
import Posts from './Posts';
import { useState } from 'react';
import { useRouter } from 'next/router';
import ModalCreator from './ModalCreator';
import Item from './Item';

const Group = ({ group }) => {
  const [posts, setPosts] = useState(group.posts);
  const [edit, setEdit] = useState(false);
  const { push } = useRouter();
  const imagePlaceholder =
    'https://img.freepik.com/free-vector/business-team-putting-together-jigsaw-puzzle-isolated-flat-vector-illustration-cartoon-partners-working-connection-teamwork-partnership-cooperation-concept_74855-9814.jpg?w=1800&t=st=1686319957~exp=1686320557~hmac=a3a08594d68004e7f3317def23ca732ac9970dcc11d5a64c9381f8a07a49bb37';

  return (
    <section className='relative p-4 w-full bg-gray-100 rounded-xl'>
      <Item
        item={group}
        btnTitle='Gå med i grupp'
        posts={posts}
        push={push}
        setEdit={setEdit}
        setPosts={setPosts}
        imagePlaceholder={imagePlaceholder}
        itemType='group'
      />
      {edit && (
        <ModalCreator
          setNewItem={setEdit}
          typeOfItem='group'
          showTime={true}
          showEndTime={false}
          item={group}
          edit={true}
        />
      )}
    </section>
  );
};

export default Group;
