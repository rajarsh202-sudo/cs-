/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, Users, MapPin, MoreHorizontal, X, Briefcase, GraduationCap } from 'lucide-react';

interface LandingPageProps {
  onStart: (data: { category: string | null; subCategory: string | null; details: string }) => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [details, setDetails] = useState('');

  const handleCategoryClick = (category: string) => {
    if (category === 'Settlers') {
      setSelectedCategory('Settlers');
      setSelectedSubCategory(null);
    }
  };

  const handleSubCategoryClick = (sub: string) => {
    setSelectedSubCategory(sub);
  };

  const removeCategory = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
  };

  const removeSubCategory = () => {
    setSelectedSubCategory(null);
  };

  const getPlaceholder = () => {
    if (selectedSubCategory) {
      return "Enter your destination city/ address of workplace, institution, or any preferred location/ budget";
    }
    return "Type details like, reason to visit ,location and budget";
  };
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 pb-10">
      {/* Logo Area */}
      <div className="mt-14 mb-14 flex items-center justify-center">
        <svg 
          width="276" 
          height="88" 
          viewBox="0 0 276 88" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-[220px] md:w-[276px] h-auto"
        >
          <path d="M32.6446 61.4554C28.3115 61.4554 24.5869 60.5304 21.471 58.6803C18.355 56.7815 15.9693 54.2498 14.314 51.0851C12.6586 47.9205 11.8309 44.4393 11.8309 40.6418C11.8309 36.7955 12.6586 33.3144 14.314 30.1984C15.9693 27.0337 18.355 24.5264 21.471 22.6763C24.5869 20.7775 28.3115 19.8281 32.6446 19.8281C35.8093 19.8281 38.6575 20.3636 41.1892 21.4347C43.7209 22.4572 45.8631 23.8934 47.6159 25.7435L46.0822 27.2772C44.4756 25.6705 42.5524 24.4046 40.3128 23.4796C38.0732 22.5545 35.5172 22.092 32.6446 22.092C28.7497 22.092 25.3903 22.944 22.5664 24.6481C19.7913 26.3034 17.6734 28.543 16.2128 31.3669C14.7522 34.142 14.0218 37.2337 14.0218 40.6418C14.0218 44.0498 14.7522 47.1658 16.2128 49.9897C17.6734 52.7648 19.7913 55.0044 22.5664 56.7085C25.3903 58.3638 28.7497 59.1915 32.6446 59.1915C35.5172 59.1915 38.0732 58.729 40.3128 57.8039C42.5524 56.8789 44.4756 55.613 46.0822 54.0063L47.6159 55.54C45.8631 57.3414 43.7209 58.7777 41.1892 59.8488C38.6575 60.9199 35.8093 61.4554 32.6446 61.4554ZM32.6446 66.2754C28.7497 66.2754 25.2199 65.6182 22.0552 64.3036C18.9392 62.9404 16.2371 61.0903 13.9488 58.7533C11.7092 56.4163 9.98083 53.7142 8.76366 50.6469C7.59517 47.531 7.01092 44.1959 7.01092 40.6418C7.01092 37.0876 7.59517 33.7769 8.76366 30.7096C9.98083 27.5936 11.7092 24.8672 13.9488 22.5302C16.2371 20.1445 18.9392 18.2944 22.0552 16.9799C25.2199 15.6653 28.7497 15.0081 32.6446 15.0081C36.4909 15.0081 39.9477 15.6653 43.0149 16.9799C46.1309 18.2457 48.8087 20.0228 51.0483 22.3111L49.4416 23.9178C47.4455 21.8242 45.0111 20.1932 42.1386 19.0247C39.3147 17.8562 36.1501 17.272 32.6446 17.272C27.8733 17.272 23.7106 18.3188 20.1564 20.4123C16.6509 22.5059 13.9488 25.3297 12.05 28.8838C10.1512 32.3893 9.20184 36.3086 9.20184 40.6418C9.20184 44.9262 10.1512 48.8455 12.05 52.3997C13.9488 55.9538 16.6509 58.7777 20.1564 60.8712C23.7106 62.9647 27.8733 64.0115 32.6446 64.0115C36.1501 64.0115 39.3147 63.4273 42.1386 62.2588C45.0111 61.0903 47.4455 59.4593 49.4416 57.3657L51.0483 58.9724C48.8087 61.212 46.1309 62.9891 43.0149 64.3036C39.9477 65.6182 36.4909 66.2754 32.6446 66.2754ZM32.6446 71.0955C28.068 71.0955 23.9053 70.3165 20.1564 68.7585C16.4562 67.1518 13.2672 64.9609 10.5894 62.1857C7.91163 59.4106 5.84244 56.1972 4.38183 52.5457C2.92122 48.8455 2.19091 44.8775 2.19091 40.6418C2.19091 36.406 2.92122 32.4623 4.38183 28.8108C5.84244 25.1106 7.91163 21.8729 10.5894 19.0978C13.2672 16.3226 16.4562 14.156 20.1564 12.5981C23.9053 10.9914 28.068 10.188 32.6446 10.188C37.1238 10.188 41.2135 10.967 44.9137 12.525C48.6139 14.0343 51.8029 16.1522 54.4807 18.8787L52.9471 20.4123C50.4641 17.9293 47.4941 15.9818 44.0374 14.5699C40.6293 13.1093 36.8317 12.379 32.6446 12.379C28.3602 12.379 24.4896 13.1093 21.0328 14.5699C17.576 16.0305 14.6061 18.051 12.1231 20.6314C9.64002 23.2118 7.71689 26.2304 6.35365 29.6872C5.0391 33.0953 4.38183 36.7468 4.38183 40.6418C4.38183 44.5367 5.0391 48.2126 6.35365 51.6694C7.71689 55.0774 9.64002 58.0717 12.1231 60.6521C14.6061 63.2325 17.576 65.253 21.0328 66.7136C24.4896 68.1742 28.3602 68.9045 32.6446 68.9045C36.8317 68.9045 40.6293 68.1986 44.0374 66.7867C47.4941 65.3261 50.4641 63.3542 52.9471 60.8712L54.4807 62.4048C51.8029 65.0826 48.6139 67.2005 44.9137 68.7585C41.2135 70.3165 37.1238 71.0955 32.6446 71.0955ZM64.4397 70V40.6418H66.6306V70H64.4397ZM59.6197 70V40.6418H61.8106V70H59.6197ZM70.2661 42.8327V40.6418H94.2932V42.8327H70.2661ZM78.7377 70V47.6527H70.2661V45.4618H94.2932V47.6527H85.7486V70H83.5577V47.6527H80.9286V70H78.7377ZM112.013 55.7591L101.642 40.6418H104.345L110.406 49.4784L116.468 40.6418H119.17L111.794 51.5233L113.327 53.7872L122.383 40.6418H125.085L114.715 55.7591H112.013ZM106.097 55.7591L95.727 40.6418H98.4291L108.799 55.7591H106.097ZM111.721 70V57.5118H113.912V70H111.721ZM106.901 70V57.5118H109.092V70H106.901ZM154.431 70V11.2835H156.622V70H154.431ZM144.791 70V11.2835H146.982V70H144.791ZM149.611 70V11.2835H151.802V70H149.611ZM159.251 13.4744V11.2835H188.391V13.4744H159.251ZM159.251 18.2944V16.1035H188.391V18.2944H159.251ZM159.251 23.1144V20.9235H188.391V23.1144H159.251ZM159.251 36.9172V34.7263H184.228V36.9172H159.251ZM159.251 41.7372V39.5463H184.228V41.7372H159.251ZM159.251 46.5572V44.3663H184.228V46.5572H159.251ZM159.251 60.36V58.1691H188.391V60.36H159.251ZM159.251 65.18V62.9891H188.391V65.18H159.251ZM159.251 70V67.8091H188.391V70H159.251ZM196.406 70L207.069 40.6418H209.406L220.068 70H217.731L208.237 43.8551L206.85 47.6527L214.956 70H212.619L211.378 66.4945H199.985L198.743 70H196.406ZM191.294 70L201.957 40.6418H204.294L193.631 70H191.294ZM202.541 59.4836H208.821L205.681 50.866L202.541 59.4836ZM200.788 64.3036H210.574L209.625 61.6745H201.738L200.788 64.3036ZM234.606 65.9103C232.658 65.9103 231.052 65.5451 229.786 64.8148C228.569 64.0845 227.887 63.1351 227.741 61.9666L229.932 61.6745C229.981 62.3075 230.419 62.8187 231.246 63.2082C232.074 63.549 233.194 63.7194 234.606 63.7194C237.722 63.7194 239.28 63.0378 239.28 61.6745C239.28 61.0903 238.963 60.5791 238.33 60.1409C237.697 59.654 236.553 59.1671 234.898 58.6803L231.173 57.5848C228.885 56.9032 226.962 55.8808 225.404 54.5175C223.895 53.1543 223.14 51.3285 223.14 49.0403C223.14 47.2875 223.627 45.7295 224.601 44.3663C225.623 43.0031 227.011 41.932 228.763 41.153C230.516 40.3253 232.464 39.9114 234.606 39.9114C237.722 39.9114 240.327 40.6661 242.42 42.1754C244.514 43.6847 245.706 45.6322 245.999 48.0178L243.808 48.2369C243.613 46.3868 242.663 44.9019 240.959 43.7821C239.304 42.6623 237.186 42.1024 234.606 42.1024C231.928 42.1024 229.713 42.7596 227.96 44.0742C226.207 45.3887 225.331 47.0441 225.331 49.0403C225.331 50.8417 225.915 52.2293 227.084 53.203C228.252 54.1767 229.908 54.9801 232.05 55.613L236.066 56.7815C239.669 57.8526 241.471 59.4593 241.471 61.6015C241.471 62.9647 240.838 64.0358 239.572 64.8148C238.355 65.5451 236.699 65.9103 234.606 65.9103ZM234.606 70.7303C231.392 70.7303 228.715 69.9757 226.572 68.4664C224.479 66.9571 223.286 65.0096 222.994 62.6239L225.185 62.3318C225.428 64.1819 226.402 65.6912 228.106 66.8597C229.81 67.9795 231.977 68.5394 234.606 68.5394C237.43 68.5394 239.718 67.9065 241.471 66.6406C243.223 65.326 244.1 63.549 244.1 61.3094C244.1 59.508 243.54 58.0473 242.42 56.9275C241.3 55.8077 239.669 54.9801 237.527 54.4445L233.072 53.276C231.417 52.8378 230.151 52.3023 229.275 51.6694C228.398 50.9877 227.96 50.1114 227.96 49.0403C227.96 47.7257 228.569 46.6789 229.786 45.8999C231.052 45.121 232.658 44.7315 234.606 44.7315C236.407 44.7315 237.917 45.0966 239.134 45.8269C240.351 46.5085 241.032 47.4092 241.179 48.529L239.061 48.8212C238.817 47.5553 237.332 46.9224 234.606 46.9224C233.243 46.9224 232.147 47.1171 231.319 47.5066C230.54 47.8474 230.151 48.3586 230.151 49.0403C230.151 49.4784 230.419 49.8679 230.954 50.2087C231.49 50.5009 232.658 50.9147 234.46 51.4503L238.33 52.5457C240.862 53.276 242.81 54.3471 244.173 55.7591C245.585 57.171 246.291 59.0211 246.291 61.3094C246.291 64.2306 245.195 66.5432 243.004 68.2473C240.862 69.9026 238.063 70.7303 234.606 70.7303ZM256.216 70V40.6418H273.67V42.8327H258.407V45.4618H273.67V47.6527H258.407V51.8154H271.333V54.0063H258.407V56.6354H271.333V58.8263H258.407V62.9891H273.67V65.18H258.407V67.8091H273.67V70H256.216ZM251.396 70V40.6418H253.587V70H251.396Z" fill="#1C1C1C"/>
        </svg>
      </div>

      {/* Main content */}
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-[32px] md:text-[48px] font-bold mb-6 tracking-tight text-gray-900 leading-[1.1] px-4 md:px-0">Let's find your new journey</h1>
        <p className="text-gray-500 mb-6 font-medium text-[14px] md:text-[16px] px-6">Tell us what are you looking for we will find the best areas for you</p>

        {/* Search box container */}
        <div className="relative mb-10 max-w-3xl mx-auto px-4 md:px-0">
          <div className="w-full min-h-[128px] border-2 border-[#4355b9]/20 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 bg-white shadow-[0_20px_50px_rgba(67,85,185,0.08)] group focus-within:border-[#4355b9]/40 transition-all duration-300 flex flex-col">
            <div className="flex flex-wrap gap-5 mb-4">
              <AnimatePresence mode="popLayout">
                {selectedCategory === 'Settlers' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key="settlers-chip"
                  >
                    <div className="inline-flex items-center gap-2 bg-[#4355b9] text-white px-4 py-2 rounded-full text-sm font-bold shadow-sm">
                      <Users size={16} strokeWidth={2.5} />
                      <span>Settlers</span>
                      <button 
                        onClick={removeCategory}
                        className="ml-1 p-0.5 hover:bg-white/20 rounded-full transition-colors"
                      >
                        <X size={14} strokeWidth={3} />
                      </button>
                    </div>
                  </motion.div>
                )}
                {selectedSubCategory && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key="sub-chip"
                  >
                    <div className="inline-flex items-center gap-2 bg-[#4355b9] text-white px-4 py-2 rounded-full text-sm font-bold shadow-sm">
                      {selectedSubCategory === 'Job transfer' && <Briefcase size={16} strokeWidth={2.5} />}
                      {selectedSubCategory === 'Family relocating' && <Users size={16} strokeWidth={2.5} />}
                      {selectedSubCategory === 'Student' && <GraduationCap size={16} strokeWidth={2.5} />}
                      <span>{selectedSubCategory}</span>
                      <button 
                        onClick={removeSubCategory}
                        className="ml-1 p-0.5 hover:bg-white/20 rounded-full transition-colors"
                      >
                        <X size={14} strokeWidth={3} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <textarea 
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={getPlaceholder()}
              className="w-full flex-grow border-none outline-none resize-none text-gray-800 bg-transparent placeholder:text-gray-400 text-[16px] font-medium leading-relaxed pr-8"
            />
            
            <button 
              onClick={() => onStart({ category: selectedCategory, subCategory: selectedSubCategory, details })}
              className="absolute right-6 bottom-6 w-12 h-12 bg-[#4355b9] text-white rounded-2xl flex items-center justify-center hover:bg-[#324192] transition-all shadow-lg active:scale-95 z-10"
            >
              <ArrowUp size={24} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Or select */}
        <div className="mt-10">
          <p className="text-gray-500 mb-6 font-medium text-[16px]">
            {selectedCategory === 'Settlers' ? 'What type of settler are you?' : 'Or Select'}
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            {selectedCategory === 'Settlers' ? (
              <>
                <button 
                  onClick={() => handleSubCategoryClick('Job transfer')}
                  className="flex items-center gap-3 px-4 py-2 bg-white border-2 border-[#4355b9] rounded-full text-[#4355b9] font-medium text-[16px] transition-all hover:bg-indigo-50 active:scale-95 shadow-[0_4px_14px_rgba(67,85,185,0.1)]"
                >
                  <Briefcase size={18} strokeWidth={2.5} />
                  <span>Job transfer</span>
                </button>
                <button 
                  onClick={() => handleSubCategoryClick('Family relocating')}
                  className="flex items-center gap-3 px-4 py-2 bg-white border-2 border-[#4355b9] rounded-full text-[#4355b9] font-medium text-[16px] transition-all hover:bg-indigo-50 active:scale-95 shadow-[0_4px_14px_rgba(67,85,185,0.1)]"
                >
                  <Users size={18} strokeWidth={2.5} />
                  <span>Family relocating</span>
                </button>
                <button 
                  onClick={() => handleSubCategoryClick('Student')}
                  className="flex items-center gap-3 px-4 py-2 bg-white border-2 border-[#4355b9] rounded-full text-[#4355b9] font-medium text-[16px] transition-all hover:bg-indigo-50 active:scale-95 shadow-[0_4px_14px_rgba(67,85,185,0.1)]"
                >
                  <GraduationCap size={18} strokeWidth={2.5} />
                  <span>Student</span>
                </button>
                <button 
                  onClick={() => handleSubCategoryClick('Other')}
                  className="flex items-center gap-3 px-4 py-2 bg-white border-2 border-[#4355b9] rounded-full text-[#4355b9] font-medium text-[16px] transition-all hover:bg-indigo-50 active:scale-95 shadow-[0_4px_14px_rgba(67,85,185,0.1)]"
                >
                  <span>other</span>
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => handleCategoryClick('Settlers')}
                  className="flex items-center gap-3 px-4 py-2 bg-white border-2 border-[#4355b9] rounded-full text-[#4355b9] font-medium text-[16px] transition-all hover:bg-indigo-50 active:scale-95"
                >
                  <Users size={18} strokeWidth={2.5} />
                  <span>Settlers</span>
                </button>
                <div className="flex items-center gap-3 px-4 py-2 bg-white border-2 border-[#4355b9] rounded-full text-[#4355b9] font-medium text-[16px] transition-all cursor-default opacity-50">
                  <MapPin size={18} strokeWidth={2.5} />
                  <span>Explorers</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-white border-2 border-[#4355b9] rounded-full text-[#4355b9] font-medium text-[16px] transition-all cursor-default opacity-50">
                  <span className="w-5 h-[2.5px] bg-[#4355b9]" />
                  <span>Other</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
