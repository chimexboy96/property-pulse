import connectDb from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

// GER  /api/message
export const GET=async () =>{
    try {
        await connectDb()

        // get user session 
        const sessionUser = await getSessionUser()
        if (!sessionUser || !sessionUser.user) {
            return new Response(JSON.stringify({message: 'User ID is required'}), {status: 401})
        }

        const {userId} = sessionUser;

        const readMsessages = await Message.find({recipient: userId, read: true})
        .sort({createdAt: -1}) // Sort read messages in ascending (asc) order 
        .populate('sender', 'username')
        .populate('property', 'name')

        const unreadMsessages = await Message.find({recipient: userId, read: false})
        .sort({createdAt: -1}) // Sort read messages in ascending (asc) order 
        .populate('sender', 'username')
        .populate('property', 'name')

        // combine them by spreading them across
        const messages= [...unreadMsessages, ...readMsessages];

        return new Response(JSON.stringify(messages), {status:200})

    } catch (error) {
        console.log(error)
        return new Response('Something went wrong', {status:500})
    }
}

//POST /api/message
export const POST = async (request) =>{
    try {
        await connectDb()
        const {name, email, phone, body, property, recipient}= await request.json()
        
        const sessionUser = await getSessionUser()

        if (!sessionUser || !sessionUser.user) {
            return new Response(JSON.stringify({message: 'User ID is required'}), {status: 401})
        }

        const {user} = sessionUser;

        // Can not send messgae to self
        if (user.id === recipient) {
            return new Response(JSON.stringify({message:'Can not send message to your self'}), {status:400})
        }

        // send the message/submit to Message model
        const newMessage = new Message({
            sender : user.id,
            recipient, 
            property,
            name,
            email,
            phone, 
            body
        });

        await newMessage.save();

        return new Response(JSON.stringify({message: 'message sent'}), {status:200})

    } catch (error) {
        console.log(error)
        return new Response('something went wrong', {status:500})
    }
}