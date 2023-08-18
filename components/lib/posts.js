const fs = require("fs");
// import fs from "fs";
const fsPromise = require("fs").promises;
const matter = require("gray-matter");
const path = require("path");
const yaml = require("js-yaml");

const postsDirectory = path.join(process.cwd(), "_posts/blog");
console.log(postsDirectory, "Blog directory");
let postCache;
console.log(postCache, "Cache");
function fetchPostContent() {
    console.log("inside fetch post content")
  if (postCache) {
    console.log("hello post cache", postCache);
    return postCache;
  }
//   else{
//     console.log("hello post cache in else");
//   }
  
  const fileNames = fs.readdirSync(postsDirectory);
  console.log(fileNames, "File names");

  const allPostsData = fileNames
    .filter((it) => it.endsWith(".mdx"))
    // console.log(allPostsData, "All posts data");
    .map((fileName) => {
      let fullPath = path.join(postsDirectory, fileName);
    //   fullPath = JSON.stringify(fullPath)
      // console.log(fullPath, "full path");
      const fileContents = fs.readFileSync(fullPath, "utf8");
      // console.log(fileContents, "File contents");

      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
        },
      });
      // console.log(matterResult, "matterResult");
      const matterData = matterResult?.data;
      matterData.fullPath = fullPath;

      // console.log(JSON.stringify(fullPath), "full path");

      const slug = fileName.replace(/\.mdx$/, "");

      console.log(slug, "slug in post");
      console.log(matterData, "matterData.slug in post");
      
      if (matterData.slug !== slug) {
        throw new Error("slug field not match with the path of its content source");
      }

      // console.log(matterData, "matter data");
      return matterData;
    });

  postCache = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
  console.log(postCache, "post cache before return");
  return postCache;
}

function countPosts(tag) {
  return fetchPostContent().filter(
    (it) => !tag || (it.tags && it.tags.includes(tag))
  ).length;
}

function listPostContent(page, limit, tag) {
  console.log(page, limit, tag,"list function called");
  return fetchPostContent()
//     .filter((it) => !tag || (it.tags && it.tags.includes(tag)))
//     .slice((page - 1) * limit, page * limit);
}

module.exports = {
  fetchPostContent,
  countPosts,
  listPostContent,
};
