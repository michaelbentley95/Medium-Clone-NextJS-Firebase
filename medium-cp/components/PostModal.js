import { useContext, useState } from "react";
import { MediumContext } from "../context/MediumContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const styles = {
    wrapper:
        "w-[70rem] h-[50rem] flex flex-col justify-start items-center gap-[1rem] p-[1rem] font-mediumSerif overflow-scroll",
    title: "my-[2rem] font-bold text-3xl",
    smallField: "w-full flex justify-between gap-[1rem]",
    fieldTitle: "flex-1 text-end",
    inputContainer: "flex-[5] h-min border-2 border-[#787878]",
    inputField: "w-full border-0 outline-none bg-transparent",
    accentedButton: "bg-black text-white py-2 px-4 rounded-full",
    dummy: "",
};

const PostModal = () => {
    const { currentUser } = useContext(MediumContext);

    const [title, setTitle] = useState("");
    const [brief, setBrief] = useState("");
    const [category, setCategory] = useState("");
    const [postLength, setPostLength] = useState("");
    const [bannerImage, setBannerImage] = useState("");
    const [body, setBody] = useState("");

    const addPostToFirebase = async (event) => {
        event.preventDefault();

        await addDoc(collection(db, "articles"), {
            bannerImgae: bannerImage,
            body: body,
            category: category,
            brief: brief,
            postedOn: serverTimestamp(),
            postLength: Number(postLength),
            title: title,
            author: currentUser.email,
        });
    };

    const fields = [
        {
            fieldTitle: "Title",
            value: title,
            onChangeEvent: setTitle,
        },
        {
            fieldTitle: "Brief",
            value: brief,
            onChangeEvent: setBrief,
        },
        {
            fieldTitle: "Banner Image Url",
            value: bannerImage,
            onChangeEvent: setBannerImage,
        },
        {
            fieldTitle: "Category",
            value: category,
            onChangeEvent: setCategory,
        },
        {
            fieldTitle: "Estimated Read Length (in minutes)",
            value: postLength,
            onChangeEvent: setPostLength,
        },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Create a New Post</div>
            {fields.map((field) => (
                <div className={styles.smallField}>
                    <span className={styles.fieldTitle}>{field.fieldTitle}</span>
                    <span className={styles.inputContainer}>
                        <input
                            className={styles.inputField}
                            type="text"
                            value={field.value}
                            onChange={(event) => field.onChangeEvent(event.target.value)}
                        />
                    </span>
                </div>
            ))}
            <div className={styles.smallField}>
                <span className={styles.fieldTitle}>Article Text</span>
                <span className={styles.inputContainer}>
                    <textarea
                        className={styles.inputField}
                        type="text"
                        rows={12}
                        value={body}
                        onChange={(event) => setBody(event.target.value)}
                    />
                </span>
            </div>
            <button className={styles.accentedButton} onClick={addPostToFirebase}>
                Submit
            </button>
        </div>
    );
};

export default PostModal;
