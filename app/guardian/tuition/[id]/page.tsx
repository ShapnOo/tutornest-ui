"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { TuitionDetails } from "@/components/tuition/tuition-details"

type PageProps = {
  params: { id: string }
}

export default function GuardianTuitionViewPage({ params }: PageProps) {
  return (
    <DashboardLayout userType="guardian" userName="Zahidul Islam">
      <TuitionDetails tuitionId={params.id} userType="guardian" />
    </DashboardLayout>
  )
}
