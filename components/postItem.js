import Date from "./date";
import Link from "next/link";
import { parseISO } from "date-fns";


export default function PostItem({ post }) {  
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
    <a className="blog-card" href={"/guide/" + post.slug}>      
        <Date date={parseISO(post.date)} />
        <div className="title">{post.title}</div>
    </a>
  );
}
