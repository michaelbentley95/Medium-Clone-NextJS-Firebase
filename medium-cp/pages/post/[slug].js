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
                <div>Main article will go here</div>
                <Recommendations />
            </div>
        </div>
    );
};

export default Post;
