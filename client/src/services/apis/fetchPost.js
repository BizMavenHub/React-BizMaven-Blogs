import { useSelector } from "react-redux";

export default async function fetchPost() {
  const { currentUser } = useSelector((state) => state.user);

  try {
    const res = await fetch(
      import.meta.env.VITE_API_BASE_URL +
        "/api/post/get-post?userId=" +
        currentUser._id
    );

    const data = await res.json();
    let handlePostsArray = [];

    if (response.ok) {
      handlePostsArray.push(data.posts);
      return handlePostsArray;
    }
  } catch (error) {
    console.log(error);
  }
}
