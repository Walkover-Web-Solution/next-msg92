// Child Component
import React from 'react';

const PageComponent = ({ pageData }) => {
  let maindata = pageData;
    console.log(maindata.pagename); //);
  return (
    <div>
      productPage
      <p>{maindata.pagename}</p>
    </div>
  );
};

export default PageComponent;
