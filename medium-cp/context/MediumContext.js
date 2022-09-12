import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db, auth, provider } from "../firebase";

const MediumContext = createContext();
const MediumProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const querySnapshot = await getDocs(collection(db, "users"));

            setUsers(
                querySnapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        data: {
                            ...doc.data(),
                        },
                    };
                })
            );
        };

        getUsers();
    }, []);

    useEffect(() => {
        const getPosts = async () => {
            const querySnapshot = await getDocs(collection(db, "articles"));

            setPosts(
                querySnapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        data: {
                            body: doc.data().body,
                            brief: doc.data().brief,
                            category: doc.data().category,
                            postLength: doc.data().postLength,
                            bannerImage: doc.data().bannerImage,
                            title: doc.data().title,
                            //comments: doc.data().comments,
                            postedOn: doc.data().postedOn.toDate(),
                            author: doc.data().author,
                        },
                    };
                })
            );
        };

        getPosts();
    }, []);

    onAuthStateChanged(auth, (newUser) => {
        setCurrentUser(newUser);
    });

    const addUserToFirebase = async (user) => {
        await setDoc(doc(db, "users", user.email), {
            email: user.email,
            name: user.displayName,
            imageUrl: user.photoURL,
            followerCount: 0,
        });
    };

    const signInWithGoogle = async () => {
        const userData = await signInWithPopup(auth, provider);
        const user = userData.user;
        setCurrentUser(user);
        addUserToFirebase(user);
    };

    const signOutFromFirebase = async () => {
        await signOut(auth);
        setCurrentUser(null);
    };

    return (
        <MediumContext.Provider value={{ posts, users, signInWithGoogle, signOutFromFirebase, currentUser }}>
            {children}
        </MediumContext.Provider>
    );
};

export { MediumContext, MediumProvider };
