import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCategories } from '../../../services';
import FooterList from './FooterList';
import Subscribe from './Subscribe';
import { meta, fb, linkedin, youtube, insta, privacy } from './svg';

const StayQuort = 'Stay current with our latest insights';
const WeRespectPrivacy = 'We respect your privacy';

const Company = [
  {
    sno: 2,
    title: 'Company',
    serv: ['Home', 'About', 'Team'],
    link: ['#', '#', '#'],
  },
  {
    sno: 3,
    title: 'Support',
    serv: [
      'Contact',
      'Frequently Asked Questions',
      'Join Affilate program',
      'Work With Us',
      'Terms and Conditions',
    ],
    link: ['#', '#', '#', '#', '#'],
  },
];

function Footer({ trending }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);
  return (
    <div className="bg-[#1e1e1e] text-gray-300 font-semibold sm:p-10 sm:pt-20 pt-10 p-5">
      <div className="flex flex-col items-center gap-6">
        <h1 className="sm:text-lg text-sm">{StayQuort}</h1>
        <Subscribe />
        <div className="flex gap-3 items-center">
          <svg width={24} height={24}>
            {privacy}
          </svg>
          <h1 className="text-sm">{WeRespectPrivacy}</h1>
        </div>
      </div>
      <div className="">
        <h1 className="sm:text-2xl text-lg py-5">CATEGORIES</h1>
        {categories.map((category, i) => (
          <Link href={`/category/${category.slug}`} key={category.slug}>
            <span
              className={`cursor-pointer px-5 text-sm lg:hover:text-gray-50 hover:font-semibold ${
                i === categories.length - 1 ? 'border-r-0' : 'border-r-2'
              }`}
            >
              {category.name}
            </span>
          </Link>
        ))}

        <h1 className="sm:text-2xl text-lg pt-10 pb-5">
          TRENDING BLOG ARTICLES
        </h1>
        <div className="flex flex-wrap gap-3">
          {trending.map((trend, i) => (
            <Link href={`/post/${trend.node.slug}`} key={trend.node.slug}>
              <span
                className={`cursor-pointer px-5 text-sm lg:hover:text-gray-50 hover:font-semibold ${
                  i === trending.length - 1 ? 'border-r-0' : 'border-r-2'
                }`}
              >
                {trend.node.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full text-center md:justify-between sm:px-10">
        <div className=" pt-8">
          <h1 className="text-6xl">Jusqu</h1>
          <div className="flex gap-3 py-4 justify-center">
            <svg
              width={38}
              height={38}
              className="fill-gray-100 stroke-slate-300 outline-gray-300 cursor-pointer"
            >
              {' '}
              {meta}
            </svg>
            <svg
              width={38}
              height={38}
              className="fill-gray-100 stroke-slate-300 outline-gray-300 cursor-pointer"
            >
              {' '}
              {fb}
            </svg>
            <svg
              width={38}
              height={38}
              className="fill-gray-100 stroke-slate-300 outline-gray-300 cursor-pointer"
            >
              {' '}
              {linkedin}
            </svg>
            <svg
              width={38}
              height={38}
              className="fill-gray-100 stroke-slate-300 outline-gray-300 cursor-pointer"
            >
              {' '}
              {youtube}
            </svg>
            <svg
              width={38}
              height={38}
              className="fill-gray-100 stroke-slate-300 outline-gray-300 cursor-pointer"
            >
              {' '}
              {insta}
            </svg>
          </div>
        </div>
        {Company.map((list) => {
          return (
            <FooterList
              title={list.title}
              key={list.sno}
              serv={list.serv}
              link={list.link}
            />
          );
        })}
      </div>

      <div className="text-center text-sm pt-5">2022 All rights Reserved</div>
    </div>
  );
}

export default Footer;
