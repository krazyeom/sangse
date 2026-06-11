import './globals.css';

export const metadata = {
  title: 'Sang Tech - 백화점 상품권 시세 비교',
  description: '주요 백화점 상품권 매입 시세를 한눈에 비교하세요',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <nav className="main-nav">
          <div className="nav-container">
            <a href="/" className="nav-logo">Sang Tech</a>
            <div className="nav-links">
              <a href="/">시세 비교</a>
              <a href="/history">시세 변동</a>
              <a href="/market-calculator">시세 계산기</a>
              <a href="/calculator">계산기</a>
              <a href="/automation">자동화</a>
              <a href="/notifications">알림</a>
            </div>
          </div>
        </nav>
        <div style={{ flex: 1 }}>
          {children}
        </div>
        <footer style={{
          textAlign: 'center',
          padding: '2rem 1rem',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          background: 'var(--card-bg)',
          borderTop: '1px solid var(--border-color)',
          marginTop: 'auto'
        }}>
          <div style={{ marginBottom: '0.8rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--background)', padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--border-color)', fontWeight: '500' }}>
              ☕️ 개발자에게 커피 한 잔 후원하기
            </span>
          </div>
          <div style={{ letterSpacing: '0.02em' }}>
            made by krazyeom | 그래염 @ LTC
          </div>
        </footer>
      </body>
    </html>
  );
}
