import React from 'react'
import Link from 'next/link'
import PropertySearchForm from '@/components/PropertySearchForm'

// import properties from '@/properties.json'

// import Error from 'next/error'

// function to fetch data from database 
// import {fetchProperties} from '@/utils/request'
import Properties from '@/components/Properties'

const PropertiesPage = async () => {
  // const  properties= await fetchProperties();

  // // sort propertis by date 
  // properties.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt) )

  return (
    <>

<section className="bg-blue-700 py-4">
  <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px:8">
    <PropertySearchForm />
  </div>
</section>

    <Properties />
    </>
  )
}

export default PropertiesPage