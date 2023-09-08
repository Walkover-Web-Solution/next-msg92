// const tags = require("../../tags.json");
// import tags from "../../meta/tags.yml"
const tags = require("../../meta/tags.json");
// import tags from '../../meta/tags.yml';


let result = {};

const tagMap = generateTagMap();

function generateTagMap() {

  for (const tag of tags.tags) {

    result[tag.slug] = tag;
  }

  return result;
}

 export function getTag(slug) {
  return slug;
}
export function listTags() {

    const tags1 = tags.tags

    return tags1;
  // return tags.tags;
} 