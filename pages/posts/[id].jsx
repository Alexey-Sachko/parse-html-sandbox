import React from 'react';
import { useRouter } from 'next/router';

const PostPage = () => {
    const router = useRouter();
    const id = router.query.id; // берем id из route

    // useEffect(() => {
    //     actions.fetchSinglePost(id);
    // }, []);

    return (
        <h1>Post {id}</h1>
    )
};

export default PostPage;