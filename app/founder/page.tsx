'use client';

import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function FounderPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/5kQ4gBak8fWX4dz3wH9Ve00';

const handlePayment = () => {
  if (!isSignedIn) {
    router.push('/signup?redirect_url=/founder');
    return;
  }

  window.location.href = STRIPE_PAYMENT_LINK;
};

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(to bottom, #050505 0%, #0f172a 45%, #000000 100%)',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        padding: '40px 20px 80px',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <button
          onClick={() => router.push('/')}
          style={{
            marginBottom: '24px',
            background: 'transparent',
            color: '#d1d5db',
            border: '1px solid rgba(255,255,255,0.16)',
            borderRadius: '999px',
            padding: '10px 16px',
            cursor: 'pointer',
            fontWeight: 700,
          }}
        >
          ← Back
        </button>

        <div
          style={{
            textAlign: 'center',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px',
            padding: '40px 24px',
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
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              marginBottom: '16px',
              fontWeight: 800,
            }}
          >
            Become a Founding Member
          </h1>

          <p
            style={{
              maxWidth: '640px',
              margin: '0 auto 28px',
              color: '#d1d5db',
              lineHeight: 1.7,
            }}
          >
            Founding members help launch S8NT AI and support development of the
            platform. Your contribution funds infrastructure, design, and the
            initial release of the system.
          </p>

          <div
            style={{
              display: 'inline-block',
              background: 'rgba(245,158,11,0.15)',
              border: '1px solid rgba(245,158,11,0.4)',
              color: '#F59E0B',
              borderRadius: '999px',
              padding: '10px 18px',
              fontWeight: 800,
              marginBottom: '30px',
            }}
          >
            Founder Access — $40
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              textAlign: 'left',
              marginBottom: '32px',
            }}
          >
            {[
              'Lifetime free access',
              'Recognition as an original supporter',
              'Founder badge on profile',
              'Priority launch updates',
            ].map((item) => (
              <div
                key={item}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '18px',
                  fontWeight: 700,
                }}
              >
                {item}
              </div>
            ))}
          </div>

          <div
            style={{
              marginBottom: '16px',
              color: '#9ca3af',
              fontSize: '0.95rem',
            }}
          >
            {isSignedIn
              ? `Signed in as ${user?.primaryEmailAddress?.emailAddress}`
              : 'You will be asked to sign up before payment.'}
          </div>

          <button
            onClick={handlePayment}
            style={{
              padding: '16px 34px',
              borderRadius: '999px',
              border: 'none',
              background: '#F59E0B',
              color: 'black',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(245,158,11,0.35)',
            }}
          >
            {isSignedIn ? 'Continue to Payment' : 'Sign Up to Become a Founder'}
          </button>

          <p
            style={{
              marginTop: '18px',
              color: '#9ca3af',
              fontSize: '0.9rem',
            }}
          >
            Limited to 100 founding members.
          </p>
        </div>
      </div>
    </main>
  );
}