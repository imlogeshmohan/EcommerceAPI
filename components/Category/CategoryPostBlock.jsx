import React, { useState } from 'react';
import Head from 'next/head';
import CategoriesPostCard from './CategoriesPostCard';
import { getCategoryLoadMore } from '../../services';
import { Waypoint } from 'react-waypoint';
import { useEffect } from 'react';
function CategoryPostBlock({ posts }) {
  const [cursorId, setcursorId] = useState('');
  const [Post, setPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasNextPage, sethasNextPage] = useState('');
  const [slug, setslug] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  // const slug = ""
  useEffect(() => {
    setslug(posts.edges[0].node.categories[0].slug);
    setTitle(posts.edges[0].node.categories[0].name);
    setDesc(posts.edges[0].node.categories[0].description);
    setPost(posts.edges);
    setcursorId(posts.pageInfo.endCursor);
    sethasNextPage(posts.pageInfo.hasNextPage);
  }, [posts]);
  return (
    <div>
      <Head>
        <title>Jusqu-{title}</title>
        <meta name="description" content={desc} />
      </Head>
      <h1 className="lg:text-6xl sm:text-4xl text-3xl font-semibold lg:pt-16 pb-10">
        {/* {posts.edges[0].node.categories[0].name.toUpperCase()} */}
        {title || ''}
      </h1>
      <div className="flex flex-col gap-5 xl:w-[80%] sm:mx-auto">
        {Post &&
          Post.map((post, index) => (
            <React.Fragment key={index}>
              <CategoriesPostCard post={post.node} />
              {index === Post.length - 2 && hasNextPage && (
                <Waypoint
                  onEnter={() => {
                    setLoading(true);

                    getCategoryLoadMore(slug, cursorId).then((newPost) => {
                      setPost([...Post, ...newPost.edges]);
                      setcursorId(newPost.pageInfo.endCursor);
                      sethasNextPage(newPost.pageInfo.hasNextPage);
                    });
                    setLoading(false);
                  }}
                />
              )}
              {loading && (
                <h1 className="text-center text-gray-800">Loading..</h1>
              )}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}

export default CategoryPostBlock;
