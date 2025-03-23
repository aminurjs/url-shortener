import React from "react";

export const metadata = {
  title: "Documentation | URL Shortener",
  description: "Learn how to use our URL shortener service",
};

export default function DocsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Documentation</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <div className="space-y-4">
          <p>
            Welcome to the URL Shortener documentation. This guide will help you
            understand how to use our service to create, manage, and track
            shortened URLs.
          </p>
          <p>
            Our URL shortener allows you to convert long, unwieldy URLs into
            short, memorable links that are easier to share and track.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          How to Create a Shortened URL
        </h2>
        <div className="space-y-4">
          <ol className="list-decimal pl-5 space-y-2">
            <li>Sign up for an account or log in to your existing account.</li>
            <li>Navigate to the Dashboard.</li>
            <li>Click on &quot;Create New Link&quot; button.</li>
            <li>Enter the long URL you want to shorten.</li>
            <li>Optionally, customize the short link or add tags.</li>
            <li>Click &quot;Create&quot; to generate your shortened URL.</li>
          </ol>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium mb-2">URL Shortening</h3>
            <p>
              Convert long URLs into short, manageable links that redirect to
              your original URL.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">QR Codes</h3>
            <p>
              Generate QR codes for your shortened URLs for easy mobile access
              and offline marketing materials.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">Analytics</h3>
            <p>
              Track clicks, geographic data, referrers, devices, and other
              metrics for your shortened URLs.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">Custom Links</h3>
            <p>
              Create branded and memorable custom short links instead of using
              randomly generated characters.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-2">Link Management</h3>
            <p>
              Organize, edit, and manage all your shortened URLs in one place.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">API Documentation</h2>
        <p>
          Our URL shortener also provides a RESTful API for developers who want
          to integrate our service into their applications. The API allows you
          to programmatically create, manage, and track shortened URLs.
        </p>
        <div className="mt-4 p-4 bg-muted rounded-md">
          <p className="font-mono">
            Base URL: <code>https://api.urlshortener.com/v1</code>
          </p>
        </div>
        <p className="mt-4">
          For detailed API documentation, please contact our support team.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Support</h2>
        <p>
          If you have any questions or issues, please contact our support team
          at{" "}
          <a
            href="mailto:support@urlshortener.com"
            className="text-primary underline"
          >
            support@urlshortener.com
          </a>
        </p>
      </section>
    </div>
  );
}
