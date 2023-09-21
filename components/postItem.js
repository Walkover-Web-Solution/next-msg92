import Date from "./date";
import { parseISO } from "date-fns";
import React from "react";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
export default function PostItem({ post }) {  
  const[content, setContent] =useState(true);
  /* function calculateReadTime(articleText, wordsPerMinute = 200) {
    // Count the number of words in the article
    const words = articleText.match(/\w+/g);
    const numWords = words ? words.length : 0;
    
    // Calculate reading time in minutes
    const readTimeMinutes = Math.round(numWords / wordsPerMinute);
    
    return readTimeMinutes;
  }    
  const readTime = calculateReadTime(article); */
//   function showToaster(message, type) {
//     toast.dismiss();
//     toast(message, { type: type });
// }
// const number = 2
// if(number >5){
//   console.log("inside if ")
//   setContent(!content);
// }
  return (      
    <>
    <a className="blog-card" href={"/guide/" + post.slug}>      
        <Date date={parseISO(post.date)} />
        <div className="title">{post.title}
        </div>
    </a>
    {/* {content && <button className="message" onClick={()=>showToaster("not valid ", "error")}>click me</button>} */}
    </>
  );

}
