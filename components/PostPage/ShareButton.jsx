/* eslint-disable react/no-unescaped-entities */
import {
  fb,
  twitter,
  linkedin,
  telegram,
  whatsapp,
} from '../Assets/PostLeftSideBar';
import Likes from '../SidebarComp/Likes';
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'next-share';
import { useState } from 'react';
import { useEffect } from 'react';

function ShareButton({ post, children }) {
  const SvgWidth = 48;
  const SvgHeight = 48;
  const [title, setTitle] = useState('');
  const [quote, setQuote] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    setTitle(post.title || '');
    setQuote(post.excerpt || '');
    setUrl(`blog/post/${post.slug}`);
  }, [post]);

  // console.log("Share Render",url)
  return (
    <div className=" flex flex-col justify-center lg:-mt-10">
      <div className="">
        <FacebookShareButton
          url={
            'https://www.youtube.com/watch?v=Jyst8oIHOAY&list=RDJyst8oIHOAY&start_radio=1'
          }
          quote={quote}
        >
          <svg
            className="fill-black dark:fill-white"
            width={SvgWidth}
            height={SvgHeight}
          >
            {fb} key="fb"
          </svg>
        </FacebookShareButton>

        <TwitterShareButton
          url={
            'https://www.youtube.com/watch?v=Jyst8oIHOAY&list=RDJyst8oIHOAY&start_radio=1'
          }
          title={title}
        >
          <svg
            className="fill-black dark:fill-white"
            width={SvgWidth}
            height={SvgHeight}
          >
            {twitter} key="twitter"
          </svg>
        </TwitterShareButton>

        <LinkedinShareButton
          url={
            'https://www.youtube.com/watch?v=Jyst8oIHOAY&list=RDJyst8oIHOAY&start_radio=1'
          }
          summary={quote}
          title={title}
        >
          <svg
            className="fill-black dark:fill-white"
            width={SvgWidth}
            height={SvgHeight}
          >
            {linkedin} key="linkedin"
          </svg>
        </LinkedinShareButton>

        <TelegramShareButton
          url={
            'https://www.youtube.com/watch?v=Jyst8oIHOAY&list=RDJyst8oIHOAY&start_radio=1'
          }
          title={title}
        >
          <svg
            className="fill-black dark:fill-white"
            width={SvgWidth}
            height={SvgHeight}
          >
            {telegram} key = "youtube"
          </svg>
        </TelegramShareButton>
        <WhatsappShareButton
          url={
            'https://www.youtube.com/watch?v=Jyst8oIHOAY&list=RDJyst8oIHOAY&start_radio=1'
          }
          title={title}
        >
          <svg
            className="lg:mb-10 fill-black dark:fill-white"
            width={SvgWidth}
            height={SvgHeight}
          >
            {whatsapp} key = "youtube"
          </svg>
        </WhatsappShareButton>

        {children}
      </div>
    </div>
  );
}

export default ShareButton;
