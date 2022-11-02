import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
export const getCategoriesRecentPosts = async () => {
  const query = gql`
    query MyQuery {
      categories {
        description
        name
        slug
        post(orderBy: publishedAt_ASC, last: 6) {
          excerpt
          id
          featuredImage {
            url
          }
          slug
          title
        }
      }
      posts(orderBy: publishedAt_ASC, last: 7) {
        id
        featuredImage {
          url
        }
        title
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result;
};

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
            likes
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
};

export const getRecentPosts = async () => {
  const query = gql`
    query MyQuery {
      posts(last: 10) {
        title
        slug
        featuredImage {
          url
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetGategories {
      categories {
        name
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.categories;
};

export const getSimilarPost = async (category, slug) => {
  // console.log("secategory)
  const query = gql`
    query TrendingBlogs($category: String!, $slug: String!) {
      postsConnection(
        where: {
          slug_not: $slug
          AND: { categories_some: { _search: $category } }
        }
        first: 3
      ) {
        edges {
          node {
            id
            slug
            title
            featuredImage {
              url
            }
            excerpt
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { category, slug });

  return result.postsConnection.edges;
};

export const getUpComingPost = async () => {
  const query = gql`
    query getUpComingPost {
      upcomingPosts {
        title
        image {
          url
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.upcomingPosts;
};

export const getTrendingPost = async (category) => {
  // console.log("secategory)
  const query = gql`
    query TrendingBlogs($category: String!) {
      postsConnection(
        where: { categories_some: { _search: $category }, likes_gt: 0 }
        orderBy: likes_DESC
        first: 3
      ) {
        edges {
          node {
            id
            slug
            title
            featuredImage {
              url
            }
            excerpt
            likes
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { category });

  return result.postsConnection.edges;
};

export const getTrendingFooter = async () => {
  const query = gql`
    query MyQuery {
      postsConnection(where: { likes_gt: 0 }, first: 5, orderBy: likes_DESC) {
        edges {
          node {
            title
            slug
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
};

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(
        first: 7
        where: { categories_some: { slug: $slug } }
        orderBy: createdAt_DESC
      ) {
        edges {
          cursor
          node {
            likes
            id
            excerpt
            featuredImage {
              url
            }
            slug
            title
            categories {
              name
              slug
              description
            }
            author {
              name
              photo {
                url
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection;
};
export const getCategoryLoadMore = async (slug, cursor) => {
  const query = gql`
    query GetCategoryPost($slug: String!, $cursor: String!) {
      postsConnection(
        first: 10
        where: { categories_some: { slug: $slug } }
        orderBy: createdAt_DESC
        after: $cursor
      ) {
        edges {
          cursor
          node {
            likes
            id
            excerpt
            featuredImage {
              url
            }
            slug
            title
            categories {
              name
              slug
            }
            author {
              name
              photo {
                url
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug, cursor });

  return result.postsConnection;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        featuredImage {
          url
        }
        author {
          name
          bio
          photo {
            url
          }
        }
        id
        createdAt
        slug
        likes
        content {
          raw
        }
        categories {
          name
          slug
        }
        likes
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

export const getSearchPost = async (title) => {
  const query = gql`
    query getSearchPost($title: String!) {
      postsConnection(where: { title_contains: $title }) {
        edges {
          node {
            title
            slug
            id
            featuredImage {
              url
            }
            excerpt
            createdAt
            author {
              name
              photo {
                url
              }
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { title });

  return result.postsConnection.edges;
};
