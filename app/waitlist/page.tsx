'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function WaitlistPage() {
  const router = useRouter();

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(to bottom, #050505 0%, #0f172a 45%, #000000 100%)',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        padding: '40px 20px 80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '700px',
          textAlign: 'center',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '24px',
          padding: '40px 28px',
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <Image
            src="/logo.png"
            alt="S8NT AI Logo"
            width={80}
            height={80}
            style={{ margin: '0 auto' }}
          />
        </div>

        <h1
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.6rem)',
            marginBottom: '16px',
            fontWeight: 800,
          }}
        >
          You're on the Waitlist
        </h1>

        <p
          style={{
            color: '#d1d5db',
            lineHeight: 1.7,
            marginBottom: '30px',
          }}
        >
          Thank you for signing up for S8NT AI. You'll receive updates as the
          platform develops and when the system officially launches.
        </p>

        <button
          onClick={() => router.push('/')}
          style={{
            padding: '14px 28px',
            borderRadius: '999px',
            border: 'none',
            background: '#F59E0B',
            color: 'black',
            fontWeight: 800,
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Back to Home
        </button>
      </div>
    </main>
  );
}