import React from 'react';

// Privatumo politikos komponentas
const PrivacyPolicyPage: React.FC<{ setShowPrivacy: (v: boolean) => void }> = ({ setShowPrivacy }) => (
  <div className="max-w-3xl mx-auto py-16 px-4 bg-white rounded-xl shadow-lg mt-10 mb-10">
    <button type="button" onClick={() => setShowPrivacy(false)} className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Grįžti</button>
    <h1 className="text-3xl font-bold mb-6">Privatumo politika</h1>
    <p className="mb-4">Ši privatumo politika paaiškina, kaip mes renkame, naudojame ir saugome jūsų asmens duomenis, kai naudojatės šiuo puslapiu. Mes laikomės Europos Sąjungos Bendrojo duomenų apsaugos reglamento (BDAR, angl. GDPR) reikalavimų.</p>
    <h2 className="text-xl font-semibold mt-6 mb-2">1. Kokius duomenis renkame?</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>Kontaktinė informacija (vardas, el. paštas, žinutės turinys, jei užpildote kontaktų formą ar atsiliepimą)</li>
      <li>Techninė informacija (IP adresas, naršyklės tipas, įrenginio informacija, slapukai ir pan.)</li>
    </ul>
    <h2 className="text-xl font-semibold mt-6 mb-2">2. Kaip naudojame jūsų duomenis?</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>Jūsų užklausų ar atsiliepimų administravimui ir atsakymui</li>
      <li>Puslapio veikimo, saugumo ir kokybės užtikrinimui</li>
      <li>Statistinei analizei (anonimiškai)</li>
    </ul>
    <h2 className="text-xl font-semibold mt-6 mb-2">3. Duomenų saugojimas ir apsauga</h2>
    <p className="mb-4">Jūsų duomenys saugomi saugiose serveriuose ir prieinami tik įgaliotiems asmenims. Imtasi visų pagrįstų techninių ir organizacinių priemonių jūsų duomenų apsaugai.</p>
    <h2 className="text-xl font-semibold mt-6 mb-2">4. Jūsų teisės</h2>
    <ul className="list-disc ml-6 mb-4">
      <li>Gauti informaciją apie tvarkomus jūsų duomenis</li>
      <li>Prašyti ištaisyti ar ištrinti duomenis</li>
      <li>Prašyti apriboti duomenų tvarkymą</li>
      <li>Pateikti skundą priežiūros institucijai</li>
    </ul>
    <h2 className="text-xl font-semibold mt-6 mb-2">5. Slapukai (Cookies)</h2>
    <p className="mb-4">Puslapyje naudojami būtini slapukai, kurie reikalingi tinkamam svetainės veikimui. Jūs galite valdyti slapukų nustatymus savo naršyklėje.</p>
    <h2 className="text-xl font-semibold mt-6 mb-2">6. Kontaktai</h2>
    <p>Jei turite klausimų dėl privatumo politikos ar savo duomenų, susisiekite el. paštu: <a href="mailto:info@aiautomate.com" className="text-blue-600 underline">info@aiautomate.com</a></p>
    <p className="mt-8 text-gray-500 text-sm">Atnaujinta: {new Date().toLocaleDateString('lt-LT')}</p>
  </div>
);

export default PrivacyPolicyPage;
