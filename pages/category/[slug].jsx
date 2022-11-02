import { getCategoryPost } from '../../services';
import ErrorComp from '../../components/404';
import SideBar from '../../components/Category/SideBar';
import CategoryPostBlock from '../../components/Category/CategoryPostBlock';

function Slug({ data }) {
  // console.log();
  if (data.edges.length === 0) {
    return <ErrorComp />;
  }

  return (
    <div className="container mx-auto sm:px-10 px-3  flex flex-col-reverse lg:flex-row  ">
      <div className="lg:w-[80%] lg:border-r-2 sm:pb-10">
        <CategoryPostBlock posts={data} />
      </div>
      <div className=" xl:w-[25%] lg:w-[30%] ">
        <div className="relative lg:sticky top-8">
          <SideBar />
        </div>
      </div>
    </div>
  );
}

export default Slug;

export async function getServerSideProps(context) {
  const data = await getCategoryPost(context.query.slug);

  return { props: { data } };
}
