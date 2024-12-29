import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma";
const GetData = async () => {
    const data = await prisma.user.findMany()
    return data
  };
  const insertData = () => {
    const data = prisma.user.create({
      data: {
        email: "gsnr1925@gmail.com",
        password: "hi",
        name: "Sainath",
      },
    });
    return data
  };
  const DeleteData = () => {
    console.log("delete");
  };
  const updateData = () => {
    console.log("update");
  };

export async function POST(req:NextRequest,res :NextResponse) {
    const data  = insertData()
    

    return NextResponse.json(data);
    
}