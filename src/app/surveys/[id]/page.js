'use client';

import { Suspense } from 'react';
import SurveyDetail from '../../components/SurveyDetail';
import Loading from '../../components/Loading';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Metadata is handled in a separate layout.js file

export default function SurveyPage({ params }) {
  // Access the id directly from the params object without destructuring
  // This is the recommended pattern for Next.js App Router
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-24 pb-16">
        <Suspense fallback={<Loading />}>
          <SurveyDetail id={params.id} />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
