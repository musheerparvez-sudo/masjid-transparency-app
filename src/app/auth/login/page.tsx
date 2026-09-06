'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      setError('Invalid email or password. Try: admin@masjidguard.org / admin123');
    } else {
      router.push('/volunteer/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-5xl">🕌</span>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Welcome Back</h1>
          <p className="text-gray-500 mt-1">MasjidGuard mein login karein</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Demo credentials hint */}
            <div className="bg-blue-50 text-blue-700 text-xs px-4 py-3 rounded-lg">
              <p className="font-medium mb-1">Demo Credentials:</p>
              <p>Admin: admin@masjidguard.org / admin123</p>
              <p>Volunteer: volunteer@masjidguard.org / volunteer123</p>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded border-gray-300 text-emerald-600" />
                Remember me
              </label>
              <a href="#" className="text-sm text-emerald-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
              <LogIn size={18} className="mr-2" />
              Login
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Account nahi hai?{' '}
              <Link href="/volunteer/register" className="text-emerald-600 hover:underline font-medium">
                Register as Volunteer
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
