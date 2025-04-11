"use client";

import dynamic from 'next/dynamic';
import { PageLoading } from "@/components/ui/page-loading";

const ECGChart = dynamic(
  () => import('@/components/ecg-chart'),
  { 
    ssr: false,
    loading: () => <PageLoading />
  }
);

export default function ECGPage() {
  return <ECGChart />;
}