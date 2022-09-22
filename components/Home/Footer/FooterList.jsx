import Link from 'next/link'

function FooterList({title, serv , link}) {
  return (
    <div>
        <div className='flex flex-col text-white text-sm font-semibold'>
            <span className='text-2xl py-6'>
                {title}
            </span>
            {serv.map((list , index)=>{
                return <Link key={index} href={link[index]}><div className='py-2 cursor-pointer hover:text-gray-100 text-gray-400'>{list}</div></Link>
            })}
        </div>
    </div>
  )
}

export default FooterList