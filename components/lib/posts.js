const matter = require("gray-matter");
const path = require("path");
const yaml = require("js-yaml");
const { readdirSync, readFileSync } = require("fs");

const postsDirectory = path.join(process.cwd(), "_posts/blog");
let postCache;
function fetchPostContent() {
    if (postCache) {
        return postCache;
    }

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
            matterData.staticPath = fileName.split(".")[0];

            const slug = fileName.replace(/\.mdx$/, "");
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
    console.log("🚀 ~ countPosts ~ tag:", tag)
    return fetchPostContent().filter((it) => !tag || (it.tags && it.tags.includes(tag))).length;
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
