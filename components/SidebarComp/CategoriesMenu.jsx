import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getCategories } from '../../services';

function CategoriesMenu() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);
  return (
    <div>
      <h3 className="text-xl mb-8 font-semibold  pb-4">
        DISCOVER MORE OF WHAT MATTERS TO YOU
      </h3>
      <div className="flex text-sm gap-5 flex-wrap border-b pb-10">
        <Link href={'/blog'}>
          <button
            className={`cursor-pointer hover:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black dark:font-semibold border-2 py-3 px-4`}
          >
            Home
          </button>
        </Link>

        {categories.map((category, index) => (
          <Link key={index} href={`/category/${category.slug}`}>
            <button
              className={`cursor-pointer hover:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black dark:font-semibold border-2 py-3 px-4`}
            >
              {category.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoriesMenu;
