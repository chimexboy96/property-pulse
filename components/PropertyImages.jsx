import Image from 'next/image'
import { Gallery, Item } from 'react-photoswipe-gallery'

const PropertyImages = ({ images }) => {
  return (

    <Gallery> 
    <section className='bg-blue-50 p-4'>

        <div className="container mx-auto">

      {images.length === 1 ? (

        <Item original={images[0]} thumbnail={images[0]} width='1000' height='600'>

          {({ref, open})=> (
            <Image 

            ref={ref}
            onClick={open}

            src={images[0]} 
            className='object-cover h-[400px] mx-auto rounded-xl'
            width={1800}
            height={400}
            alt=''
            priority={true}
             />
          )}

        

        </Item>
        
      ) : ( <section className='grid grid-cols-2 gap-4'>
        {images.map( (image, index) => (
            <div key={index}
             className={`${images.length === 3 && index === 2 ? ('col-span-2') : ('col-span-1') }` } >

        <Item original={image} thumbnail={image} width='1000' height='600'>
        {({ref, open})=> (
            <Image 

            ref={ref}
            onClick={open}

            src={image} 
        className='object-cover h-[400px] w-full rounded-xl'
        width={0}
        height={0}
        alt=''
        sizes='100vw'
        priority={true}

            />

          )}

          </Item>

        

            </div>
            
        ))}
      </section> ) }



        </div>
    </section>

    </Gallery>
    
  )
  
}

export default PropertyImages