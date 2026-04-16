import React, { useState } from 'react';
import { Globe, ShieldAlert, Network, Target, Map, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const LandingFeatures: React.FC = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const features = [
    {
      icon: <Globe className="w-5 h-5 text-orange" />,
      title: "Intelijen Geopolitik dan Keamanan yang Berwawasan ke Depan",
      description: "Tetap selangkah di depan ketidakstabilan dengan penilaian intelijen yang antisipatif dan dapat ditindaklanjuti.",
      details: "Menganalisis bagaimana perkembangan geopolitik, isu keamanan, dan ancaman yang muncul kemungkinan akan berkembang dan berdampak pada personel, operasi, atau reputasi Anda — memberikan konteks dan wawasan yang siap untuk pengambilan keputusan bagi organisasi global.",
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-orange" />,
      title: "Penilaian Risiko Komprehensif",
      description: "Dapatkan penilaian risiko terstruktur di seluruh risiko keamanan, geopolitik, siber, dan reputasi.",
      details: "Disampaikan melalui platform SIAS untuk pemantauan berkelanjutan, atau secara khusus melalui layanan konsultasi yang disesuaikan dengan aset, pasar, dan toleransi risiko Anda.",
    },
    {
      icon: <Network className="w-5 h-5 text-orange" />,
      title: "Ancaman Siber dengan Konteks Geopolitik",
      description: "Pahami bagaimana peristiwa dunia nyata seperti politik, perang, sanksi, dan persaingan geopolitik membentuk ancaman siber.",
      details: "Dengan menerapkan intelijen geopolitik yang berwawasan ke depan, kami membantu tim keamanan dan siber mengantisipasi bagaimana taktik, teknik, dan target pelaku siber kemungkinan akan berkembang — memberikan peringatan dini dan wawasan jangka panjang yang lebih luas daripada sekadar indikator teknis.",
    },
    {
      icon: <Target className="w-5 h-5 text-orange" />,
      title: "Intelijen Pelindung",
      description: "Layanan khusus yang memantau dan menilai ancaman khusus terhadap organisasi Anda.",
      details: "Kami melacak niat jahat, propaganda ekstremis, ancaman kriminal, dan pengungkapan informasi sensitif, mengidentifikasi risiko dari individu, penjahat terorganisasi, dan teroris untuk memastikan perlindungan komprehensif yang disesuaikan dengan kebutuhan perusahaan Anda.",
    },
    {
      icon: <Map className="w-5 h-5 text-orange" />,
      title: "Uji Tuntas Masuk/Keluar Pasar",
      description: "Dukung keputusan masuk atau keluar pasar strategis dengan uji tuntas yang berfokus pada keamanan.",
      details: "Mengungkap risiko geopolitik, keamanan, dan ancaman, membantu organisasi menilai paparan sebelum menginvestasikan modal atau personel.",
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="w-full max-w-5xl mx-auto mt-12 mb-24 flex flex-col gap-12"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-sans font-light text-ink tracking-tight mb-4">
          Kapabilitas Platform SIAS
        </h2>
        <p className="text-muted font-serif italic max-w-2xl mx-auto text-lg">
          Platform intelijen strategis yang memberikan wawasan mendalam dan analisis prediktif untuk melindungi aset, operasi, dan reputasi organisasi Anda secara global.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="flex flex-col bg-panel rounded-xl border border-line shadow-sm overflow-hidden"
          >
            <div 
              className="p-6 cursor-pointer flex flex-col gap-4 hover:bg-bg transition-colors"
              onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-bg rounded-full border border-line">
                    {feature.icon}
                  </div>
                  <h3 className="font-sans font-medium text-ink text-lg tracking-wide">
                    {feature.title}
                  </h3>
                </div>
                {expandedIdx === idx ? (
                  <ChevronUp className="w-5 h-5 text-muted" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted" />
                )}
              </div>
              <p className="text-muted font-serif text-base leading-relaxed pl-16">
                {feature.description}
              </p>
            </div>
            
            <AnimatePresence>
              {expandedIdx === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden bg-bg border-t border-line"
                >
                  <div className="p-6 pl-22">
                    <div className="text-xs font-sans text-muted uppercase tracking-[0.15em] mb-2">Detail Teknis</div>
                    <p className="text-ink font-sans text-sm leading-relaxed">
                      {feature.details}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

