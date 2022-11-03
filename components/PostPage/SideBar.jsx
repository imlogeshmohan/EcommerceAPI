import Image from 'next/image';
import Searchbar from '../Searchbar';
import TrendingBlog from './TrendingBlog';
import CategoriesMenu from '../SidebarComp/CategoriesMenu';
import defaultAuthor from '../../public/defaultAuthor.png';

function SideBar({ post }) {
  return (
    <div className="w-full ">
      <div className="h-20 pt-5 relative">
        <Searchbar />
      </div>
      <div className="pb-8 ">
        <div className="overflow-hidden -z-50 relative w-32 h-32 rounded-full mt-8 border">
          <Image
            className="z-0"
            src={
              post.author.photo
                ? post.author.photo.url || defaultAuthor
                : defaultAuthor
            }
            width={250}
            height={250}
            objectFit="cover"
            objectPosition="top center"
          />
        </div>
        <h1 className="font-semibold py-4 text-lg">{post.author.name || ''}</h1>
        <p>{post.author.bio || ''}</p>
      </div>
      <CategoriesMenu />

      <TrendingBlog category={post.categories[0].name} />
    </div>
  );
}

export default SideBar;
