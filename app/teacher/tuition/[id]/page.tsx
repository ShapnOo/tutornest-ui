"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { TuitionDetails } from "@/components/tuition/tuition-details"

type PageProps = {
  params: { id: string }
}

export default function TeacherTuitionViewPage({ params }: PageProps) {
  return (
    <DashboardLayout userType="teacher" userName="Tahmid Afsar Shapno">
      <TuitionDetails tuitionId={params.id} userType="teacher" />
    </DashboardLayout>
  )
}
