'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { useProfileManager } from '@/features/auth/hooks/useProfile'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'


const ProfileForm = () => {
  const { profile, hasProfile, saveProfile, isSaving } = useProfileManager()

  const [formData, setFormData] = useState({
    userName: '',
    userLastname: ''
  })

  useEffect(() => {
    if (profile) {
      setFormData({
        userName: profile.userName || '',
        userLastname: profile.userLastname || ''
      })
    }
  }, [profile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await saveProfile(formData)

      const message = hasProfile
        ? 'Profile updated successfully!'
        : 'Profile created successfully!'

      toast.success(message)

      // Si era creación, ir al dashboard
      // if (!hasProfile) {
      //   router.push('/dashboard')
      // }

    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong'
      toast.error(message)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      {/* <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {hasProfile ? 'Update Profile' : 'Create Profile'}
        </h1>
        <p className="text-gray-600 mt-2">
          {hasProfile
            ? 'Update your personal information'
            : 'Complete your profile to get started'
          }
        </p>
      </div> */}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className='flex flex-col gap-2'>
          <Label htmlFor="userName">First Name</Label>
          <Input
            id="userName"
            value={formData.userName}
            onChange={(e) => setFormData(prev => ({ ...prev, userName: e.target.value }))}
            required
            placeholder="Enter your first name"
          />
        </div>

        <div className='flex flex-col gap-2'>
          <Label htmlFor="userLastname">Last Name</Label>
          <Input
            id="userLastname"
            value={formData.userLastname}
            onChange={(e) => setFormData(prev => ({ ...prev, userLastname: e.target.value }))}
            required
            placeholder="Enter your last name"
          />
        </div>

        <Button
          type="submit"
          disabled={isSaving}
          className="w-full"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {hasProfile ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            hasProfile ? 'Update Profile' : 'Create Profile'
          )}
        </Button>
      </form>
    </div>
  )
}

export default ProfileForm
