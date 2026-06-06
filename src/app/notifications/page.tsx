export default function Notifications() {
  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      <header>
        <div className="logo">
          <h1>알림 설정</h1>
        </div>
      </header>
      <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔔</div>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
          알림 기능 준비 중
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          원하는 시세에 도달했을 때 알려드리는 맞춤 알림 기능이<br />추후 업데이트 될 예정입니다. 조금만 기다려 주세요!
        </p>
      </div>
    </div>
  );
}
