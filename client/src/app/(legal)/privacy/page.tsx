import React from "react";

export const metadata = {
  title: "Privacy Policy | URL Shortener",
  description: "Our privacy policy and data collection practices",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

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
          This Privacy Policy describes how URL Shortener (&quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;) collects, uses, and shares
          information when you use our website and services
          (&quot;Services&quot;).
        </p>
        <p>
          By using our Services, you agree to the collection and use of
          information in accordance with this policy. If you do not agree with
          our policies, please do not use our Services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          2. Information We Collect
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-medium mb-2">
              2.1 Personal Information
            </h3>
            <p>
              When you create an account, we collect information such as your
              name, email address, and other contact information. This
              information is used to provide and improve our Services, send
              notifications, and communicate with you.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">2.2 Usage Data</h3>
            <p>
              We collect information about how you interact with our Services,
              including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>URLs you shorten</li>
              <li>Click data on shortened URLs</li>
              <li>IP addresses of link visitors</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Geographic location (country/region level)</li>
              <li>Referring websites</li>
              <li>Time and date of visits</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">2.3 Cookies</h3>
            <p>
              We use cookies and similar tracking technologies to track activity
              on our Services and hold certain information. Cookies are files
              with a small amount of data that may include an anonymous unique
              identifier.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          3. How We Use Your Information
        </h2>
        <p className="mb-4">
          We use the information we collect for various purposes, including:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Providing and maintaining our Services</li>
          <li>Analyzing usage patterns to improve our Services</li>
          <li>Detecting, preventing, and addressing technical issues</li>
          <li>
            Providing analytics about the performance of your shortened URLs
          </li>
          <li>Communicating with you about your account and our Services</li>
          <li>Enforcing our Terms of Service</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          4. Data Sharing and Disclosure
        </h2>
        <p className="mb-4">
          We may share your information in the following circumstances:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>
            <strong>Service Providers:</strong> We may employ third-party
            companies and individuals to facilitate our Services, provide
            services on our behalf, or assist us in analyzing how our Services
            are used.
          </li>
          <li>
            <strong>Legal Requirements:</strong> We may disclose your
            information if required by law, governmental request, or when we
            believe that disclosure is necessary to protect our rights or
            safety.
          </li>
          <li>
            <strong>Business Transfers:</strong> In the event of a merger,
            acquisition, or asset sale, your information may be transferred as
            part of that transaction.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal
          information. However, no method of transmission over the Internet or
          electronic storage is 100% secure. While we strive to use commercially
          acceptable means to protect your personal information, we cannot
          guarantee its absolute security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Your Data Rights</h2>
        <p className="mb-4">
          Depending on your location, you may have certain rights regarding your
          personal information, including:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Accessing the personal information we hold about you</li>
          <li>Correcting inaccurate or incomplete information</li>
          <li>Requesting deletion of your personal information</li>
          <li>
            Restricting or objecting to our processing of your information
          </li>
          <li>Requesting transfer of your information to another service</li>
        </ul>
        <p>
          To exercise these rights, please contact us using the information
          provided in the Contact section.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          7. Children&apos;s Privacy
        </h2>
        <p>
          Our Services are not intended for use by children under the age of 13.
          We do not knowingly collect personal information from children under
          13. If you become aware that a child has provided us with personal
          information, please contact us immediately.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          8. Changes to This Privacy Policy
        </h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page and
          updating the &quot;last updated&quot; date. You are advised to review
          this Privacy Policy periodically for any changes.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at{" "}
          <a
            href="mailto:privacy@urlshortener.com"
            className="text-primary underline"
          >
            privacy@urlshortener.com
          </a>
        </p>
      </section>
    </div>
  );
}
