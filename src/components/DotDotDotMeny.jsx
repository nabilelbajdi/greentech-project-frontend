import Link from 'next/link';
import { useEffect, useRef } from 'react';

const DotDotDotMeny = ({ menuContent, setMenuVisible, buttonRef, comment }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <ul
      ref={menuRef}
      className={`flex flex-col gap-0.5 absolute ${
        comment ? ' -left-24 bottom-2' : '-bottom-20 right-0'
      } text-gray-300 z-50 min-w-[100px] py-0.5 bg-slate-500 rounded`}
    >
      {menuContent.map((item, index) => {
        const classNames = `w-full hover:text-chas-primary border-b border-slate-400/50 px-2 py-0.5 last:border-none`;

        if (item.link) {
          return (
            <li key={`menuItem#${index}`} className={classNames}>
              <Link className='w-full' href={item.link}>
                <p>{item.title}</p>
              </Link>
            </li>
          );
        } else {
          return (
            <li key={`menuItem#${index}`} className={classNames}>
              <button
                onClick={() => {
                  item.callback();
                  setMenuVisible(false);
                }}
              >
                {item.title}
              </button>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default DotDotDotMeny;
