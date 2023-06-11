import getFriendRequestsProps from '@/utils/getFriendRequestsProps';
import Button from '@/components/Button';
import confirmFriendRequest from '@/functions/confirmFriendRequest';
import Link from 'next/link';
import { useRouter } from 'next/router';
import denyFriendRequest from '@/functions/denyFriendRequest';
import cancelFriendRequest from '@/functions/cancelFriendRequest';
export const getServerSideProps = getFriendRequestsProps;

const MyFriendsRequests = ({ friendRequests }) => {
    const router = useRouter();

    return (
        <>
            <div className='relative rounded-2xl bg-gray-100 p-4 mx-8 mt-8 shadow-md'>
                <h2 className='border-b border-gray-300 py-2 text-lg font-se'>Mottagna vänförfrågningar</h2>
                <ul className='flex flex-col gap-2 py-2'>
                    {friendRequests.friendRequests.map((request, index) => {
                        return (
                            <li
                                className='flex justify-between items-center rounded-xl bg-gray-200 shadow-md p-2'
                                key={`friendsRequest${index}`}>
                                <div className='font-semibold'><Link href={`/${request.userPath}`}>{request.firstName} {request.lastName}</Link></div>
                                <div className='flex gap-2'>
                                    <Button
                                        title='Bekräfta'
                                        callback={() => {
                                            confirmFriendRequest(request.id, () => { router.push('/myfriendrequests') });

                                        }}
                                    />
                                    <Button
                                        title='Neka'
                                        callback={() => {
                                            denyFriendRequest(request.id, () => { router.push('/myfriendrequests') });

                                        }}
                                    />
                                </div>
                            </li>
                        )
                    })}
                </ul>

            </div>
            <div className='relative rounded-2xl bg-gray-100 p-4 mx-8 mt-8 shadow-md'>
                <h2 className='border-b border-gray-300 py-2 text-lg'>Skickade vänförfrågningar</h2>
                <ul className='flex flex-col gap-2 py-2'>
                    {friendRequests.friendRequestsSent.map((request, index) => {

                        return (
                            <li
                                className='flex justify-between items-center rounded-xl bg-gray-200 shadow-md p-2'
                                key={`friendsRequest${index}`}>
                                <div className='font-semibold'><Link href={`/${request.userPath}`}>{request.firstName} {request.lastName}</Link></div>
                                <div className='flex gap-2'>
                                    <Button
                                        title='Avbryt'
                                        callback={() => {
                                            cancelFriendRequest(request.id, () => { router.push('/myfriendrequests') });

                                        }}
                                    />
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    );
};

export default MyFriendsRequests;
