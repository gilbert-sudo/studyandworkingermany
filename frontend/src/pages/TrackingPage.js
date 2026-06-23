import React, { useState } from 'react';
import { User, Phone, BookOpen, FileText, UploadCloud, Save, CheckCircle2 } from 'lucide-react';

function TrackingPage() {
  const [formData, setFormData] = useState({
    surname: '',
    firstName: '',
    nickname: '',
    dateOfBirth: '',
    gender: '',
    residence: '',
    whatsapp: '',
    email: '',
    preferredJob: '',
    alternativeJob: '',
    germanLevel: '',
    germanLearningPlace: '',
    lastLanguageTest: '',
    frenchSkills: '',
    englishSkills: '',
    driversLicense: '',
    workExperience: ''
  });

  const [files, setFiles] = useState({
    photo: null,
    languageCertificate: null,
    secondarySchoolDegree: null,
    jobTrainingCertificate: null,
    universityDegree: null,
    cv: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles.length > 0) {
      setFiles(prev => ({ ...prev, [name]: selectedFiles[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create FormData object
    const payload = new FormData();
    
    // Append text data
    Object.keys(formData).forEach(key => {
      payload.append(key, formData[key]);
    });
    
    // Append files
    Object.keys(files).forEach(key => {
      if (files[key]) {
        payload.append(key, files[key]);
      }
    });

    // Mock API call delay
    setTimeout(() => {
      console.log('Form submitted with data:', Object.fromEntries(payload));
      alert("Application data saved successfully! (Frontend Only)");
      setIsSubmitting(false);
    }, 1000);
  };

  const FileUploadField = ({ label, name, accept, description }) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div className="relative group w-full">
        <div className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl transition-all ${
          files[name] 
            ? 'border-green-500 bg-green-50 dark:bg-green-900/10' 
            : 'border-gray-300 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 hover:bg-gray-100 dark:hover:bg-neutral-800'
        }`}>
          <div className="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none">
            {files[name] ? (
              <>
                <CheckCircle2 className="w-8 h-8 text-green-500 mb-2" />
                <p className="text-sm font-medium text-green-600 dark:text-green-400 truncate max-w-[200px] sm:max-w-xs px-4">
                  {files[name].name}
                </p>
              </>
            ) : (
              <>
                <UploadCloud className="w-8 h-8 text-gray-400 mb-2 group-hover:text-gray-500 transition-colors" />
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Click or drag to upload</p>
                <p className="text-xs text-gray-400 mt-1">{description}</p>
              </>
            )}
          </div>
          <input 
            type="file" 
            name={name}
            accept={accept}
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-neutral-950 relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-white tracking-tight mb-2">
            Application <span className="font-semibold">Manager</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Manage your personal profile, vocational preferences, and necessary application documents in one place.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Personal Details */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-neutral-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6 sm:mb-8 pb-4 border-b border-gray-100 dark:border-neutral-800">
              <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl">
                <User className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">1. Personal Details</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Surname (Familienname)</label>
                <input type="text" name="surname" value={formData.surname} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:outline-none transition-all dark:text-white" placeholder="Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name (Vorname)</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:outline-none transition-all dark:text-white" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nickname (Rufname) <span className="text-gray-400 font-normal">(Optional)</span></label>
                <input type="text" name="nickname" value={formData.nickname} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:outline-none transition-all dark:text-white" placeholder="Johnny" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth (Geburtsdatum)</label>
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:outline-none transition-all dark:text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Gender (Geschlecht)</label>
                <select name="gender" value={formData.gender} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:outline-none transition-all dark:text-white">
                  <option value="">Select Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Place of Residence (Wohnort)</label>
                <input type="text" name="residence" value={formData.residence} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:outline-none transition-all dark:text-white" placeholder="City, Country" />
              </div>
            </div>
          </div>

          {/* Section 2: Contact Info */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-neutral-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6 sm:mb-8 pb-4 border-b border-gray-100 dark:border-neutral-800">
              <div className="p-2.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl">
                <Phone className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">2. Contact Info</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">WhatsApp Number</label>
                <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:outline-none transition-all dark:text-white" placeholder="+49 123 4567890" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">E-Mail</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:outline-none transition-all dark:text-white" placeholder="you@example.com" />
              </div>
            </div>
          </div>

          {/* Section 3: Job Choices & Qualifications */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-neutral-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6 sm:mb-8 pb-4 border-b border-gray-100 dark:border-neutral-800">
              <div className="p-2.5 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">3. Job Choices & Qualifications</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Preferred Job Training (Erster Wunsch)</label>
                <input type="text" name="preferredJob" value={formData.preferredJob} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:outline-none transition-all dark:text-white" placeholder="e.g. Nursing (Pflegefachkraft)" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Alternative Job Training 1 (Zweiter Wunsch)</label>
                <input type="text" name="alternativeJob" value={formData.alternativeJob} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:outline-none transition-all dark:text-white" placeholder="e.g. IT Specialist" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Level of German (Sprachniveau)</label>
                <select name="germanLevel" value={formData.germanLevel} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:outline-none transition-all dark:text-white">
                  <option value="">Select Level</option>
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date of last language test</label>
                <input type="date" name="lastLanguageTest" value={formData.lastLanguageTest} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:outline-none transition-all dark:text-white" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Where did you learn German?</label>
                <textarea name="germanLearningPlace" value={formData.germanLearningPlace} onChange={handleInputChange} rows="2" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:outline-none transition-all dark:text-white resize-none" placeholder="Goethe Institute, Self-taught, etc."></textarea>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">French Skills</label>
                <select name="frenchSkills" value={formData.frenchSkills} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:outline-none transition-all dark:text-white">
                  <option value="">Select Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="A little">A little</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">English Skills</label>
                <select name="englishSkills" value={formData.englishSkills} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:outline-none transition-all dark:text-white">
                  <option value="">Select Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="A little">A little</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Driver's License (Führerschein)</label>
                <select name="driversLicense" value={formData.driversLicense} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:outline-none transition-all dark:text-white">
                  <option value="">Select Option</option>
                  <option value="Ja">Ja (Yes)</option>
                  <option value="Nein">Nein (No)</option>
                </select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Work Experience (Berufserfahrung)</label>
                <textarea name="workExperience" value={formData.workExperience} onChange={handleInputChange} rows="3" className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:outline-none transition-all dark:text-white resize-none" placeholder="Briefly describe your relevant work experience..."></textarea>
              </div>
            </div>
          </div>

          {/* Section 4: Document Management & Uploads */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-neutral-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6 sm:mb-8 pb-4 border-b border-gray-100 dark:border-neutral-800">
              <div className="p-2.5 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-xl">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">4. Documents & Uploads</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <FileUploadField 
                label="Candidate Photo (Foto)" 
                name="photo" 
                accept="image/jpeg, image/png" 
                description="JPEG or PNG only"
              />
              <FileUploadField 
                label="Language Certificate" 
                name="languageCertificate" 
                accept="application/pdf" 
                description="PDF only"
              />
              <FileUploadField 
                label="Secondary School Degree (Abitur)" 
                name="secondarySchoolDegree" 
                accept="application/pdf" 
                description="PDF only"
              />
              <FileUploadField 
                label="Job Training Certificate (Ausbildung)" 
                name="jobTrainingCertificate" 
                accept="application/pdf" 
                description="PDF only"
              />
              <FileUploadField 
                label="University Degree (Studium)" 
                name="universityDegree" 
                accept="application/pdf" 
                description="PDF only"
              />
              <FileUploadField 
                label="CV (Lebenslauf)" 
                name="cv" 
                accept="application/pdf" 
                description="PDF only"
              />
            </div>
          </div>

          {/* Floating Submit Bar */}
          <div className="fixed bottom-[5.5rem] sm:bottom-8 left-0 right-0 z-50 flex justify-center w-full px-2 sm:px-0 pointer-events-none">
            <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-2xl p-2 sm:p-3 rounded-full border border-gray-200/50 dark:border-neutral-800/50 shadow-2xl shadow-gray-900/10 dark:shadow-black/40 flex items-center gap-3 sm:gap-6 pr-2 sm:pr-3 w-full sm:w-auto max-w-full sm:max-w-2xl justify-between sm:justify-start pointer-events-auto">
              <div className="pl-4 sm:pl-6 min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate">Ready to submit?</p>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate hidden sm:block">All fields will be securely saved.</p>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="group relative flex justify-center items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-semibold text-sm sm:text-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden shrink-0 whitespace-nowrap"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 dark:via-black/20 to-transparent z-0"></div>
                
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 dark:border-gray-900/30 border-t-white dark:border-t-gray-900 rounded-full animate-spin relative z-10"></span>
                    <span className="relative z-10">Processing...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Save & Continue</span>
                    <div className="bg-white/10 dark:bg-black/5 p-1 sm:p-1.5 rounded-full group-hover:rotate-12 transition-transform duration-300 relative z-10">
                      <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </>
                )}
              </button>
            </div>
          </div>
          {/* Mobile spacer to ensure form content isn't hidden behind the fixed bar */}
          <div className="h-32 sm:h-20"></div>

        </form>
      </div>
    </div>
  );
}

export default TrackingPage;
