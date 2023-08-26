// const tags = require("../../tags.json");
import tags from "../../meta/tags.json"
// const tags = require("../../meta/tags.json");
// import tags from '../../meta/tags.yml';
// const tags = {
//     sms: "sms",
// }
let result = {};
console.log(tags, "jjjj");
const tagMap = generateTagMap();
console.log(tagMap,"tagMapm909");
console.log(tagMap, "tagMap");
function generateTagMap() {
 
    console.log("insiode generataed map");
  console.log(tags);
  for (const tag of tags) {
    console.log(tag, "mao tag");
    result[tag.slug] = tag;
  }
  // for (let i = 0; i < tags.length; i++) {
  //   const tag = tags[i];
  //   console.log(tag, "mao tag");
  //   result[tag.slug] = tag;
  // }
console.log(result, "result");
  return result;
}

 export function getTag(slug) {
    console.log("inside getTag",slug);
    console.log(tagMap, "tagMap consososo");
    // console.log(tagMap?.slug[slug], "tagmap slug");
    // function decodeByteString(byteString) {
    //   console.log("inside decodeByteString",byteString);
    //   return byteString[1]?.slice(3, -1); // Remove the b'' wrapper
    // }
    // const decodeSlug = decodeByteString(tagMap[slug])
    JSON.stringify(slug)
  return slug;
}
export function listTags() {
    console.log("inside list tags");
    // const tags = Object.values(result)
    // console.log(tags, "list tags result");
    return tags;
  // return tags.tags;
}
