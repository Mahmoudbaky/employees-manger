'use client'

import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const Header = () => {
  const { data: session, status } = useSession()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/sign-in' })
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-semibold text-gray-900">
              User Management
            </span>
          </div>

          {/* User info and actions */}
          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </div>
            ) : session?.user ? (
              <>
                <div className="flex items-center space-x-3">
                  <div className="text-sm">
                    <span className="text-gray-600">Welcome, </span>
                    <span className="font-medium text-gray-900">
                      {session.user.name || session.user.username}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="text-sm"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="text-sm text-gray-500">
                Not signed in
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
