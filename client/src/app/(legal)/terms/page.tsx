import React from "react";

export const metadata = {
  title: "Terms of Service | URL Shortener",
  description: "Terms and conditions for using our URL shortener service",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <p className="mb-6 text-sm text-muted-foreground">
        Last updated:{" "}
        {new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="mb-4">
          Welcome to URL Shortener. These Terms of Service (&quot;Terms&quot;)
          govern your use of our website, products, and services
          (&quot;Services&quot;). By using our Services, you agree to these
          Terms. If you do not agree with these Terms, please do not use our
          Services.
        </p>
        <p>
          We may modify these Terms at any time. If we make changes, we will
          provide notice by updating the date at the top of these Terms. Your
          continued use of our Services after any changes constitutes your
          acceptance of the new Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Account Registration</h2>
        <p className="mb-4">
          To use certain features of our Services, you may need to create an
          account. When you create an account, you must provide accurate and
          complete information. You are responsible for maintaining the security
          of your account and password.
        </p>
        <p>
          We reserve the right to suspend or terminate your account if any
          information provided during registration or thereafter proves to be
          inaccurate, false, or in violation of these Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Acceptable Use</h2>
        <p className="mb-4">You agree not to use our Services to:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Violate any applicable laws or regulations.</li>
          <li>
            Infringe upon the rights of others, including intellectual property
            rights.
          </li>
          <li>Share, distribute, or promote illegal content.</li>
          <li>
            Attempt to deceive others through phishing or other fraudulent
            practices.
          </li>
          <li>Distribute malware, viruses, or other harmful code.</li>
          <li>
            Engage in activities that could disable, overburden, or impair our
            Services.
          </li>
          <li>Collect or harvest user data without explicit consent.</li>
        </ul>
        <p>
          We reserve the right to remove any shortened URLs that violate our
          acceptable use policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Shortened URLs</h2>
        <p className="mb-4">
          We do not guarantee the availability or accessibility of shortened
          URLs for any specific period. URLs may be removed if they violate our
          Terms or have been inactive for an extended period.
        </p>
        <p className="mb-4">
          You are solely responsible for the content of the destination page
          linked by your shortened URL. We do not review or endorse the content
          of destination pages.
        </p>
        <p>
          We reserve the right to disable any shortened URL at our discretion
          without prior notice.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          5. Limitation of Liability
        </h2>
        <p className="mb-4">
          Our Services are provided &quot;as is&quot; without warranties of any
          kind, either express or implied. We do not guarantee that our Services
          will be uninterrupted, secure, or error-free.
        </p>
        <p>
          In no event shall we be liable for any direct, indirect, incidental,
          special, or consequential damages arising out of or in connection with
          your use of our Services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
        <p>
          We may terminate or suspend your access to our Services immediately,
          without prior notice or liability, for any reason, including breach of
          these Terms. Upon termination, your right to use our Services will
          cease immediately.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
        <p>
          If you have any questions about these Terms, please contact us at{" "}
          <a
            href="mailto:legal@urlshortener.com"
            className="text-primary underline"
          >
            legal@urlshortener.com
          </a>
        </p>
      </section>
    </div>
  );
}
