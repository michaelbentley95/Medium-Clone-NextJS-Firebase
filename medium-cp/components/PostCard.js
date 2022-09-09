import Image from "next/image";
import Logo from "../static/logo.png";
import { FiBookmark } from "react-icons/fi";

const styles = {
    wrapper: "flex max-w-[46rem] h-[10rem] items-center cursor-pointer",
    authorContainer: "flex gap-[1.4rem]",
    authorImage: "",
    authorName: "font-semibold",
    authorImageContainer:
        "grid place-items-center tounded-full overflow-hidden h-[1.4rem] w-[1.4rem]",
    title: "font-bold text-2xl",
    postDetails: "flex-[2.5] flex flex-col",
    briefing: "text-[#787878]",
    detailsContainer: "flex items-center justify-between text-[#787878]",
    articleDetails: "my-2 text-[.8rem]",
    category: "bg-[#F2F3F2] p-1 rounded-full",
    bookmarkContainer: "cursor-pointer",
    thumbnailContainer: "",
};

const PostCard = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.postDetails}>
                <div className={styles.authorContainer}>
                    <div className={styles.authorImageContainer}>
                        <Image
                            src={Logo}
                            className={styles.authorImage}
                            width={40}
                            height={40}
                        />
                    </div>
                    <div className={styles.authorName}>Michael Bentley</div>
                </div>
                <h1 className={styles.title}>
                    7 Free Tools That Will Make You More Productive In 2022
                </h1>
                <div className={styles.briefing}>
                    Productivity is a skill that can be learned.
                </div>
                <div className={styles.detailsContainer}>
                    <span className={styles.articleDetails}>
                        Jun 15 · 5 min read ·{" "}
                        <span className={styles.category}>productivity</span>
                    </span>
                    <span className={styles.bookmarkContainer}>
                        <FiBookmark className="h-5 w-5" />
                    </span>
                </div>
            </div>
            <div className={styles.thumbnailContainer}>
                <Image
                    src={Logo}
                    className={styles.authorImage}
                    width={100}
                    height={100}
                />
            </div>
        </div>
    );
};

export default PostCard;
