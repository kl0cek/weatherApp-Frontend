import React from 'react';
import Head from 'next/head';
import { Navigation } from '@/components/Navigation';
import { HomePage } from '@/components/HomePage';

export default function Home() {
  return (
    <>
      <Head>
        <title>Weather App - Home</title>
      </Head>
      <div className="container mx-auto px-4 py-8">
        <Navigation />
        <HomePage />
      </div>
    </>
  );
}