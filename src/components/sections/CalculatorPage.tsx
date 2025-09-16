import React, { useState } from 'react';
import { Lang, translations } from '../../locales/translations';

interface CalculatorPageProps {
  lang: Lang;
  onClose: () => void;
}

const CalculatorPage: React.FC<CalculatorPageProps> = ({ lang, onClose }) => {
  const [selectedCalculator, setSelectedCalculator] = useState('');
  const [calculatorTitle, setCalculatorTitle] = useState('');
  const t = translations[lang];
  const calculatorTranslations = t.calculatorPage;

  console.log('CalculatorPage render - selectedCalculator:', selectedCalculator);

  // If a calculator is selected, show it in an iframe
  if (selectedCalculator) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        {/* Header with Back Button */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '16px', 
          borderBottom: '1px solid #e5e7eb',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <button 
              onClick={() => {
                console.log('Back to tools clicked');
                setSelectedCalculator('');
                setCalculatorTitle('');
              }} 
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              ← Back to Tools
            </button>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>{calculatorTitle}</h2>
            <button 
              onClick={() => {
                console.log('Close tools clicked');
                onClose();
              }}
              style={{
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: '1px solid #d1d5db',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Close Tools
            </button>
          </div>
        </div>
        
        {/* Calculator iframe */}
        <div style={{ height: 'calc(100vh - 80px)' }}>
          <iframe 
            src={selectedCalculator}
            style={{ width: '100%', height: '100%', border: 'none' }}
            title={calculatorTitle}
            sandbox="allow-scripts allow-forms allow-same-origin"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '20px' }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '16px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
      }}>
        <button 
          onClick={onClose}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          ← {calculatorTranslations.back}
        </button>
      </div>

      {/* Content */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: 'bold', 
          marginBottom: '16px',
          color: '#111827' 
        }}>
          {calculatorTranslations.title}
        </h1>
        <p style={{ 
          fontSize: '18px', 
          color: '#6b7280',
          marginBottom: '32px'
        }}>
          {lang === 'lt' 
            ? 'Pasirinkite skaičiuoklės įrankį, kad pradėtumėte'
            : 'Choose a calculator tool to get started'
          }
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '32px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {/* AI Calculator */}
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              backgroundColor: '#dbeafe',
              borderRadius: '12px',
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              🧮
            </div>
            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              marginBottom: '16px',
              color: '#111827'
            }}>
              {calculatorTranslations.autoDI}
            </h3>
            <p style={{ 
              color: '#6b7280', 
              marginBottom: '24px',
              lineHeight: '1.5'
            }}>
              {lang === 'lt' 
                ? 'Apskaičiuokite DI automatizavimo potencialią vertę ir ROI jūsų verslo procesams.'
                : 'Calculate the potential value and ROI of AI automation for your business processes.'
              }
            </p>
            <button
              onClick={() => {
                const url = lang === 'lt' ? '/tools/Auto_DI_skaiciuokle.html' : '/tools/Auto_DI_calculator_en.html';
                console.log('AI Calculator clicked, setting URL:', url);
                setSelectedCalculator(url);
                setCalculatorTitle(calculatorTranslations.autoDI);
              }}
              style={{
                width: '100%',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {lang === 'lt' ? calculatorTranslations.ltVersion : calculatorTranslations.enVersion}
            </button>
          </div>

          {/* ROI Calculator */}
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              backgroundColor: '#dcfce7',
              borderRadius: '12px',
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              💰
            </div>
            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              marginBottom: '16px',
              color: '#111827'
            }}>
              {calculatorTranslations.roi}
            </h3>
            <p style={{ 
              color: '#6b7280', 
              marginBottom: '24px',
              lineHeight: '1.5'
            }}>
              {lang === 'lt' 
                ? 'Apskaičiuokite investicijų pelningumo rodiklį automatizavimo projektams ir verslo iniciatyvoms.'
                : 'Calculate return on investment for your automation projects and business initiatives.'
              }
            </p>
            <button
              onClick={() => {
                const url = lang === 'lt' ? '/tools/ROI_LT.html' : '/tools/ROI_EN.html';
                console.log('ROI Calculator clicked, setting URL:', url);
                setSelectedCalculator(url);
                setCalculatorTitle(calculatorTranslations.roi);
              }}
              style={{
                width: '100%',
                backgroundColor: '#16a34a',
                color: 'white',
                border: 'none',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {lang === 'lt' ? calculatorTranslations.ltVersion : calculatorTranslations.enVersion}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;
