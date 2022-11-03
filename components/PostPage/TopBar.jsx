import dynamic from 'next/dynamic';
import { cross } from '../Assets/SearchSVG';

const CategoriesMenu = dynamic(() => import('../SidebarComp/CategoriesMenu'), {
  suspense: true,
});

const ServicesMenu = dynamic(() => import('../SidebarComp/ServicesMenu'), {
  suspense: true,
});

const Searchbar = dynamic(() => import('../Searchbar'), {
  suspense: true,
});

function TopBar({ setOpen }) {
  return (
    <div className="pt-10 px-5 h-fit bg-white dark:bg-gray-500 relative">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold dark:text-white">JUSQU</h1>
        <svg
          width={30}
          height={30}
          className="cursor-pointer fill-black dark:fill-white"
          onClick={() => {
            setOpen(false);
          }}
        >
          {cross}
        </svg>
      </div>
      <div className="relative h-14 pt-10 pb-20 ">
        <Searchbar />
      </div>
      <div className="flex flex-col justify-center gap-5">
        <CategoriesMenu />
        <ServicesMenu />
      </div>
    </div>
  );
}

export default TopBar;
