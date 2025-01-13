import connectDb from "@/config/database";
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionUser";

// Get /api/properties/id
export const  GET= async (request, {params})=>{

    try{
        await connectDb()

        const property = await Property.findById(params.id)

        if(!property) return new Response('Property Not Found', {status: 404})

        return new Response(JSON.stringify(property), {status: 200});
    }catch(error){
        console.log(error)
        return new Response('something went wrong', {status: 500})
    }
}


// Delete /api/properties/id
export const  DELETE= async (request, {params})=>{
   
    try{
        const propertyId= params.id;
        const sessionUser = await getSessionUser()

        // Check for session
        if (!sessionUser || !sessionUser.userId) {
            return new Response('user id is required', {status: 401})
        }

        const {userId} = sessionUser;

        await connectDb()

        const property = await Property.findById(propertyId)

        if(!property) return new Response('Property Not Found', {status: 404})

            // verify ownership 
            if (property.ower.toString() !== userId) {
                return new Response('Unauthorized', {status: 401})
            }

            await property.deleteOne()


        return new Response('property deleted', {status: 200});
    }catch(error){
        console.log(error)
        return new Response('something went wrong', {status: 500})
    }
}


// PUT /api/properties/:id
export const PUT= async (request, {params})=>{
    try{
       await connectDb()

       const sessionUser= await getSessionUser()
       
       if (!sessionUser || !sessionUser.userId) {
           return new Response('Unauthosized, User id is required', {status: 401})
       }

       const {id} = params;
       const { userId }= sessionUser;

       const formData= await request.formData();
       // console.log(formData.get('name'))
       // Access all values from amenities
       const amenities= formData.getAll('amenities')

       const existingProperty = await Property.findById(id)

       if (!existingProperty) {
        return new Response("property does not exists", {status: 404})
       }

       // verify ownership
       if (existingProperty.ower.toString() !== userId) {
        return new Response("Unauthorized", {status: 401})
       }

       // Create propertyData object for database
       const propertyData = {
           type: formData.get('type'),
           name: formData.get('name'),
           description: formData.get('description'),
           location: {
               street: formData.get('location.street'),
               city: formData.get('location.city'),
               state: formData.get('location.state'),
               zipcode: formData.get('location.zipcode')
           },
           beds: formData.get('beds'),
           baths: formData.get('baths'),
           square_feet: formData.get('square_feet'),

           amenities,

           rates:{
               weekly: formData.get('rates.weekly'),
               monthly: formData.get('rates.monthly'),
               nightly: formData.get('rates.nightly'),
           },

           seller_info:{
               name: formData.get('seller_info.name'),
               email: formData.get('seller_info.email'),
               phone: formData.get('seller_info.phone'),
           },
           ower: userId,
           // images
       }
       // console.log(propertyData)

       // Update property in database 
      const updatedProperty = await Property.findByIdAndUpdate(id, propertyData)

        

       return new Response(JSON.stringify(updatedProperty), {status: 200})

    }catch(error){
       console.log(error)
       return new Response("Failed to add property", {status: 500})
    }
}