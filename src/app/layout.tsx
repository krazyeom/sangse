import './globals.css';

export const metadata = {
  title: 'DeptGift - 백화점 상품권 시세 비교',
  description: '신세계, 롯데, 현대 백화점 상품권 매입가 실시간 비교',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
