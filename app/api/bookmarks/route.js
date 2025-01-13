import connectDb from "@/config/database";
import User from '@/models/User'
import Property from '@/models/Property'
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic= 'force-dynamic';

// GET /api/bookmarks
export const GET =async ()=>{

    try {
        await connectDb();
        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response("User id is required", {status: 401})
        }

        const {userId} = sessionUser;

        // Find user in database
        const user = await User.findOne({_id: userId});

        // get user bookmarks
        const bookmarks = await Property.find({_id: {$in: user.bookmarks}});

        return new Response(JSON.stringify(bookmarks), {status: 200})
    } catch (error) {
        console.log(error)
        return new Response('something went wrong ', {status: 401})
    }
    
}

export const POST= async (request)=>{
    try {
        await connectDb();
        const { propertyId } = await request.json();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response("User id is required", {status: 401})
        }

        const {userId} = sessionUser;

        // Find user in database
        const user = await User.findOne({_id: userId});

        // Check if property is bookmarked
        let isBookmarked = user.bookmarks.includes(propertyId)
        let message;
        if (isBookmarked) {
            // if already bookmarked, remove it
            user.bookmarks.pull(propertyId)
            message="bookmark removed successfully"
            isBookmarked=false;
        }else{
            // if not bookmarked, remove it
            user.bookmarks.push(propertyId)
            message='bookmark added successfully'
            isBookmarked=true;
        }

        await user.save();

        return new Response(JSON.stringify({message, isBookmarked}), {status: 200})

    } catch (error) {
        console.log(error)
        return new Response('Something went wrong', {status: 500})
    }
}