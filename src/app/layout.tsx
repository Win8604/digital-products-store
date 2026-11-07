import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Kho Số — Sản phẩm số chất lượng',description:'Mua mã nguồn, template và tài liệu số trực tuyến.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="vi"><body>{children}</body></html>}
