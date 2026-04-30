export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-3xl space-y-6 leading-7 text-gray-300">
        <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>

        <p>
          <strong>Effective Date:</strong> April 30, 2026
        </p>

        <p>
          This Privacy Policy explains how S8NT collects, uses, stores, and
          protects information when you use our platform.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-white mt-8">
            1. Information We Collect
          </h2>
          <p>We may collect the following information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Account information, such as your email address and username</li>
            <li>Authentication data provided through third-party login services</li>
            <li>Chat inputs, prompts, questions, and platform interactions</li>
            <li>Usage data, such as feature use, limits, timestamps, and activity</li>
            <li>Device, browser, and technical information</li>
            <li>Payment and subscription status through third-party processors</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mt-8">
            2. How We Use Information
          </h2>
          <p>We use information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and improve S8NT</li>
            <li>Create and manage user accounts</li>
            <li>Process subscriptions and payments</li>
            <li>Track usage limits and account tiers</li>
            <li>Prevent abuse, fraud, and unauthorized activity</li>
            <li>Improve platform performance and user experience</li>
            <li>Communicate important updates</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mt-8">
            3. AI Processing
          </h2>
          <p>
            Your prompts and inputs may be processed by AI systems to generate
            responses. AI outputs may be inaccurate or incomplete. We may use
            aggregated or anonymized information to improve the platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mt-8">
            4. Payments
          </h2>
          <p>
            Payments are processed by third-party payment providers such as
            Stripe. S8NT does not store full credit card numbers or full payment
            credentials on its own servers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mt-8">
            5. Third-Party Services
          </h2>
          <p>
            We may use third-party services for authentication, hosting,
            databases, payments, analytics, email, and AI processing. These
            providers may process data according to their own privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mt-8">
            6. Sharing of Information
          </h2>
          <p>
            We do not sell your personal information. We may share information
            with service providers, legal authorities when required, or in
            connection with protecting S8NT, users, or the public.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mt-8">
            7. Data Retention
          </h2>
          <p>
            We retain information for as long as necessary to operate S8NT,
            comply with legal obligations, resolve disputes, enforce agreements,
            and improve the platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mt-8">
            8. Security
          </h2>
          <p>
            We use reasonable safeguards to protect information. However, no
            system is completely secure, and we cannot guarantee absolute
            security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mt-8">
            9. Your Rights
          </h2>
          <p>
            Depending on your location, you may have the right to access, update,
            correct, or request deletion of your personal information. To make a
            request, contact us using the email below.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mt-8">
            10. Children’s Privacy
          </h2>
          <p>
            S8NT is not intended for children under 13. We do not knowingly
            collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mt-8">
            11. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Continued use of
            S8NT after updates means you accept the revised policy.
          </p>
        </section>

      </div>
    </main>
  );
}