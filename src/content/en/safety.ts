export const safetyEn = {
  title: 'Comprehensive Safety Guide',
  subtitle: 'Essential safety information for using Mercury GP and any at-home IPL device.',
  sections: [
    {
      heading: 'Before Your First Use',
      icon: 'ClipboardList',
      items: [
        {
          title: 'Read the Official Manual',
          description: 'The Mercury GP user manual is your primary safety reference. Read it completely before your first treatment.',
        },
        {
          title: 'Perform a Patch Test',
          description: 'Test on a small, inconspicuous area. Wait 24-48 hours. If you experience redness, burning, or discomfort beyond mild temporary effects, do not proceed and consult a professional.',
        },
        {
          title: 'Check Your Medications',
          description: 'Some medications increase photosensitivity. Check with your doctor if you take any medications, including topical treatments.',
        },
        {
          title: 'Prepare Your Skin',
          description: 'Shave the treatment area 24 hours before treatment. Clean, dry skin with no lotions, deodorants, or makeup on the area.',
        },
      ],
    },
    {
      heading: 'Contraindications',
      icon: 'AlertTriangle',
      items: [
        {
          title: 'Pregnancy & Breastfeeding',
          description: 'Do not use IPL if you are pregnant or breastfeeding.',
        },
        {
          title: 'Dark Skin Tones',
          description: 'IPL may not be safe for very dark skin tones (Fitzpatrick Types V–VI). The higher melanin content can absorb too much light energy.',
        },
        {
          title: 'Light Hair Colors',
          description: 'IPL is generally not effective on light blonde, red, white, or gray hair. These colors lack sufficient melanin for the light to target.',
        },
        {
          title: 'Active Skin Conditions',
          description: 'Do not use on areas with eczema, psoriasis, active sunburn, open wounds, tattoos, or permanent makeup.',
        },
        {
          title: 'Photosensitizing Conditions',
          description: 'Conditions like lupus, porphyria, or a history of skin cancer may contraindicate IPL use. Consult your doctor.',
        },
        {
          title: 'Certain Medications',
          description: "Accutane (isotretinoin), tetracyclines, St. John's Wort, and other photosensitizing medications may require you to avoid IPL.",
        },
      ],
    },
    {
      heading: 'During Treatment',
      icon: 'Shield',
      items: [
        {
          title: 'Wear Protective Eyewear',
          description: 'Always use the provided safety goggles or equivalent eye protection during treatment.',
        },
        {
          title: 'Start at the Lowest Setting',
          description: 'Begin with the lowest energy level. Gradually increase only if comfortable and after testing.',
        },
        {
          title: 'Do Not Overlap Flashes',
          description: 'Avoid treating the same spot twice in one session. Follow the recommended flash spacing.',
        },
        {
          title: 'Stop If You Feel Pain',
          description: 'Mild warmth or tingling is normal. If you experience significant pain, burning, or blistering, stop immediately.',
        },
      ],
    },
    {
      heading: 'After Treatment',
      icon: 'Heart',
      items: [
        {
          title: 'Soothing Care',
          description: 'Apply a gentle, fragrance-free moisturizer or aloe vera gel if the skin feels warm.',
        },
        {
          title: 'Sun Protection',
          description: 'Avoid direct sun exposure for at least 24-48 hours after treatment. Use SPF 30+ sunscreen.',
        },
        {
          title: 'Avoid Irritants',
          description: 'For 24-48 hours, avoid hot baths, saunas, swimming pools, tight clothing, and harsh skincare products on treated areas.',
        },
        {
          title: 'Monitor Your Skin',
          description: 'Watch for unusual reactions over the next 24-48 hours. Contact a healthcare professional if concerned.',
        },
      ],
    },
    {
      heading: 'When to Consult a Professional',
      icon: 'Stethoscope',
      items: [
        {
          title: 'Persistent Side Effects',
          description: 'If redness, swelling, or discomfort lasts more than 48 hours.',
        },
        {
          title: 'Skin Changes',
          description: 'Any unusual skin changes, blistering, or scarring.',
        },
        {
          title: 'Uncertainty About Suitability',
          description: 'If you are unsure whether IPL is appropriate for your skin type, hair color, or medical history.',
        },
      ],
    },
  ],
  disclaimer: "This safety guide provides general information and does not replace the official Mercury GP user manual or professional medical advice. Always follow the device manufacturer's instructions and consult a qualified healthcare professional for personal medical guidance.",
  closeLabel: 'Close',
} as const;
