import Date from "./date";
import { parseISO } from "date-fns";
import { MdDateRange } from "react-icons/md";

export default function PostItem({ post }) {

  function getBlogStyle(titleText) {
    let textLength = titleText.length;
    let wordLength = titleText.split(" ").length;
    //console.log('titetext', textLength, wordLength)

    if (wordLength > 8 || textLength > 48) {
      return " blog-card--large";
    } else {
      return " blog-card--small";
    }
  }
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
    <a href={"/guide/" + post.slug} 
    className={
      "blog-card" +
      (post.thumbnail ? " bg-dark" : " bg-light") +
      getBlogStyle(post.title)
    }
    style={{
      backgroundImage: post.thumbnail
        ? 'url("' + post.thumbnail + '")'
        : "none",
    }}
    >
      <div className="blog-card__content">
        <div className="blog-card-body">
        <h2 className="title">{post?.title}</h2>
        <p className="content">{post?.description}</p>
      </div>
      <div className="blog-card-footer">
          <div className="blog-card-tags">
            {post?.tags!== "" && post?.tags?.map((category, idx) => (
              <span className="bg-tags" key={idx}>
                {category}
              </span>
            ))}
          </div>
          <span>
            <MdDateRange /> <Date date={parseISO(post.date)} />
          </span>
        </div>
      </div>
    </a>
    /* {content && <button className="message" onClick={()=>showToaster("not valid ", "error")}>click me</button>} */
  );

}
