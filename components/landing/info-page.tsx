import Link from "next/link";

type InfoPageProps = {
  title: string;
  description: string;
};

export default function InfoPage({ title, description }: InfoPageProps) {
  return (
    <main className="min-h-screen bg-[#f8faf8] text-[#111827]">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center border border-[#d1d5db] bg-white px-3 py-2 text-sm text-[#374151] hover:text-[#111827]"
        >
          Back to home
        </Link>
        <h1 className="mt-8 text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-4 text-lg text-[#4b5563]">{description}</p>
      </div>
    </main>
  );
}
