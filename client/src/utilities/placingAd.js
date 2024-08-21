const postContent_Element = document.getElementsByClassName("post-content");

if (postContent_Element.length > 0) {
  const ImageElement = postContent_Element[0].querySelector("p img");
  if (ImageElement) {
    console.log(ImageElement);
  } else {
    console.log("No image found within the first post-content element.");
  }
} else {
  console.log("No post-content elements found.");
}
