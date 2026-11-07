import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { createAdminToken, adminCookieName } from '@/lib/admin-auth';
export const runtime = 'nodejs';
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const supplied = String(body.password || '');
  const expected = process.env.ADMIN_PASSWORD || '';
  if (!expected || !process.env.ADMIN_SESSION_SECRET) return NextResponse.json({error:'Admin chưa được cấu hình.'},{status:503});
  const a=Buffer.from(supplied); const b=Buffer.from(expected);
  if (a.length!==b.length || !timingSafeEqual(a,b)) return NextResponse.json({error:'Mật khẩu không đúng.'},{status:401});
  const res=NextResponse.json({ok:true});
  res.cookies.set(adminCookieName,createAdminToken(),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:8*60*60});
  return res;
}
