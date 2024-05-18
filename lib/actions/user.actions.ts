"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.models";
import { connectToDb } from "../mongoose";

interface Params{
  userId: String,
  username: String,
  name: String,
  image: String,
  bio: String,
  path: String
}

export async function updateUser({
  userId,
  username,
  name,
  image,
  bio,
  path,
}:Params): Promise<void> {
  connectToDb();

  try {
    await User.findOneAndUpdate(
        { id: userId },
        {
          username: username.toLowerCase(),
          name,
          image,
          bio,
          onboarded: true,
        },
        { upsert: true }
      );
    
      if(path == "profile/edit"){
        revalidatePath(path);
      }
  } catch (error: any) {
    throw new Error(`Failed to create/update user ${error.message}`)
  }
  
}
