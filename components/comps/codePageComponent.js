// Child Component
import React from 'react';

const CodePageComponent = ({ pageData }) => {
  let maindata = pageData;
    console.log(maindata.pagename); //);
  return (
    <div>
      codepage
      <p>{maindata.pagename}</p>
    </div>
  );
};

export default CodePageComponent;
