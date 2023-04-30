import { useState } from 'react';

const Feed = () => {

    const [restrictedData, setRestrictedData] = useState('')

    const getRestricted = async () => {

        const response = await fetch('http://localhost:3000/api/testauth');

        if (response.ok) {

            const data = await response.json();
            setRestrictedData(data.content);

        }

    }

    getRestricted();

    return (
        <div>
            <h2>Feed</h2>
            <p>{restrictedData}</p>

        </div>
    )

}

export default Feed;