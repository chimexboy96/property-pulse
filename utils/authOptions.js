import User from '@/models/User'
import connectDb from '@/config/database';

import GoogleProvider from 'next-auth/providers/google';



export const authOptions={
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
              }
        })
    ],

    callbacks:{
        // Invoked on successful signin 
        async signIn({profile}){
            // 1 connect to the database
            await connectDb()
            // 2 check if user exists
            const userExists= await User.findOne({email: profile.email})
            // 3 if not, add user to database
            if(!userExists){
                // Truncate username if too long
                const username= profile.name.slice(0, 20);
                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture
                });
            }
            // 4 return true to allow signin
            return true;
        },

        // Modifie the session objects
        async session({session}){
            // 1 get user from the database
            const user= await User.findOne({email: session.user.email})
            // 2 assign the user id to the session
            session.user.id= user._id.toString()
            // 3 return session
            return session;
        },

    }
    
} 