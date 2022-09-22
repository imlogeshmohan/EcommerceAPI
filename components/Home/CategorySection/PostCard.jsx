import Image from 'next/image';
import Link from 'next/link';
import blankImage from '../../../public/blankImag.png';
function PostCard({ post }) {
  // console.log(post)
  return (
    <Link className="" href={`/blog/post/${post.slug}`}>
      <div className="sm:m-6 h-[510px] sm:w-96 w-full  cursor-pointer relative  shadow-xl  overflow-hidden rounded-xl">
        <div className="relative w-full h-56 ">
          <Image
            className="rounded-t-xl h-60"
            src={
              post.featuredImage
                ? post.featuredImage.url || blankImage
                : blankImage
            }
            priority={false}
            alt={post.title}
            placeholder="blur"
            blurDataURL={
              post.featuredImage
                ? post.featuredImage.url || blankImage
                : blankImage
            }
            layout="fill"
            objectPosition="center"
            objectFit="cover"
          />
        </div>
        <div className="sm:text-3xl text-lg font-bold py-4 px-5">
          {post.title || ''}
        </div>
        {post.excerpt && (
          <div className="sm:px-5 px-3 pb-6">{post.excerpt.substr(0, 230)}</div>
        )}
      </div>
    </Link>
  );
}

export default PostCard;
