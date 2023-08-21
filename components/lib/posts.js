// const fs = require("fs");
// import fs from "fs";
// const fsPromises = require("fs").promises;
const fsPromise = require("fs").promises;
const matter = require("gray-matter");
const path = require("path");
const yaml = require("js-yaml");
const { readdirSync, readFileSync } = require("fs");

const postsDirectory = path.join(process.cwd(), "_posts/blog");
// console.log(postsDirectory, "Blog directory");
let postCache;
// console.log(postCache, "Cache");
function fetchPostContent() {
  if (postCache) {    
    return postCache;
  }
//   else{
  //     console.log("hello post cache in else");
  //   }
  
  const fileNames = readdirSync(postsDirectory, { withFileTypes: false });

  const allPostsData = fileNames
    .filter((it) => it.endsWith(".mdx"))

    .map((fileName) => {
      let fullPath = path.join(postsDirectory, fileName);


      const fileContents = readFileSync(fullPath, "utf8");

      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
        },
      });
      const matterData = matterResult?.data;
      matterData.fullPath = fullPath;
      matterData.staticPath = fileName.split('.')[0];
      
      // console.log(JSON.stringify(fullPath), "full path");

      const slug = fileName.replace(/\.mdx$/, "");
      // fileName.replace(/\.mdx$/, "");
      // if (matterData.slug !== slug) {
      //   throw new Error("slug field not match with the path of its content source");
      // }

      return matterData;
    });

  postCache = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
  return postCache;
}

function countPosts(tag) {
  return fetchPostContent().filter(
    (it) => !tag || (it.tags && it.tags.includes(tag))
  ).length;
}

function listPostContent(page, limit, tag) {
  return fetchPostContent()
      .filter((it) => !tag || (it.tags && it.tags.includes(tag)))
      .slice((page - 1) * limit, page * limit);
}

module.exports = {
  fetchPostContent,
  countPosts,
  listPostContent,
};
