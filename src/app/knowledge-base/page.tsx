export default function KnowledgeBasePage() {
  return (
    <div className="p-4 lg:px-20 bg-slate-50 text-black min-h-screen lg:text-sm space-y-10">
      {/* Header */}
      <header className="space-y-2">   
        <h1 className="text-3xl font-bold">SafeSurf VPN Knowledge Base</h1>
        <p className="text-gray-600">
          Find answers to common questions, setup guides, and troubleshooting tips for SafeSurf VPN.
        </p>
      </header>

      {/* Getting Started */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Getting Started</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>How to create and verify your SafeSurf VPN account</li>
          <li>Download and install SafeSurf VPN on Windows, macOS, iOS, and Android</li>
          <li>How to connect to a VPN server</li>
          <li>Understanding your dashboard and subscription status</li>
        </ul>
      </section>

      {/* Troubleshooting */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Troubleshooting</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>VPN not connecting – possible fixes</li>
          <li>How to switch servers if one is slow</li>
          <li>Fixing login or authentication issues</li>
          <li>Steps if your internet slows down while using VPN</li>
        </ul>
      </section>

      {/* Billing & Subscriptions */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Billing & Subscriptions</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>How to upgrade or downgrade your VPN plan</li>
          <li>Accepted payment methods</li>
          <li>How to cancel your subscription</li>
          <li>Refund policy explained</li>
        </ul>
      </section>

      {/* Security & Privacy */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Security & Privacy</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Does SafeSurf VPN keep logs?</li>
          <li>How encryption works in SafeSurf VPN</li>
          <li>Kill switch and auto-connect features</li>
          <li>How to change your preferred VPN protocol</li>
        </ul>
      </section>

      {/* Contact Support */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Need More Help?</h2>
        <p className="text-gray-700">
          If you can’t find your answer here, visit our{" "}
          <a href="/support" className="text-blue-600 hover:underline">
            Support Page
          </a>{" "}
          or contact our 24/7 support team.
        </p>
      </section>
    </div>
  );
}
