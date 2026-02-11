"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Is NoteNest free to use?",
    answer: "Yes! NoteNest is open-source software. You can self-host it for free forever. We also offer a managed cloud version for teams who don't want to manage infrastructure."
  },
  {
    question: "How can I contribute?",
    answer: "We love contributors! Head over to our GitHub repository. You can pick up 'good first issues', improve documentation, or suggest new features in the discussions tab."
  },
  {
    question: "Is there a self-hosting guide?",
    answer: "Absolutely. Our documentation includes a comprehensive Docker Compose setup guide that gets you up and running in minutes on any VPS or local machine."
  },
  {
    question: "How does the real-time collaboration work?",
    answer: "We use WebSockets (via Socket.io) and Y.js CRDTs to ensure conflict-free, real-time editing, even with multiple users typing in the same block."
  }
];

const FAQItem = ({ item, isOpen, onClick }: { item: any, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border-b border-black/5 last:border-none">
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left group hover:opacity-70 transition-opacity"
      >
        <span className="text-xl font-serif font-bold text-[#1A1A1A]">{item.question}</span>
        <div className={`w-8 h-8 rounded-full border border-black/10 flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-[#1A1A1A] text-white' : 'bg-white text-[#1A1A1A]'}`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[#1A1A1A]/70 leading-relaxed font-medium max-w-2xl">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[#F3F0E6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full border border-black/10 bg-white/50 backdrop-blur-sm text-sm font-bold uppercase tracking-wider mb-6"
          >
            Support
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-black text-[#1A1A1A]"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-black/5">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index} 
              item={faq} 
              isOpen={openIndex === index} 
              onClick={() => setOpenIndex(openIndex === index ? null : index)} 
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
