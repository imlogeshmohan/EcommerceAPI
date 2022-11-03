import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { getSitemapAllPosts } from '../../services';
import { getSitemapAllCategory } from '../../services';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const postData = await getSitemapAllPosts();
  const categoryData = await getSitemapAllCategory();
  const PATH = process.env.DOMAIN;

  postData.map((post: any) => {
    post.slug = `${PATH}/blog/post/${post.slug}`;
  });

  categoryData.map((category: any) => {
    category.slug = `${PATH}/blog/category/${category.slug}`;
  });

  const allData: [] = postData.concat(categoryData);

  const field: ISitemapField[] = allData.map((posts: any) => ({
    title: posts.title,
    excerpt: posts.excerpt,
    loc: posts.slug,
    lastmod: posts.updatedAt,
    name: posts.name,
    description: posts.description,
  }));

  return getServerSideSitemap(ctx, field);
};

export default function site() {}
