import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

const COOKIE = 'store_admin_session';
function secret() { return process.env.ADMIN_SESSION_SECRET || ''; }
function signature(value: string) { return createHmac('sha256', secret()).update(value).digest('hex'); }
export async function isAdmin() {
  const key = secret();
  if (!key || !process.env.ADMIN_PASSWORD) return false;
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value || '';
  const [expires, sig] = token.split('.');
  if (!expires || !sig || Number(expires) < Date.now()) return false;
  const expected = signature(expires);
  const a = Buffer.from(sig); const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a,b);
}
export function createAdminToken() {
  const expires = String(Date.now() + 8 * 60 * 60 * 1000);
  return expires + '.' + signature(expires);
}
export const adminCookieName = COOKIE;
