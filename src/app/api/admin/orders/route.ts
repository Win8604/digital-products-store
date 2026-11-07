import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-auth';
export const runtime='nodejs';
export async function GET(){if(!await isAdmin())return NextResponse.json({error:'Unauthorized'},{status:401});try{const orders=await prisma.order.findMany({orderBy:{createdAt:'desc'},take:100,select:{id:true,code:true,customerEmail:true,amount:true,status:true,paymentMethod:true,createdAt:true,product:{select:{name:true}}}});return NextResponse.json({orders});}catch{return NextResponse.json({error:'Database chưa được cấu hình.'},{status:503});}}
