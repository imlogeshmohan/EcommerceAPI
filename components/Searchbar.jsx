import React, { useEffect, useState, useRef } from 'react';
import { cross, search } from './Assets/SearchSVG';
import { useClickOutside } from 'react-click-outside-hook';
import useDebounce from '../hooks/DebounceHook';
import dynamic from 'next/dynamic';
import moment from 'moment';
import Link from 'next/link';

function NewSearch() {
  const [parentRef, isClickedOutside] = useClickOutside();
  const [IsExpanded, setExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [NothingFound, setNothingFound] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const [Hover, setHover] = useState(true);
  const inputRef = useRef();
  const searchResultRef = useRef(null);

  const MoonLoader = dynamic(() => import('react-spinners/MoonLoader'), {
    ssr: false,
  });

  function getData() {
    if (!searchValue || searchValue.trim() === '') return;
    setLoading(true);

    // Importing file dynamic and Requesting posts
    import('../services').then(async ({ getSearchPost }) => {
      const Result = await getSearchPost(searchValue);
      const data = [];

      // Saving Result in data
      for (let i = 0; i < Result.length; i++) {
        data.push(Result[i].node);
      }

      //Cheacking results found or not
      {
        data.length === 0 ? setNothingFound(true) : setNothingFound(false);
      }

      // Setting States
      await setSearchResult(data);
      setLoading(false);
      setCursor(-1);
      scrollIntoView(0);
    });
  }

  const changeHandler = (e) => {
    e.preventDefault();
    if (e.target.value.trim() === '') setNothingFound(false);
    setSearchValue(e.target.value);
    if (!IsExpanded) {
      expandContainer();
      getData();
    }
  };

  const scrollIntoView = (position) => {
    searchResultRef.current.parentNode.scrollTo({
      top: position,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (cursor < 0 || cursor > searchResult.length || !searchResultRef) {
      return () => {};
    }
    window.onmousemove = () => {
      setHover(true);
    };

    let listItems = Array.from(searchResultRef.current.children);
    listItems[cursor] && scrollIntoView(listItems[cursor].offsetTop);
  }, [cursor]);

  const keyHandler = (e) => {
    setHover(false);

    if (e.key === 'ArrowUp') {
      if (cursor > 0) setCursor(cursor - 1);
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (cursor < searchResult.length - 1) setCursor(cursor + 1);
      e.preventDefault();
    } else if (e.key === 'Enter') {
      window.location.href = `/blog/post/${searchResult[cursor].slug}`;
      collapseContainer();
    } else if (e.key === 'Escape') {
      collapseContainer();
    }
  };

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    setHover(true);
    setSearchResult([]);
    setSearchValue('');
    setCursor(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  useEffect(() => {
    if (isClickedOutside) {
      collapseContainer();
    }
  }, [isClickedOutside]);

  useDebounce(searchValue, 500, getData);
  return (
    <div
      ref={parentRef}
      className={`absolute dark:text-gray-900 dark:font-semibold z-50 flex z-100 w-full flex-col shadow-lg rounded-xl bg-white  transition-all duration-300 ease-in-out transform  ${
        IsExpanded
          ? 'h-96  overflow-auto styled-scrollbar'
          : 'h-14 overflow-hidden'
      } `}
    >
      <div className="flex gap-2 items-center px-3 relative">
        {/* Search SVG */}
        <svg width={32} height={32} className="translate-y-2">
          {search}
        </svg>
        {/* Search input field */}
        <input
          value={searchValue}
          onChange={changeHandler}
          onFocus={expandContainer}
          onKeyDown={(event) => {
            if (searchResult.length !== 0) keyHandler(event);
          }}
          ref={inputRef}
          placeholder="Search"
          className="w-60 h-12 rounded-xl focus:outline-none text-gray-900 bg-white"
        />
        {/* search closing svg */}
        <svg
          width={22}
          height={22}
          onClick={collapseContainer}
          className={`translate-y-3 absolute right-5 top-1 stroke-pink-400 fill-pink-400 hover:fill-pink-600 cursor-pointer transition-all duration-300 ease-in-out transform  ${
            IsExpanded ? 'opacity-100' : 'opacity-0 hidden'
          }`}
        >
          {cross}
        </svg>
      </div>
      <div className="h-full" ref={searchResultRef}>
        {/* Set Loading */}
        {IsExpanded && isLoading && (
          <div
            className={`flex h-full items-center justify-center transition-all duration-1000 ease-in-out transform  ${
              IsExpanded ? 'opacity-100' : 'opacity-0 hidden'
            }`}
          >
            <MoonLoader loading color="#000" size={20} />
          </div>
        )}

        {/* No Results block */}
        {IsExpanded &&
          !isLoading &&
          NothingFound &&
          searchValue.length !== 0 && (
            <div className="flex h-full items-center justify-center">
              No Result
            </div>
          )}

        {/* Start Typing block */}
        {IsExpanded && searchValue.length === 0 && (
          <div className="flex h-full items-center justify-center">
            Start Typing
          </div>
        )}

        {searchValue.length !== 0 &&
          searchResult.map((result, i) => {
            return (
              <div key={result.slug}>
                <Link href={`/blog/post/${result.slug}`}>
                  <div
                    className={`cursor-pointer py-3 border-black  px-4 pl-6 ${
                      i === cursor ? 'border-l-4 pl-8' : ''
                    } ${Hover ? 'hover:border-l-4 hover:pl-8' : 'hover:'}`}
                    onClick={collapseContainer}
                  >
                    <div className="text-sm">{result.title}</div>
                    <div className=" flex text-xs text-gray-500 gap-3">
                      <div className="  ">
                        {moment(result.createdAt).format('MMM DD, YYYY')}
                      </div>
                      <div>{result.categories[0].name}</div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default NewSearch;
