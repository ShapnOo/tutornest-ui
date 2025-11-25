"use client"

import { useEffect, useRef, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Video, Mic, MicOff, VideoOff, ScreenShare, Paperclip, Send, MessageSquare } from "lucide-react"

type Message = { id: number; sender: string; text: string; time: string }

export default function TeacherOnlineClassDemoPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "Arif", text: "Sir, should we start with algebra today?", time: "5:02 PM" },
    { id: 2, sender: "You", text: "Yes, opening the chapter now.", time: "5:03 PM" },
  ])
  const [chatInput, setChatInput] = useState("")
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [cameraError, setCameraError] = useState<string>("")

  const stopCamera = () => {
    stream?.getTracks().forEach((t) => t.stop())
    setStream(null)
  }

  const startCamera = async () => {
    setCameraError("")
    try {
      const media = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setStream(media)
      if (videoRef.current) {
        videoRef.current.srcObject = media
      }
    } catch (err) {
      setCameraError("Could not access camera/mic. Please allow permissions.")
    }
  }

  useEffect(() => {
    return () => stopCamera()
  }, [])

  const handleSend = () => {
    const text = chatInput.trim()
    if (!text) return
    setMessages((prev) => [...prev, { id: prev.length + 1, sender: "You", text, time: "Now" }])
    setChatInput("")
  }

  return (
    <DashboardLayout userType="teacher" userName="Tahmid Afsar Shapno" userImage="/teacher-profile.png">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Online Class Demo</h1>
            <p className="text-xs text-muted-foreground">Live lesson view with chat and attachments</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Video className="h-3.5 w-3.5" /> Live
            </Badge>
            <Badge variant="outline">Duration: 60 mins</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Class 10 Math - Algebra</CardTitle>
              <CardDescription className="text-xs">Student: Arif Hossain | Dhaka Board</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="aspect-video rounded-lg bg-muted relative flex items-center justify-center">
                <div className="absolute top-2 left-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant={stream ? "secondary" : "outline"} className="flex items-center gap-1">
                    <Video className="h-3.5 w-3.5" />
                    {stream ? "Camera on" : "Camera off"}
                  </Badge>
                  <Badge variant={stream ? "outline" : "outline"} className="flex items-center gap-1">
                    <Mic className="h-3.5 w-3.5" />
                    Mic on
                  </Badge>
                </div>
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover rounded-lg"
                  autoPlay
                  playsInline
                  muted
                />
                {!stream && <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">Camera is off</div>}
              </div>

              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" className="h-8 px-3" onClick={() => stream && stopCamera()}>
                  <VideoOff className="h-4 w-4 mr-1" />
                  Stop video
                </Button>
                <Button size="sm" variant="secondary" className="h-8 px-3" onClick={startCamera}>
                  <Video className="h-4 w-4 mr-1" />
                  Start camera
                </Button>
                <Button size="sm" variant="outline" className="h-8 px-3">
                  <ScreenShare className="h-4 w-4 mr-1" />
                  Share screen
                </Button>
                <Button size="sm" variant="secondary" className="h-8 px-3">
                  <Paperclip className="h-4 w-4 mr-1" />
                  Share file
                </Button>
              </div>
              {cameraError && <p className="text-[11px] text-destructive">{cameraError}</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Class Chat
              </CardTitle>
              <CardDescription className="text-xs">Chat is visible to student and guardian</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {messages.map((msg) => (
                  <div key={msg.id} className="text-xs">
                    <p className="font-semibold text-foreground">{msg.sender}</p>
                    <p className="text-muted-foreground">{msg.text}</p>
                    <p className="text-[11px] text-muted-foreground">{msg.time}</p>
                    <Separator className="my-2" />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 px-2">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    className="h-9 text-sm"
                    placeholder="Type a message..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                  />
                  <Button size="sm" className="h-9 px-3 bg-primary" onClick={handleSend}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
