'use client';

import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function FounderPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const [isBackHovered, setIsBackHovered] = useState(false);

  // Kept exactly the same so the Stripe link does not get messed up
  const STRIPE_PAYMENT_LINK =
    'https://buy.stripe.com/7sY28tgIwcKL25r7MX9Ve01';

  const handlePayment = () => {
    if (!isSignedIn) {
      router.push('/signup?redirect_url=/founder');
      return;
    }

    window.location.href = STRIPE_PAYMENT_LINK;
  };

  const founderBenefits = [
    'Lifetime access with no monthly fee',
    'Founder badge displayed on your profile',
    'Recognition as an original supporter',
    'Priority updates on launch and new features',
  ];

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top, rgba(245,158,11,0.12), transparent 30%), linear-gradient(to bottom, #050505 0%, #0f172a 45%, #000000 100%)',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        padding: '32px 20px 80px',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <button
          onClick={() => router.push('/')}
          onMouseEnter={() => setIsBackHovered(true)}
          onMouseLeave={() => setIsBackHovered(false)}
          style={{
            marginBottom: '24px',
            background: 'transparent',
            color: '#d1d5db',
            border: '1px solid rgba(255,255,255,0.16)',
            borderRadius: '999px',
            padding: '10px 16px',
            cursor: 'pointer',
            fontWeight: 700,
            transform: isBackHovered ? 'translateX(-2px)' : 'translateX(0)',
            borderColor: isBackHovered
              ? 'rgba(255,255,255,0.28)'
              : 'rgba(255,255,255,0.16)',
            transition:
              'transform 0.18s ease, border-color 0.18s ease, color 0.18s ease',
          }}
        >
          ← Back
        </button>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            alignItems: 'stretch',
          }}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: '28px',
              padding: '42px 28px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div style={{ marginBottom: '22px' }}>
              <Image
                src="/logo.png"
                alt="S8NT AI Logo"
                width={84}
                height={84}
                style={{ borderRadius: '20px' }}
              />
            </div>

            <div
              style={{
                display: 'inline-block',
                background: 'rgba(245,158,11,0.15)',
                border: '1px solid rgba(245,158,11,0.35)',
                color: '#F59E0B',
                borderRadius: '999px',
                padding: '8px 16px',
                fontWeight: 800,
                fontSize: '0.9rem',
                marginBottom: '18px',
              }}
            >
              Limited to 100 founding members
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                lineHeight: 1.05,
                marginBottom: '18px',
                fontWeight: 900,
                letterSpacing: '-0.03em',
              }}
            >
              Become a Founding Member of S8NT
            </h1>

            <p
              style={{
                color: '#d1d5db',
                fontSize: '1.06rem',
                lineHeight: 1.75,
                maxWidth: '640px',
                marginBottom: '18px',
              }}
            >
              Join the earliest supporters helping bring S8NT to life. This is a
              one-time opportunity to lock in founder status before launch and be
              recognized as part of the first 100 supporters.
            </p>

            <p
              style={{
                color: '#e5e7eb',
                fontSize: '1rem',
                lineHeight: 1.75,
                marginBottom: '0',
              }}
            >
              The people who get in early are the ones remembered. Founder access
              gives you permanent early-supporter status and lifetime access to the
              platform for a one-time payment.
            </p>
          </div>

          <div
            style={{
              background:
                'linear-gradient(to bottom, rgba(255,255,255,0.07), rgba(255,255,255,0.04))',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '28px',
              padding: '32px 24px',
              boxShadow: '0 20px 80px rgba(0,0,0,0.35)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '10px',
                marginBottom: '18px',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: '#ffffff',
                  letterSpacing: '-0.04em',
                }}
              >
                $100
              </span>
              <span
                style={{
                  color: '#9ca3af',
                  fontWeight: 700,
                }}
              >
                one-time
              </span>
            </div>

            <p
              style={{
                color: '#d1d5db',
                lineHeight: 1.7,
                marginBottom: '24px',
              }}
            >
              Secure founder access now and keep your benefits for the life of the
              platform.
            </p>

            <div
              style={{
                display: 'grid',
                gap: '14px',
                marginBottom: '28px',
              }}
            >
              {founderBenefits.map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px',
                    padding: '16px',
                  }}
                >
                  <span
                    style={{
                      color: '#F59E0B',
                      fontWeight: 900,
                      fontSize: '1rem',
                      lineHeight: 1.4,
                    }}
                  >
                    ✓
                  </span>
                  <span
                    style={{
                      fontWeight: 700,
                      color: '#f9fafb',
                      lineHeight: 1.5,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                marginBottom: '18px',
                color: '#9ca3af',
                fontSize: '0.95rem',
                lineHeight: 1.6,
              }}
            >
              {isSignedIn
                ? `Signed in as ${user?.primaryEmailAddress?.emailAddress}`
                : 'You will be asked to sign up before payment.'}
            </div>

            <button
              onClick={handlePayment}
              onMouseEnter={() => setIsCtaHovered(true)}
              onMouseLeave={() => setIsCtaHovered(false)}
              style={{
                width: '100%',
                padding: '17px 24px',
                borderRadius: '999px',
                border: 'none',
                background: '#F59E0B',
                color: 'black',
                fontWeight: 900,
                fontSize: '1rem',
                cursor: 'pointer',
                transform: isCtaHovered ? 'scale(1.05)' : 'scale(1)',
                boxShadow: isCtaHovered
                  ? '0 12px 35px rgba(245,158,11,0.42)'
                  : '0 10px 30px rgba(245,158,11,0.35)',
                transition: 'transform 0.18s ease, box-shadow 0.18s ease',
              }}
            >
              {isSignedIn ? 'Continue to Payment' : 'Sign Up to Become a Founder'}
            </button>

            <p
              style={{
                marginTop: '16px',
                color: '#9ca3af',
                fontSize: '0.9rem',
                textAlign: 'center',
                lineHeight: 1.6,
              }}
            >
              Founder spots are capped at 100 and this offer will not remain open
              permanently.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}