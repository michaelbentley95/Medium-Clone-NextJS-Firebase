import ArticleMain from "../../components/ArticleMain";
import ReadersNav from "../../components/ReadersNav";
import Recommendations from "../../components/Recommendations";

const styles = {
    wrapper: "bg-white text-black mx-auto",
    content: "flex",
};

const Post = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <ReadersNav />
                <ArticleMain />
                <Recommendations />
            </div>
        </div>
    );
};

export default Post;
