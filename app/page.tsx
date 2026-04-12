'use client';

import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleWaitlistClick = () => {
    if (isSignedIn) {
      router.push('/waitlist');
    } else {
      router.push('/signup?redirect_url=/waitlist');
    }
  };

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
          Most AI Tools Don't Tell The Full Story
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
          S8NT AI is built for deeper inquiry — helping users explore history,
          culture, and complex ideas — while also providing practical tools for
          writing, communication, and business use.
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

        <section
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '40px 20px 60px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '1.8rem',
              marginBottom: '16px',
              fontWeight: 800,
            }}
          >
            From Research to Real-World Use
          </h2>

          <p
            style={{
              maxWidth: '680px',
              margin: '0 auto 30px',
              color: '#d1d5db',
              lineHeight: 1.7,
            }}
          >
            S8NT AI isn’t just for exploring ideas — it helps you apply them.
            Generate website copy, refine messaging, and turn knowledge into
            real business output.
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Image
              src="/web-copy.png"
              alt="S8NT AI Website Copy Example"
              width={380}
              height={300}
              style={{
                borderRadius: '16px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
        </section>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={handleWaitlistClick}
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
            Get Free Access
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
              title: 'From Insight to Business Execution',
              text: 'S8NT AI bridges the gap between learning and application — turning information into usable output for business, writing, and communication.',
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
          Get Free Access
        </h2>

        <p
          style={{
            color: '#d1d5db',
            lineHeight: 1.7,
            maxWidth: '680px',
            margin: '0 auto 26px',
          }}
        >
          Be among the first to access S8NT AI and stay updated on the launch.
        </p>

        <button
          onClick={handleWaitlistClick}
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
          Get Free Access
        </button>
      </section>
    </main>
  );
}