import Sidebar from "@/components/Sidebar";
import ProfileFeed from "@/components/ProfileFeed";
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';

const getProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);
    const prisma = new PrismaClient()
    const posts = await prisma.post.findMany(


    )
  
    if (!session) {
      return {
        redirect: {
          destination: '/api/auth/signin',
          permanent: false,
        },
      };
    }
  
    return {
      props: {
        session,
        posts: JSON.parse(JSON.stringify(posts)),
      },
    };
  };
  export const getServerSideProps = getProps;

  const Profile = ({posts}) => {
    return (  
        <div className="flex">
        <Sidebar/>
        <ProfileFeed/>
        </div>
    );
}

 
export default Profile;