import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import blankImage from '../../public/blankImag.png';
import Head from 'next/head';
function Blog({ post }) {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case 'heading-one':
        return (
          <h1
            key={index}
            className="lg:text-6xl sm:my-5 text-4xl font-semibold sm:py-8 py-4"
          >
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>
                <span className="bg-[#FF007A] lg:text-8xl text-6xl p-3 rounded-lg">
                  {item.charAt(0)}
                </span>
                {item.substring(1)}
              </React.Fragment>
            ))}
          </h1>
        );
      case 'heading-two':
        return (
          <h2
            key={index}
            className="flex items-center  sm:justify-evenly sm:py-8 py-4 font-semibold lg:text-6xl md:text-4xl text-2xl"
          >
            <span className="bg-[#FF007A] py-8 px-2  rounded-xl mr-4"> </span>
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
            <span className="bg-[#FF007A] sm:py-8 sm:px-2 rounded-xl ml-4">
              {' '}
            </span>
          </h2>
        );
      case 'heading-three':
        return (
          <h3
            key={index}
            className="sm:text-4xl text-2xl my-5 font-semibold mb-4"
          >
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case 'heading-four':
        return (
          <h4 key={index} className="text-2xl my-5 font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case 'paragraph':
        return (
          <p key={index} className="my-3 sm:my-5 text-lg sm:text-xl">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case 'block-quote':
        return (
          <p
            key={index}
            className="italic text-sm sm:text-lg border-l-4 my-5 border-gray-800 pl-4"
          >
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case 'code-block':
        return (
          <p
            key={index}
            className="italic text-sm sm:text-lg my-5 bg-gray-200 pl-4 dark:text-gray-900"
          >
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case 'image':
        return (
          <div className={`w-full relative max-h-[600px] min-h-[400px]`}>
            <Image
              key={index}
              blurDataURL={obj.src}
              placeholder="blur"
              priority={false}
              alt={obj.title}
              layout="fill"
              objectFit="contain"
              src={obj.src}
              quality={60}
            />
          </div>
        );
      default:
        return modifiedText;
    }
  };

  return (
    <div className="px-3">
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <div className="sm:my-8 my-5">
        <h1 className="sm:px-8 text-center font-semibold xl:text-8xl md:text-6xl text-4xl text-[#FF007A]">
          {post.title || ''}
        </h1>
        <h1 className="text-right w-full px-10 sm:py-4 font-semibold">
          {moment(post.createdAt).format('MMM DD, YYYY').toUpperCase() || ''}
        </h1>
      </div>
      <div className=" lg:mx-10 sm:h-[500px] h-[300px] drop-shadow-2xl rounded-3xl relative overflow-hidden">
        <Image
          src={
            post.featuredImage
              ? post.featuredImage.url || blankImage
              : blankImage
          }
          blurDataURL={
            post.featuredImage
              ? post.featuredImage.url || blankImage
              : blankImage
          }
          alt={post.title}
          placeholder="blur"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="sm:p-10 ">
        {post.content &&
          post.content.raw.children.map((typeObj, index) => {
            const children = typeObj.children.map((item, itemindex) =>
              getContentFragment(itemindex, item.text, item)
            );

            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
      </div>
    </div>
  );
}

export default Blog;
