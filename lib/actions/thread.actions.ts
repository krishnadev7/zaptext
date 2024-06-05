"use server";
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.models";
import User from "../models/user.models";
import { connectToDb } from "../mongoose";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createThread({
  text,
  author,
  communityId,
  path,
}: Params) {
  try {
    connectToDb();


    console.log("Thread data", text, author, communityId);
    console.log("path", path);

    if (!text || !author) {
      throw new Error("Text and author are required");
    }

    const createThread = await Thread.create({
      text,
      author,
      community: communityId,
    });

    if (!createThread) {
      throw new Error("Failed to create thread");
    }

    // Updating user model
    await User.findByIdAndUpdate(author, {
      $push: { threads: createThread._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failded to create thread ${error.message}`);
  }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDb();

  // calculating number of pages to skip
  const skipAmount = (pageNumber - 1) * pageSize;
  try {
    const postQuery = Thread.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({ createdAt: "descending" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "author", model: "User" })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: "User",
          select: "_id name parentId image",
        },
      });

    const totalPostcount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const posts = await postQuery.exec();

    const nextPost = totalPostcount > skipAmount + posts.length;

    return { nextPost, posts };
  } catch (error: any) {
    throw new Error(`Failed to fetch posts ${error.message}`);
  }
}

export async function fetchThreadById(id: String) {
  connectToDb();

  try {
    const thread = await Thread.findById(id)
      .populate({
        path: "author",
        model: "User",
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: "User",
            select: "_id id name parentId image",
          },
          {
            path: "children",
            model: "Thread",
            populate: {
              path: "author",
              model: "User",
              select: "_id id name parentId image",
            },
          },
        ],
      })
      .exec();

    return thread;
  } catch (error: any) {
    throw new error(`Error fetching thread ${error.message}`);
  }
}

export async function commentingToThread(
  threadId: String,
  commentText: String,
  userId: String,
  path: String
) {
  connectToDb();
  try {
    // Finding the original Thread
    const originalThread = await Thread.findById(threadId);

    if (!originalThread) {
      throw new Error("Thread not found!");
    }

    // creating a new comment thread
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    });

    const savedThread = await commentThread.save();

    // Ensure originalThread.children is an array
    if (!Array.isArray(originalThread.children)) {
      originalThread.children = [];
    }

    // updating the original thread
    originalThread.children.push(savedThread._id);

    //saving original thread
    await originalThread.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to add a comment ${error.message}`);
  }
}
