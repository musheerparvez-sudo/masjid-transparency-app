'use client';

import React, { useState } from 'react';
import { Building2, MapPin, Users, Wallet, ChevronLeft, ChevronRight, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import Link from 'next/link';

const steps = [
  { id: 1, title: 'Basic Info', icon: Building2 },
  { id: 2, title: 'Details', icon: MapPin },
  { id: 3, title: 'Administration', icon: Users },
  { id: 4, title: 'Financial Info', icon: Wallet },
];

const mosqueTypes = [
  { value: 'PRIVATE', label: 'Private' },
  { value: 'TRUST', label: 'Trust' },
  { value: 'WAQF_BOARD', label: 'Waqf Board' },
  { value: 'COMMITTEE', label: 'Committee' },
];

const staffRoles = [
  { value: 'IMAM', label: 'Imam' },
  { value: 'MUAZZIN', label: 'Muazzin' },
  { value: 'KHADIM', label: 'Khadim' },
  { value: 'NAIB_IMAM', label: 'Naib Imam' },
];

interface StaffMember {
  name: string;
  role: string;
  phone: string;
  qualification: string;
  monthlySalary: string;
  appointedDate: string;
}

export default function MasjidRegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Step 1
  const [basicInfo, setBasicInfo] = useState({
    name: '', nameUrdu: '', address: '', city: '', state: '', pinCode: '',
    type: '', description: '',
  });

  // Step 2
  const [details, setDetails] = useState({
    capacity: '', constructionYear: '', latitude: '', longitude: '',
  });

  // Step 3
  const [mutawalli, setMutawalli] = useState({
    name: '', phone: '', email: '', sinceDate: '',
  });
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    { name: '', role: 'IMAM', phone: '', qualification: '', monthlySalary: '', appointedDate: '' },
  ]);

  // Step 4
  const [bankInfo, setBankInfo] = useState({
    bankName: '', accountNumber: '', ifscCode: '', accountHolderName: '', upiId: '',
  });

  const addStaffMember = () => {
    setStaffMembers([
      ...staffMembers,
      { name: '', role: 'MUAZZIN', phone: '', qualification: '', monthlySalary: '', appointedDate: '' },
    ]);
  };

  const removeStaffMember = (index: number) => {
    if (staffMembers.length > 1) {
      setStaffMembers(staffMembers.filter((_, i) => i !== index));
    }
  };

  const updateStaffMember = (index: number, field: keyof StaffMember, value: string) => {
    const updated = [...staffMembers];
    updated[index] = { ...updated[index], [field]: value };
    setStaffMembers(updated);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">🕌 Mosque Registered!</h2>
          <p className="text-gray-500 mb-6">
            Masjid ka registration ho gaya hai. Verification ke baad ye app par public ho jayegi.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/volunteer/dashboard">
              <Button className="w-full">Go to Dashboard</Button>
            </Link>
            <Link href="/search">
              <Button variant="secondary" className="w-full">Search Mosques</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🕌 Register a Mosque</h1>
        <p className="text-gray-500 mb-8">Masjid ki mukammal jankari 4 aasan qadam mein bharein</p>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isComplete = currentStep > step.id;
            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    isComplete ? 'bg-emerald-600 text-white' :
                    isActive ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-600' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    {isComplete ? <CheckCircle size={20} /> : <Icon size={20} />}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${
                    isActive ? 'text-emerald-700' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded-full ${
                    currentStep > step.id ? 'bg-emerald-500' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Mosque Name *" value={basicInfo.name} onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })} placeholder="e.g. Jama Masjid Al-Falah" />
                <Input label="Mosque Name (Urdu)" value={basicInfo.nameUrdu} onChange={(e) => setBasicInfo({ ...basicInfo, nameUrdu: e.target.value })} placeholder="اردو میں نام" dir="rtl" />
              </div>
              <Input label="Address *" value={basicInfo.address} onChange={(e) => setBasicInfo({ ...basicInfo, address: e.target.value })} placeholder="Full address" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input label="City *" value={basicInfo.city} onChange={(e) => setBasicInfo({ ...basicInfo, city: e.target.value })} placeholder="e.g. Lucknow" />
                <Input label="State *" value={basicInfo.state} onChange={(e) => setBasicInfo({ ...basicInfo, state: e.target.value })} placeholder="e.g. UP" />
                <Input label="Pin Code *" value={basicInfo.pinCode} onChange={(e) => setBasicInfo({ ...basicInfo, pinCode: e.target.value })} placeholder="e.g. 226001" />
              </div>
              <Select label="Mosque Type *" options={mosqueTypes} value={basicInfo.type} onChange={(e) => setBasicInfo({ ...basicInfo, type: e.target.value })} />
              <Textarea label="Description" value={basicInfo.description} onChange={(e) => setBasicInfo({ ...basicInfo, description: e.target.value })} placeholder="Masjid ke bare mein mukhtasar jankari..." />
            </div>
          )}

          {/* Step 2: Details */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Mosque Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Capacity (namaziyon ki tadaad)" type="number" value={details.capacity} onChange={(e) => setDetails({ ...details, capacity: e.target.value })} placeholder="e.g. 500" />
                <Input label="Construction Year" type="number" value={details.constructionYear} onChange={(e) => setDetails({ ...details, constructionYear: e.target.value })} placeholder="e.g. 1985" />
              </div>
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-3">📍 GPS Location</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Latitude" type="number" step="any" value={details.latitude} onChange={(e) => setDetails({ ...details, latitude: e.target.value })} placeholder="e.g. 26.8467" />
                  <Input label="Longitude" type="number" step="any" value={details.longitude} onChange={(e) => setDetails({ ...details, longitude: e.target.value })} placeholder="e.g. 80.9462" />
                </div>
                <p className="text-xs text-blue-500 mt-2">Google Maps se coordinates copy kar sakte hain</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-8 text-center border-2 border-dashed border-gray-200">
                <p className="text-gray-400 text-sm">📸 Photo upload feature coming soon</p>
              </div>
            </div>
          )}

          {/* Step 3: Administration */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Mutawalli (Trustee) Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Mutawalli Name *" value={mutawalli.name} onChange={(e) => setMutawalli({ ...mutawalli, name: e.target.value })} placeholder="Full name" />
                  <Input label="Phone *" value={mutawalli.phone} onChange={(e) => setMutawalli({ ...mutawalli, phone: e.target.value })} placeholder="+91 98765 43210" />
                  <Input label="Email" type="email" value={mutawalli.email} onChange={(e) => setMutawalli({ ...mutawalli, email: e.target.value })} placeholder="email@example.com" />
                  <Input label="Since Date *" type="date" value={mutawalli.sinceDate} onChange={(e) => setMutawalli({ ...mutawalli, sinceDate: e.target.value })} />
                </div>
              </div>

              <hr className="border-gray-200" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Staff Members (Imam, Muazzin...)</h2>
                  <Button variant="secondary" size="sm" onClick={addStaffMember}>
                    <Plus size={16} className="mr-1" /> Add Staff
                  </Button>
                </div>

                {staffMembers.map((staff, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-5 mb-4 relative">
                    {staffMembers.length > 1 && (
                      <button
                        onClick={() => removeStaffMember(idx)}
                        className="absolute top-3 right-3 text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                    <p className="text-sm font-medium text-gray-500 mb-3">Staff #{idx + 1}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input label="Name *" value={staff.name} onChange={(e) => updateStaffMember(idx, 'name', e.target.value)} placeholder="Full name" />
                      <Select label="Role *" options={staffRoles} value={staff.role} onChange={(e) => updateStaffMember(idx, 'role', e.target.value)} />
                      <Input label="Phone" value={staff.phone} onChange={(e) => updateStaffMember(idx, 'phone', e.target.value)} placeholder="+91..." />
                      <Input label="Qualification" value={staff.qualification} onChange={(e) => updateStaffMember(idx, 'qualification', e.target.value)} placeholder="e.g. Aalim, Hafiz" />
                      <Input label="Monthly Salary (₹) *" type="number" value={staff.monthlySalary} onChange={(e) => updateStaffMember(idx, 'monthlySalary', e.target.value)} placeholder="e.g. 15000" />
                      <Input label="Appointed Date *" type="date" value={staff.appointedDate} onChange={(e) => updateStaffMember(idx, 'appointedDate', e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Financial Info */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Bank Account Information</h2>
              <p className="text-sm text-gray-500 mb-4">
                Ye jankari public hogi taaki donors seedha masjid ko donate kar sakein.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Bank Name *" value={bankInfo.bankName} onChange={(e) => setBankInfo({ ...bankInfo, bankName: e.target.value })} placeholder="e.g. State Bank of India" />
                <Input label="Account Number *" value={bankInfo.accountNumber} onChange={(e) => setBankInfo({ ...bankInfo, accountNumber: e.target.value })} placeholder="Account number" />
                <Input label="IFSC Code *" value={bankInfo.ifscCode} onChange={(e) => setBankInfo({ ...bankInfo, ifscCode: e.target.value })} placeholder="e.g. SBIN0001234" />
                <Input label="Account Holder Name *" value={bankInfo.accountHolderName} onChange={(e) => setBankInfo({ ...bankInfo, accountHolderName: e.target.value })} placeholder="Trust/committee name" />
              </div>
              <Input label="UPI ID (optional)" value={bankInfo.upiId} onChange={(e) => setBankInfo({ ...bankInfo, upiId: e.target.value })} placeholder="e.g. masjid@sbi" />

              {/* Review Summary */}
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 mt-6">
                <h3 className="font-bold text-emerald-800 mb-3">📋 Review Summary</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-emerald-600">Mosque:</span> <span className="font-medium">{basicInfo.name || '—'}</span></div>
                  <div><span className="text-emerald-600">City:</span> <span className="font-medium">{basicInfo.city || '—'}</span></div>
                  <div><span className="text-emerald-600">Type:</span> <span className="font-medium">{basicInfo.type || '—'}</span></div>
                  <div><span className="text-emerald-600">Mutawalli:</span> <span className="font-medium">{mutawalli.name || '—'}</span></div>
                  <div><span className="text-emerald-600">Staff:</span> <span className="font-medium">{staffMembers.length} member(s)</span></div>
                  <div><span className="text-emerald-600">Bank:</span> <span className="font-medium">{bankInfo.bankName || '—'}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              <ChevronLeft size={18} className="mr-1" /> Previous
            </Button>

            {currentStep < 4 ? (
              <Button onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}>
                Next <ChevronRight size={18} className="ml-1" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} isLoading={isSubmitting} size="lg">
                🕌 Register Mosque
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
