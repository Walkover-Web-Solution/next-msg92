import React from "react";
import Image from "next/image";
export function SocialList({date}) {
    // console.log(date, "date");
    const dateString = new Date(date);
    const year = dateString.getFullYear();
    // const year = date.split();
  return (  
    <div>
      <a
        title="Twitter"
        // href={`https://twitter.com/${config.twitter_account}`}
        href="https://twitter.com/msg91"
        // href="google.com"
        target="_blank"
        rel="noopener"
      >
        {/* <Image src = {Twitter} alt="GitHub"/> */}
        <Image src="/img/icon/twitter.svg" alt="Twitter-icon" width={24} height={24}/>
      </a>

      <a
        title="Facebook"
        href="https://www.facebook.com/msg91"
        // href="google.com"
        target="_blank"
        rel="noopener"
      >
         <Image src="/img/icon/facebook.svg" width={24} height={24} alt="Facebook-icon" />
      </a>

      <a
        title="Linkedin"
        href="https://www.linkedin.com/company/msg91/"
        // href="google.com"
        target="_blank"
        rel="noopener"
      >
        <Image src="/img/icon/linkedin.svg" alt="Linkedin-icon" width={24} height={24} />
      </a>

      <a
        title="Youtube"
        href="https://www.youtube.com/@WalkoverWS"
        // href="google.com"
        target="_blank"
        rel="noopener"
      >
        <Image src="/img/icon/youtube.svg" alt="Youtube-icon" width={24} height={24} />
      </a>
      {/* <p>&copy; 2020</p> */}
      <p>Copyright 2008-{year} MSG91 | All rights reserved.</p>
      
      <style jsx>
        {`
          p {
            font-size: 0.75rem;
            text-align: center;
          }
        `}
      </style>
      <style jsx>{`
        a {
          display: inline-block;
         filter: invert(100%);
         padding: 10px;
        }
        a:not(:last-child) {
          margin-right: 2em;
        }
      `}</style>
    </div>
  );
}
