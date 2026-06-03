import { createContext, useContext, useState } from 'react';

const BeautyProfileContext = createContext(null);

export function BeautyProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);

  const saveProfile = (profileData) => {
    setProfile(profileData);
  };

  const isGoodForMe = (product) => {
    if (!profile) return false;

    // Skin type: passes if product has no skin-type restriction, or matches user's type
    const skinTypeMatch = !product.skinTypes?.length || product.skinTypes.includes(profile.skinType);

    // Concerns: passes if product has no concern tagging, or overlaps with user concerns
    const concernMatch = !product.skinConcerns?.length ||
      product.skinConcerns.some(c => profile.concerns?.includes(c));

    // Certifications: passes if user has no preferences, or all preferences are met by the product
    const certMatch = !profile.preferences?.length ||
      profile.preferences.every(pref =>
        !product.certifications?.length || product.certifications.includes(pref)
      );

    // All three conditions must pass (previously certMatch was computed but never used)
    return skinTypeMatch && concernMatch && certMatch;
  };

  return (
    <BeautyProfileContext.Provider value={{ profile, saveProfile, isGoodForMe }}>
      {children}
    </BeautyProfileContext.Provider>
  );
}

export const useBeautyProfile = () => {
  const ctx = useContext(BeautyProfileContext);
  if (!ctx) throw new Error('useBeautyProfile must be inside BeautyProfileProvider');
  return ctx;
};
