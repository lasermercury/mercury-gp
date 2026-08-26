export type ArticleSlug = 'what-is-ipl' | 'treatment-schedule' | 'skin-hair-color' | 'safe-home-use';

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type Article = {
  slug: ArticleSlug;
  title: string;
  tag: string;
  readTime: string;
  author: string;
  sections: ArticleSection[];
  keyTakeaways: string[];
  disclaimer: string;
};

export const articlesEn: Record<ArticleSlug, Article> = {
  'what-is-ipl': {
    slug: 'what-is-ipl',
    title: 'What Is IPL? A Clear Introduction',
    tag: 'Technology',
    readTime: '5 min read',
    author: 'Mercury Team',
    sections: [
      {
        heading: 'What Does IPL Stand For?',
        paragraphs: [
          'IPL stands for Intense Pulsed Light. It is a light-based technology commonly used in at-home hair-reduction devices and professional cosmetic clinics. Unlike traditional lasers, which emit a single, focused wavelength of light, IPL devices produce a broad spectrum of light wavelengths — typically between 500 nm and 1,200 nm.',
          'This broad-spectrum approach means IPL can cover a wider range of targets in the skin, but it is generally considered less precise than laser-based treatments. For at-home hair reduction, IPL offers a practical, non-invasive option that many people find convenient.',
        ],
      },
      {
        heading: 'How Does Light Energy Interact with Hair?',
        paragraphs: [
          'The key to understanding IPL lies in melanin — the pigment that gives hair and skin their color. When IPL light is emitted onto the skin, the melanin in the hair shaft absorbs the light energy and converts it into heat.',
          'This heat then travels from the hair shaft down to the surrounding hair follicle. Over repeated sessions, this thermal effect may influence the follicle\'s ability to produce new hair, potentially leading to a visible reduction in hair growth. The process is most effective when there is a strong contrast between the darkness of the hair and the lightness of the surrounding skin.',
        ],
      },
      {
        heading: 'The Science of Selective Photothermolysis',
        paragraphs: [
          'IPL relies on a principle called selective photothermolysis — the idea that you can selectively target specific chromophores (like melanin) with light energy while minimizing damage to the surrounding tissue. The term was first described by Dr. Rox Anderson and Dr. John Parrish in 1983.',
          'In simplified terms, the light energy is absorbed preferentially by the dark pigment in the hair, heats up quickly, and affects the follicle — while the lighter surrounding skin absorbs far less energy and remains relatively unaffected. This is why IPL tends to work best for people with darker hair on lighter skin tones.',
        ],
      },
      {
        heading: 'IPL vs Laser vs Epilators',
        paragraphs: [
          'It is common to confuse IPL with laser hair removal and epilators, but they are fundamentally different approaches. The table below summarizes the key distinctions:',
        ],
      },
    ],
    keyTakeaways: [
      'IPL uses broad-spectrum light to target melanin in hair, converting light energy into heat that may affect the follicle over repeated sessions.',
      'IPL is not the same as laser — lasers use a single, focused wavelength while IPL uses a wider range of wavelengths.',
      'IPL is a cosmetic device, not a medical treatment. Results vary significantly between individuals.',
      'The best outcomes are generally seen with darker hair on lighter skin, where melanin contrast is highest.',
    ],
    disclaimer:
      'This article is for educational purposes only and does not constitute medical advice. IPL devices are cosmetic tools, not medical devices. Always refer to the official device manual and consult a qualified professional for personal guidance.',
  },

  'treatment-schedule': {
    slug: 'treatment-schedule',
    title: 'Building Your IPL Treatment Schedule',
    tag: 'Planning',
    readTime: '7 min read',
    author: 'Mercury Team',
    sections: [
      {
        heading: 'Why a Schedule Matters',
        paragraphs: [
          'Consistency is one of the most important factors in IPL hair reduction. Because hair grows in cycles — anagen (active growth), catagen (transition), and telogen (resting) — IPL is generally most effective during the anagen phase when the follicle is most active and contains the most melanin.',
          'This means that a single session will only affect the hairs that happen to be in the growth phase at that time. A well-planned schedule ensures that you treat each area frequently enough to catch hairs as they enter the growth phase across multiple cycles.',
        ],
      },
      {
        heading: 'The Initial Phase',
        paragraphs: [
          'During the initial treatment phase, most IPL device manufacturers and general guidance suggest treating the target area every 1 to 2 weeks. This frequency is designed to progressively address hairs as they cycle through the growth phase.',
          'The initial phase typically lasts between 8 to 12 weeks, depending on the body area and individual response. Larger areas like the legs may respond differently than smaller areas like the upper lip. Always follow the specific schedule recommended in your device\'s official manual.',
        ],
      },
      {
        heading: 'The Maintenance Phase',
        paragraphs: [
          'After the initial phase, most users transition to a maintenance schedule. Maintenance sessions are generally less frequent — typically every 4 to 8 weeks — and are intended to address any hair follicles that may become reactivated over time.',
          'Some users find that they need fewer maintenance sessions over time, while others may need to continue at a regular interval. Individual factors such as hormonal changes, genetics, and the specific body area all play a role in how often maintenance is needed.',
        ],
      },
      {
        heading: 'Planning Around Different Body Areas',
        paragraphs: [
          'Different body areas may have different hair growth cycles and sensitivities. For example, facial hair tends to grow faster and may require more frequent initial sessions compared to leg hair. Sensitive areas such as the bikini line or underarms may also require adjusting the intensity level on your device.',
          'It is generally recommended to treat each body area according to its own schedule rather than applying a single schedule to the entire body. Keep a simple log or use a treatment planner to track which areas you have treated and when.',
        ],
      },
      {
        heading: 'Tracking Your Progress',
        paragraphs: [
          'Keeping a treatment journal or using a digital tracker can help you maintain consistency and observe changes over time. Note the date, body area, intensity level used, and any observations about hair growth or skin response.',
          'Many users find that visible changes become noticeable after 4 to 6 sessions, but this varies widely. Tracking helps you stay committed to the schedule and provides useful information if you consult a professional about your progress.',
        ],
      },
    ],
    keyTakeaways: [
      'Consistency across multiple weeks is essential — IPL works best when sessions are spaced according to a planned schedule.',
      'The initial phase generally involves sessions every 1 to 2 weeks for 8 to 12 weeks, followed by maintenance every 4 to 8 weeks.',
      'Different body areas may need different treatment frequencies and intensity levels.',
      'Tracking your sessions helps maintain consistency and provides a record of your progress over time.',
    ],
    disclaimer:
      'This article provides general educational guidance and does not replace the official treatment schedule in your device manual. Individual results vary. Consult a qualified professional for personalized advice.',
  },

  'skin-hair-color': {
    slug: 'skin-hair-color',
    title: 'Skin Tone and Hair Color: What You Need to Know',
    tag: 'Guidance',
    readTime: '6 min read',
    author: 'Mercury Team',
    sections: [
      {
        heading: 'Understanding the Fitzpatrick Scale',
        paragraphs: [
          'The Fitzpatrick Scale is a widely used classification system that categorizes skin into six types (I through VI) based on its response to ultraviolet (UV) exposure. While it was originally developed for dermatological purposes, it has become a common reference point for IPL suitability.',
          'Type I represents very fair skin that always burns and never tans, while Type VI represents deeply pigmented skin that rarely or never burns. Most at-home IPL devices are generally designed for use on Types I through IV, with some newer models extending to Type V. Always check the specific skin-tone compatibility listed in your device\'s official manual.',
        ],
      },
      {
        heading: 'Why Contrast Matters',
        paragraphs: [
          'IPL technology relies on the contrast between the color of the hair and the color of the surrounding skin. The melanin in dark hair absorbs light energy effectively, while lighter skin reflects most of the light away, minimizing heat absorption in the skin itself.',
          'When this contrast is low — for example, light blonde hair on light skin, or dark hair on dark skin — the risk profile changes. Light hair may not absorb enough energy to effectively heat the follicle, while dark skin may absorb too much energy, potentially causing discomfort or adverse effects.',
        ],
      },
      {
        heading: 'Which Combinations Work Best?',
        paragraphs: [
          'The generally accepted ideal combination for IPL is dark hair (brown to black) on lighter skin tones (Fitzpatrick Types I to III). This pairing offers the highest melanin contrast, allowing the light energy to be absorbed primarily by the hair rather than the skin.',
          'Medium brown hair on light to medium skin tones can also respond well. However, red, blonde, grey, and white hair typically contain very little melanin, which means they may not respond effectively to IPL treatment regardless of skin tone. Always consult the specific compatibility guidance for your device.',
        ],
      },
      {
        heading: 'What to Do If You Are Unsure',
        paragraphs: [
          'If you are uncertain about whether IPL is suitable for your skin tone and hair color combination, there are several steps you can take. First, carefully review the compatibility chart in your device\'s official manual — most manufacturers provide clear guidance on which combinations are supported.',
          'Second, perform a patch test on a small, inconspicuous area as directed in the manual. Wait 24 to 48 hours and observe for any adverse reactions. Third, if you have any doubts, consult a qualified dermatologist or healthcare professional who can assess your individual suitability and provide personalized advice.',
        ],
      },
    ],
    keyTakeaways: [
      'The Fitzpatrick Scale (Types I–VI) is the standard reference for IPL skin-tone compatibility — most home devices cover Types I through IV.',
      'IPL works best with high contrast: dark hair on lighter skin. Low contrast reduces effectiveness and may increase risk.',
      'Light-colored hair (blonde, red, grey, white) generally does not respond well to IPL due to low melanin content.',
      'When in doubt, always perform a patch test and consult a qualified professional before beginning treatment.',
    ],
    disclaimer:
      'This article is for educational purposes only. Skin-tone and hair-color suitability varies by device and individual. Always refer to your device\'s official manual and consult a qualified professional for personal guidance.',
  },

  'safe-home-use': {
    slug: 'safe-home-use',
    title: 'Safe Home-Use Habits for IPL Devices',
    tag: 'Safety',
    readTime: '4 min read',
    author: 'Mercury Team',
    sections: [
      {
        heading: 'Pre-Treatment Patch Test Protocol',
        paragraphs: [
          'Before using an IPL device on any area, performing a patch test is strongly recommended. Select a small, inconspicuous area of skin — such as the inside of your forearm or a small section of the treatment area — and apply the device at the lowest recommended intensity setting.',
          'Wait 24 to 48 hours and carefully observe the test area for any signs of redness, blistering, burning, or unusual discoloration. If you notice any adverse reaction, do not proceed with treatment and consult a healthcare professional. If no reaction occurs, you may gradually increase the intensity as described in your device manual.',
        ],
      },
      {
        heading: 'Contraindications to Know',
        paragraphs: [
          'IPL devices are not suitable for everyone. There are several common contraindications that you should be aware of before beginning treatment. These generally include: active skin conditions (such as eczema, psoriasis, or severe acne) in the treatment area, pregnancy or breastfeeding, use of photosensitizing medications (including certain antibiotics and acne treatments), recent sun exposure or tanning, a history of skin cancer or pre-cancerous lesions, and the presence of tattoos or permanent makeup in the treatment area.',
          'This list is not exhaustive. Always review the full list of contraindications in your device\'s official manual and consult a healthcare professional if you have any medical conditions or concerns.',
        ],
      },
      {
        heading: 'Treatment Area Preparation',
        paragraphs: [
          'Proper preparation of the treatment area can support both safety and effectiveness. Shave the area 24 hours before treatment — IPL works best when the light can reach the hair follicle beneath the skin, and long hair on the surface can absorb energy and cause surface burns.',
          'Clean the skin thoroughly to remove any lotions, deodorants, or makeup that could interfere with light transmission. Ensure the skin is dry before beginning. Avoid applying any products to the treatment area immediately before or after the session unless directed by the device manual.',
        ],
      },
      {
        heading: 'Post-Treatment Care',
        paragraphs: [
          'After an IPL session, the treated skin may appear slightly red or feel warm — this is generally normal and typically subsides within a few hours. Apply a gentle, fragrance-free moisturizer or aloe vera gel to soothe the area if needed.',
          'Avoid direct sun exposure on treated areas for at least 24 to 48 hours. Apply a broad-spectrum sunscreen (SPF 30 or higher) if you need to go outside. Avoid hot showers, saunas, excessive exercise, and exfoliating products on treated areas for 24 hours after treatment.',
        ],
      },
      {
        heading: 'When to Stop and Consult a Professional',
        paragraphs: [
          'If you experience persistent redness lasting more than 48 hours, blistering, severe pain, swelling, changes in skin pigmentation, or any other unusual symptoms after treatment, stop using the device immediately and consult a qualified healthcare professional or dermatologist.',
          'Additionally, if you notice no change in hair growth after completing the recommended initial treatment phase, or if you have questions about adjusting your schedule, seeking professional guidance can help you make informed decisions about next steps.',
        ],
      },
    ],
    keyTakeaways: [
      'Always perform a patch test 24–48 hours before full treatment and observe for any adverse reactions.',
      'Know the contraindications — IPL may not be safe if you are pregnant, on certain medications, or have active skin conditions.',
      'Shave 24 hours before treatment and ensure skin is clean and dry for best results.',
      'Stop treatment and seek professional help if you experience persistent redness, blistering, pain, or pigment changes.',
    ],
    disclaimer:
      'This article is for educational purposes only and does not constitute medical advice. Always refer to your device\'s official manual for complete safety guidance and consult a qualified healthcare professional for personal medical concerns.',
  },
};
