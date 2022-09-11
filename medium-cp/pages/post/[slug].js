import ArticleMain from "../../components/ArticleMain";
import ReadersNav from "../../components/ReadersNav";
import Recommendations from "../../components/Recommendations";
import { useContext, useEffect, useState } from "react";
import { MediumContext } from "../../context/MediumContext";
import { useRouter } from "next/router";

const styles = {
    wrapper: "bg-white text-black mx-auto",
    content: "flex",
};

const Post = () => {
    const { posts, users } = useContext(MediumContext);
    const router = useRouter();
    const [post, setPost] = useState([]);
    const [author, setAuthor] = useState([]);

    useEffect(() => {
        //guard clause
        if (posts.length === 0 || users.length === 0) {
            return;
        }

        setPost(posts.find((post) => post.id === router.query.slug));
        setAuthor(users.find((user) => user.id === post.data?.author));
    }, [post]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <ReadersNav />
                <ArticleMain post={post} author={author} />
                <Recommendations author={author} />
            </div>
        </div>
    );
};

export default Post;
