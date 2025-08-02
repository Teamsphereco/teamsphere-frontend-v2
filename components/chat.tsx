"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Grid3X3,
  MessageSquare,
  Bell,
  Users,
  Settings,
  Phone,
  Video,
  MoreHorizontal,
  Paperclip,
  Send,
  Plus,
  ImageIcon,
  File,
  Link,
  Archive,
  X,
} from "lucide-react"

export default function Chat() {
  const [message, setMessage] = useState("")

  const conversations = [
    {
      id: 1,
      name: "Emilia",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Sent images",
      time: "16:14",
      hasFlower: true,
      unread: false,
      unreadCount: 0,
    },
    {
      id: 2,
      name: "Designers",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Sasha is typing...",
      time: "16:09",
      isGroup: true,
      online: true,
      unread: false,
      unreadCount: 0,
      isActive: true,
    },
    {
      id: 3,
      name: "Mariam",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Voice message (00:56)",
      time: "16:01",
      unread: true,
      unreadCount: 3,
      isVoice: true,
    },
    {
      id: 4,
      name: "Anastasia",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Good luck!",
      time: "16:20",
      unread: false,
      unreadCount: 0,
      online: true,
    },
    {
      id: 5,
      name: "George A.",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Missed call",
      time: "16:20",
      unread: false,
      unreadCount: 0,
      online: true,
      missedCall: true,
    },
    {
      id: 6,
      name: "David Jonson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Thank you",
      time: "19:33",
      unread: false,
      unreadCount: 0,
    },
    {
      id: 7,
      name: "Lili, Sasha",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Mariam 😊",
      time: "19:04",
      unread: true,
      unreadCount: 5,
      isGroup: true,
    },
    {
      id: 8,
      name: "Nickolas",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Hello Mariam 👋 please check",
      time: "19:01",
      unread: false,
      unreadCount: 0,
    },
    {
      id: 9,
      name: "Ithan",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Missed call",
      time: "12:51",
      unread: false,
      unreadCount: 0,
      missedCall: true,
    },
    {
      id: 10,
      name: "Nick Peele",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "https://www.youtube.com/wat...",
      time: "10:09",
      unread: false,
      unreadCount: 0,
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "You",
      content: "Hello, I have new cool idea, are u ready guys? 🔥",
      time: "16:04",
      avatar: "/placeholder.svg?height=32&width=32",
      reactions: [
        { emoji: "😍", count: 1 },
        { emoji: "❤️", count: 9 },
      ],
    },
    {
      id: 2,
      sender: "Anna Ellis",
      content: "Hi guys! 👋 I am ready 💪",
      time: "16:05",
      avatar: "/placeholder.svg?height=32&width=32",
      reactions: [{ emoji: "😍", count: 6 }],
    },
    {
      id: 3,
      sender: "You",
      content: "Good 😊😊",
      time: "16:05",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      sender: "Ithan Adler",
      content: "Hi everyone! Please check! ⚠️",
      time: "16:07",
      avatar: "/placeholder.svg?height=32&width=32",
      hasImage: true,
      reactions: [
        { emoji: "❤️", count: 6 },
        { emoji: "👍", count: 13 },
      ],
    },
  ]

  const members = [
    { name: "Sophia Madison", avatar: "/placeholder.svg?height=32&width=32", online: true },
    { name: "Lucas West", avatar: "/placeholder.svg?height=32&width=32", online: true },
    { name: "William Adams", avatar: "/placeholder.svg?height=32&width=32", online: true },
    { name: "Emma Gray", avatar: "/placeholder.svg?height=32&width=32", online: true },
  ]

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Far Left Navigation Sidebar */}
      <div className="w-16 bg-gray-900 flex flex-col items-center py-4 border-r border-gray-700">
        <div className="flex flex-col gap-4">
          <Button variant="ghost" size="icon" className="h-10 w-10 text-blue-400 bg-gray-800">
            <Grid3X3 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 relative">
            <MessageSquare className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 bg-red-500 text-xs flex items-center justify-center">
              1
            </Badge>
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 bg-red-500 text-xs flex items-center justify-center">
              1
            </Badge>
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 relative">
            <Users className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 bg-red-500 text-xs flex items-center justify-center">
              1
            </Badge>
          </Button>
        </div>

        <div className="mt-auto flex flex-col gap-4">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Phone className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages Sidebar */}
      <div className="w-80 bg-gray-900 flex flex-col border-r border-gray-700">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="font-semibold">
                Messages <span className="text-blue-400">(22)</span>
              </h2>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Paperclip className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search" className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400" />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {/* Pinned Messages Section */}
          <div className="p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-gray-400 font-medium">📌 PINNED MESSAGE</div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-800/50 mb-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>E</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-sm">Emilia</span>
                  <span className="text-pink-400">🌸</span>
                </div>
                <p className="text-xs text-gray-400 truncate">Sent images</p>
              </div>
              <div className="text-xs text-gray-400">16:14</div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Paperclip className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* All Messages Section */}
          <div className="px-3">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-gray-400 font-medium">💬 ALL MESSAGE</div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </div>

            {conversations.map((conv, index) => (
              <div key={conv.id}>
                <div
                  className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 cursor-pointer relative mb-1 ${
                    conv.isActive ? "bg-gray-800" : ""
                  }`}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conv.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{conv.name[0]}</AvatarFallback>
                    </Avatar>
                    {conv.online && (
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-sm">{conv.name}</span>
                      {conv.hasFlower && <span className="text-pink-400">🌸</span>}
                    </div>
                    <p className={`text-xs truncate ${conv.missedCall ? "text-red-400" : "text-gray-400"}`}>
                      {conv.isVoice && <span className="mr-1">🎵</span>}
                      {conv.lastMessage}
                    </p>
                  </div>
                  <div className="flex flex-col items-end relative">
                    <div className="text-xs text-gray-400">{conv.time}</div>
                    {conv.unread && conv.unreadCount > 0 && (
                      <div className="mt-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-medium">{conv.unreadCount}</span>
                      </div>
                    )}
                  </div>
                </div>
                {index < conversations.length - 1 && <div className="mx-2 my-1 h-px bg-gray-800"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>D</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">Designers</h3>
              <p className="text-sm text-gray-400">
                <span className="text-green-400">●</span> 56 members, 28 online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={msg.avatar || "/placeholder.svg"} />
                <AvatarFallback>{msg.sender[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{msg.sender}</span>
                  <span className="text-xs text-gray-400">{msg.time}</span>
                </div>
                <p className="text-sm text-gray-300">{msg.content}</p>
                {msg.hasImage && (
                  <div className="mt-2">
                    <img
                      src="/abstract-colorful-explosion.png"
                      alt="Shared image"
                      className="rounded-lg max-w-xs h-48 object-cover"
                    />
                  </div>
                )}
                {msg.reactions && (
                  <div className="flex items-center gap-2 mt-2">
                    {msg.reactions.map((reaction, idx) => (
                      <div key={idx} className="flex items-center gap-1 bg-gray-700 rounded-full px-2 py-1 text-xs">
                        <span>{reaction.emoji}</span>
                        <span className="text-gray-300">{reaction.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="flex items-center gap-2 text-sm text-blue-400">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/placeholder.svg?height=24&width=24" />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            Sasha is typing...
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 pr-20"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-gray-800 flex flex-col border-l border-gray-700">
        {/* Group Info */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg?height=48&width=48" />
              <AvatarFallback>D</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">Designers</h3>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>

          <div className="text-sm text-gray-400 mb-4 flex items-center gap-2">
            MEMBERS <span className="text-white">56</span>
            <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {members.map((member, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  {member.online && (
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                  )}
                </div>
                <span className="text-sm flex-1">{member.name}</span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Phone className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MessageSquare className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            className="w-full mt-4 border-gray-600 text-blue-400 hover:bg-gray-700 bg-transparent"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add member
          </Button>
        </div>

        {/* Attachments */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-400">
              ATTACHMENTS <span className="text-white">3048</span>
            </span>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <ImageIcon className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <div className="text-sm">Media</div>
                <div className="text-xs text-gray-400">974 Files • 6.87 MB</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <File className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <div className="text-sm">Files</div>
                <div className="text-xs text-gray-400">309 Files • 1.3 GB</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <div className="text-sm">Links</div>
                <div className="text-xs text-gray-400">1056 Files • 3.4 GB</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Archive className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <div className="text-sm">Other</div>
                <div className="text-xs text-gray-400">709 Files • 4.0 GB</div>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Notifications</span>
            <Switch defaultChecked />
          </div>
        </div>
      </div>
    </div>
  )
}
