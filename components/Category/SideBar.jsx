import Searchbar from '../Searchbar';
import CategoriesMenu from '../SidebarComp/CategoriesMenu';
import ServicesMenu from '../SidebarComp/ServicesMenu';
// import ThemeToggle from '../../Header/ThemeToggle';

const SideBar = () => {
  return (
    <div className=" rounded-lg lg:p-5 pb-12 mb-8">
      {/* <ThemeToggle /> */}
      <div className="h-28 pt-5 sm:w-80">
        <Searchbar />
      </div>
      <CategoriesMenu />
      <div className="hidden lg:block">
        <ServicesMenu />
      </div>
    </div>
  );
};

export default SideBar;
