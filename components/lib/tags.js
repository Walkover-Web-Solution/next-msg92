const tags = require("../../tags.json");
// import tags from '../../tags.yml';
// const tags = require('../../meta/tags.yml');
// const tags = {
//     sms: "sms",
// }
let result = {};
console.log(tags,"sms");

const tagMap = generateTagMap();
console.log(tagMap, "tagMap");
function generateTagMap() {
 
    console.log("insiode generataed map");
  console.log(tags);
  console.log(tags[0]?.slug,"pppp");
  for(let i = 0; i < tags.length; i++) {
    result[i] = tags[i].slug
  }
  console.log(result, "result123");
  // tags.map((data)=>{
  //   console.log(data, "mao data");
  //   result[data.slug] = data;
  // })
  // for (const tag of tags?.tags) {
  //   console.log(tag, "mao tag");
  //   result[tag.slug] = tag;
  // }
  // for (let i = 0; i < tags.length; i++) {
  //   const tag = tags[i];
  //   console.log(tag, "mao tag");
  //   result[tag.slug] = tag;
  // }
console.log(result, "result");
  return result;
}

function getTag(slug) {
    console.log("inside getTag",slug);
  return tagMap[slug];
}

function listTags() {
    console.log("inside list tags");
    const tags = Object.values(result)
    console.log(tags, "list tags result");
    return tags;
  // return tags.tags;
}

module.exports = {
  getTag,
  listTags
};
