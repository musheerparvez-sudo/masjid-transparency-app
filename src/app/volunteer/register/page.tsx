'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { UserPlus, CheckCircle, Shield, Heart, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const benefits = [
  { icon: MapPin, text: 'Apne ilaqe ki masjidon ki jankari update karein' },
  { icon: Shield, text: 'Verified volunteer ka badge paayein' },
  { icon: Heart, text: 'Masjidon ki hifazat mein hissa daalein' },
  { icon: CheckCircle, text: 'Community mein pehchaan banayein' },
];

export default function VolunteerRegisterPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
    area: '', city: '', state: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (formData.phone.length < 10) newErrors.phone = 'Enter valid phone number';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Min 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.area.trim()) newErrors.area = 'Area is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!agreeTerms) newErrors.terms = 'You must agree to the terms';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
          <p className="text-gray-500 mb-6">
            Aapka volunteer registration ho gaya hai. Aap ab apne ilaqe ki masjidon ki jankari
            add aur update kar sakte hain.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/volunteer/dashboard">
              <Button className="w-full">Go to Dashboard</Button>
            </Link>
            <Link href="/masjid/register">
              <Button variant="secondary" className="w-full">Register a Mosque</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Benefits Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <div className="bg-emerald-800 rounded-2xl p-8 text-white">
                <div className="flex items-center gap-2 mb-6">
                  <UserPlus size={28} />
                  <h2 className="text-2xl font-bold">Volunteer Banein</h2>
                </div>
                <p className="text-emerald-100 mb-8 leading-relaxed">
                  Apne ilaqe ki masjidon ki hifazat mein hissa daalein. Volunteer
                  ban kar masjid ki jankari add karein, update karein, aur community
                  ki madad karein.
                </p>
                <div className="space-y-4">
                  {benefits.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon size={16} />
                        </div>
                        <p className="text-emerald-100 text-sm">{item.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Volunteer Registration</h1>
              <p className="text-gray-500 mb-8">
                Apni basic jankari de kar register karein
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Full Name *"
                  name="name"
                  placeholder="Aapka naam"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email *"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                  <Input
                    label="Phone Number *"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Password *"
                    name="password"
                    type="password"
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                  />
                  <Input
                    label="Confirm Password *"
                    name="confirmPassword"
                    type="password"
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                  />
                </div>

                <hr className="border-gray-100" />

                <Input
                  label="Area / Locality *"
                  name="area"
                  placeholder="e.g. Aminabad, Old City"
                  value={formData.area}
                  onChange={handleChange}
                  error={errors.area}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="City *"
                    name="city"
                    placeholder="e.g. Lucknow"
                    value={formData.city}
                    onChange={handleChange}
                    error={errors.city}
                  />
                  <Input
                    label="State *"
                    name="state"
                    placeholder="e.g. Uttar Pradesh"
                    value={formData.state}
                    onChange={handleChange}
                    error={errors.state}
                  />
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    Main tasdeeq karta/karti hun ke meri di gayi jankari sahih hai aur main
                    MasjidGuard ki{' '}
                    <a href="#" className="text-emerald-600 hover:underline">
                      terms & conditions
                    </a>{' '}
                    se muttafiq hun.
                  </label>
                </div>
                {errors.terms && <p className="text-sm text-red-600">{errors.terms}</p>}

                <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
                  <UserPlus size={18} className="mr-2" />
                  Register as Volunteer
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  Already registered?{' '}
                  <Link href="/auth/login" className="text-emerald-600 hover:underline font-medium">
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
