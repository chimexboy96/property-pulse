import connectDb from "@/config/database";
import Property from "@/models/Property"



// Get /api/properties/user/:userId
export const GET= async (request, {params})=>{
   
    try{
        await connectDb()

        const userId=params.userId

        if(!userId){
            return new Response('User ID is required', {statue: 400})
        }

        const properties = await Property.find({ower: userId})

        return new Response(JSON.stringify(properties), {status: 200});
    }catch(error){
        console.log(error)
        return new Response('something went wrong', {status: 500})
    }
}