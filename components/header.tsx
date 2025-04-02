"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bell, HelpCircle, Menu, X, User, Briefcase, Wallet, Users, LogOut, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image src="/logo.svg" alt="TrainGo" width={100} height={40} className="h-10 w-auto" />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              <Bell className="h-5 w-5 mr-2" />
              Offers
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              <HelpCircle className="h-5 w-5 mr-2" />
              Customer Service
            </Button>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="relative rounded-full w-8 h-8 bg-gray-200 flex items-center justify-center">
                      <Image src="/placeholder-user.jpg" alt="User" width={32} height={32} className="rounded-full" />
                    </div>
                    <span>Hey Krish</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 p-0">
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-gray-500" />
                      <div>
                        <div className="font-medium">Krish</div>
                        <div className="text-sm text-gray-500">My Profile</div>
                      </div>
                    </div>
                  </div>

                  <Link href="/my-trips">
                    <DropdownMenuItem className="p-4 cursor-pointer">
                      <Briefcase className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <div className="font-medium">My Trips</div>
                        <div className="text-sm text-gray-500">View & Manage bookings</div>
                      </div>
                    </DropdownMenuItem>
                  </Link>

                  <Link href="/wallet">
                    <DropdownMenuItem className="p-4 cursor-pointer">
                      <Wallet className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <div className="font-medium">ixigo money</div>
                        <div className="text-sm text-gray-500">Your virtual currency</div>
                      </div>
                    </DropdownMenuItem>
                  </Link>

                  <Link href="/travellers">
                    <DropdownMenuItem className="p-4 cursor-pointer">
                      <Users className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <div className="font-medium">My Travellers</div>
                        <div className="text-sm text-gray-500">View all saved travellers</div>
                      </div>
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem className="p-4 cursor-pointer" onClick={() => setIsLoggedIn(false)}>
                    <LogOut className="h-5 w-5 text-gray-500 mr-3" />
                    <div className="font-medium">Logout</div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => setIsLoggedIn(true)}>Login</Button>
            )}
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between border-b pb-4">
                    <p className="font-semibold">Menu</p>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                  </div>
                  <div className="flex flex-col gap-3 py-4">
                    <Button variant="ghost" className="justify-start">
                      <Bell className="h-5 w-5 mr-2" />
                      Offers
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      <HelpCircle className="h-5 w-5 mr-2" />
                      Customer Service
                    </Button>
                    {isLoggedIn ? (
                      <>
                        <div className="flex items-center p-2">
                          <Image
                            src="/placeholder-user.jpg"
                            alt="User"
                            width={36}
                            height={36}
                            className="rounded-full"
                          />
                          <div className="ml-2">
                            <p className="text-sm font-medium">Hey Krish</p>
                            <p className="text-xs text-gray-500">krish@example.com</p>
                          </div>
                        </div>
                        <Link href="/my-trips">
                          <Button variant="ghost" className="justify-start w-full">
                            <Briefcase className="h-5 w-5 mr-2" />
                            My Trips
                          </Button>
                        </Link>
                        <Link href="/wallet">
                          <Button variant="ghost" className="justify-start w-full">
                            <Wallet className="h-5 w-5 mr-2" />
                            ixigo money
                          </Button>
                        </Link>
                        <Link href="/travellers">
                          <Button variant="ghost" className="justify-start w-full">
                            <Users className="h-5 w-5 mr-2" />
                            My Travellers
                          </Button>
                        </Link>
                        <Button variant="ghost" className="justify-start" onClick={() => setIsLoggedIn(false)}>
                          <LogOut className="h-5 w-5 mr-2" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => setIsLoggedIn(true)}>Login</Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

