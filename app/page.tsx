'use client';

import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleFounderClick = () => {
    if (isSignedIn) {
      router.push('/founder');
    } else {
      router.push('/signup?redirect_url=/founder');
    }
  };

  const founderCount = 0;
  const founderLimit = 100;
  const spotsRemaining = founderLimit - founderCount;
  const progressPercent = (founderCount / founderLimit) * 100;

  return (
    <main
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(to bottom, #050505 0%, #0f172a 45%, #000000 100%)',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <section
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.04)',
          padding: '14px 20px',
          position: 'sticky',
          top: 0,
          backdropFilter: 'blur(8px)',
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '10px',
              fontSize: '14px',
              fontWeight: 700,
            }}
          >
            <span>{founderCount} Founders Joined</span>
            <span>{spotsRemaining} Founder Spots Remaining</span>
          </div>

          <div
            style={{
              width: '100%',
              height: '10px',
              background: 'rgba(255,255,255,0.12)',
              borderRadius: '999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: 'white',
                borderRadius: '999px',
              }}
            />
          </div>
        </div>
      </section>

      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '72px 20px 48px',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <Image
            src="/logo.png"
            alt="S8NT AI Logo"
            width={70}
            height={70}
            style={{ margin: '0 auto' }}
          />
        </div>

        <h1
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
            lineHeight: 1.1,
            margin: '0 auto 18px',
            maxWidth: '800px',
            fontWeight: 800,
          }}
        >
          Help Build the First AI Research Platform Centered on Black History,
          Culture, and Intellectual Inquiry
        </h1>

        <p
          style={{
            fontSize: '1.1rem',
            lineHeight: 1.7,
            maxWidth: '760px',
            margin: '0 auto 30px',
            color: '#d1d5db',
          }}
        >
          S8NT AI is being built to give users a better way to explore history,
          ask deeper questions, and access culturally grounded knowledge through
          AI. Become a founding member and help bring the platform to life.
        </p>

        <div
          style={{
            marginTop: '40px',
            marginBottom: '30px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Image
            src="/chat-example.png"
            alt="Example of S8NT AI chatbot"
            width={350}
            height={250}
            style={{
              borderRadius: '16px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={handleFounderClick}
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
            Become a Founder
          </button>

          <button
            onClick={() => {
  if (isSignedIn) {
    router.push('/waitlist');
  } else {
    router.push('/signup?redirect_url=/waitlist');
  }
}}
            style={{
              padding: '14px 28px',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.25)',
              background: 'transparent',
              color: '#F59E0B',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Join the Waitlist
          </button>
        </div>
      </section>

      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '20px 20px 70px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '18px',
          }}
        >
          {[
            {
              title: 'What It Is',
              text: 'An AI-powered research and discovery platform built around curated historical, cultural, and educational material.',
            },
            {
              title: 'Why It Matters',
              text: 'Most AI tools are broad and generic. S8NT AI is being built with a more intentional focus, clearer context, and deeper cultural relevance.',
            },
            {
              title: 'What Founders Support',
              text: 'Founder contributions help fund development, design improvements, infrastructure, and the initial launch of the platform.',
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '20px',
                padding: '24px',
              }}
            >
              <h2
                style={{
                  margin: '0 0 12px',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                }}
              >
                {item.title}
              </h2>
              <p
                style={{
                  margin: 0,
                  color: '#d1d5db',
                  lineHeight: 1.7,
                  fontSize: '0.98rem',
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 20px 70px',
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px',
            padding: '32px',
          }}
        >
          <h2
            style={{
              margin: '0 0 18px',
              fontSize: '1.8rem',
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            Founder Benefits
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginTop: '20px',
            }}
          >
            {[
              'Lifetime free access',
              'Recognition as an early supporter',
              'Founding member badge',
              'Priority updates and launch news',
            ].map((benefit) => (
              <div
                key={benefit}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: '16px',
                  padding: '18px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  fontWeight: 700,
                }}
              >
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 20px 90px',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: '2rem',
            marginBottom: '14px',
            fontWeight: 800,
          }}
        >
          Limited to 100 founding members
        </h2>

        <p
          style={{
            color: '#d1d5db',
            lineHeight: 1.7,
            maxWidth: '680px',
            margin: '0 auto 26px',
          }}
        >
          Join early, support the launch, and secure your place as one of the
          first supporters behind S8NT AI.
        </p>

        <button
          onClick={handleFounderClick}
          style={{
            padding: '16px 34px',
            borderRadius: '999px',
            border: 'none',
            background: '#F59E0B',
            color: 'black',
            fontWeight: 800,
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Become a Founder
        </button>
      </section>
    </main>
  );
}