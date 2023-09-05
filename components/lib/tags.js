// const tags = require("../../tags.json");
// import tags from "../../meta/tags.yml"
const tags = require("../../meta/tags.json");
// import tags from '../../meta/tags.yml';


let result = {};
console.log(tags, "jjjj");
const tagMap = generateTagMap();
console.log(tagMap,"tagMapm909");
console.log(tagMap, "tagMap");
function generateTagMap() {
 
    console.log("insiode generataed map");
  console.log(tags);
  for (const tag of tags.tags) {
    console.log(tag.slug, "tags.slug");
    result[tag.slug] = tag;
  }
  // for (let i = 0; i < tags.length; i++) {
  //   const tag = tags[i];
  //   console.log(tag, "mao tag");
  //   result[tag.slug] = tag;
  // }
console.log(result, "result 9090");
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
  return slug;
}
export function listTags() {
    console.log("inside list tags", tags);
    // const tags = Object.values(result)
    // console.log(tags, "list tags result");
    const tags1 = tags.tags
    console.log(tags1, "list tags result");
    return tags1;
  // return tags.tags;
} 