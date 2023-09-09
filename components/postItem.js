import Date from "./date";
import { parseISO } from "date-fns";
import React from "react";
import toast from './../components/Toast/toast'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function PostItem({ post }) {  
  // const notify = React.useCallback((type, message) => {
  //   toast({ type, message });
  // }, []);
  /* function calculateReadTime(articleText, wordsPerMinute = 200) {
    // Count the number of words in the article
    const words = articleText.match(/\w+/g);
    const numWords = words ? words.length : 0;
    
    // Calculate reading time in minutes
    const readTimeMinutes = Math.round(numWords / wordsPerMinute);
    
    return readTimeMinutes;
  }    
  const readTime = calculateReadTime(article); */
  return (      
    <>
      {/* <ToastContainer
        position="top-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        pauseOnVisibilityChange
        closeOnClick
        pauseOnHover
      /> */}
    <a className="blog-card" href={"/guide/" + post.slug}>      
        <Date date={parseISO(post.date)} />
        <div className="title">{post.title}
        </div>
    </a>
    {/* <div onClick={() => notify("success","sucess")} className="message">
        <p>Success Message</p>
    </div>
    <button onClick={() => notify("error", "Error!")} className="message">click error
      </button> */}
    </>
  );

}
