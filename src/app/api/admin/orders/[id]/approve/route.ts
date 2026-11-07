import { NextRequest,NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/admin-auth';
export const runtime='nodejs';
export async function POST(_req:NextRequest,{params}:{params:Promise<{id:string}>}){if(!await isAdmin())return NextResponse.json({error:'Unauthorized'},{status:401});const {id}=await params;try{const order=await prisma.order.updateMany({where:{id,status:'AWAITING_CONFIRMATION'},data:{status:'PAID',paidAt:new Date()}});if(!order.count)return NextResponse.json({error:'Đơn không tồn tại hoặc không ở trạng thái chờ xác nhận.'},{status:409});return NextResponse.json({ok:true});}catch{return NextResponse.json({error:'Không thể cập nhật đơn hàng.'},{status:503});}}
