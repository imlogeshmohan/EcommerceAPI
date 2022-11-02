import Link from "next/link"


const otherServices = [
    {
      name:"Help",
      slug:"help"
    },
    {
      name:"Status",
      slug:"status"
    },
    {
      name:"Author",
      slug:"author"
    },
    {
      name:"Blog",
      slug:"blog"
    },
    {
      name:"Privacy",
      slug:"privacy"
    },
    {
      name:"About",
      slug:"about"
    }
  ]

function ServicesMenu() {
  return (
    <div className='flex gap-5 py-10 flex-wrap text-gray-700 dark:text-gray-100'>
      {otherServices.map((service, index) => (
        
        <Link key={index} href={`/blog/category/${service.slug}`}>
          <span className={`cursor-pointer`}>{service.name}</span>
        </Link>
      ))}
      </div>
  )
}

export default ServicesMenu