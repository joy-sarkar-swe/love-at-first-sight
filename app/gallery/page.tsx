import type { LightboxItem } from "@/components/ui-lafs";
import {
  BlurReveal,
  CinematicHero,
  LightboxImage,
  Section,
} from "@/components/ui-lafs";

const IMG = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const HERO = IMG("photo-1414235077428-338989a2e8c0", 2400);

const shots: (LightboxItem & { span?: string })[] = [
  {
    src: IMG("photo-1476224203421-9ac39bcb3327"),
    alt: "A chef plating at home",
    caption: "A chef plating at home",
    span: "md:col-span-7 md:row-span-2",
  },
  {
    src: IMG("photo-1519708227418-c8fd9a32b7a2"),
    alt: "Wine and candlelight",
    caption: "Wine and candlelight",
    span: "md:col-span-5",
  },
  {
    src: IMG("photo-1481931098730-318b6f776db0"),
    alt: "Fresh ingredients",
    caption: "Fresh ingredients",
    span: "md:col-span-5",
  },
  {
    src: IMG("photo-1467003909585-2f8a72700288"),
    alt: "The table, set",
    caption: "The table, set",
    span: "md:col-span-8",
  },
  {
    src: IMG("photo-1551218808-94e220e084d2"),
    alt: "The evening begins",
    caption: "The evening begins",
    span: "md:col-span-4",
  },
  {
    src: IMG("photo-1414235077428-338989a2e8c0"),
    alt: "Wine and candlelight",
    caption: "Wine and candlelight",
    span: "md:col-span-6",
  },
  {
    src: IMG("photo-1466978913421-dad2ebd01d17"),
    alt: "The table, set",
    caption: "The table, set",
    span: "md:col-span-6",
  },
  {
    src: IMG("photo-1504754524776-8f4f37790ca0"),
    alt: "A chef plating at home",
    caption: "A chef plating at home",
    span: "md:col-span-4",
  },
  {
    src: IMG("photo-1495474472287-4d71bcdd2085"),
    alt: "The evening begins",
    caption: "The evening begins",
    span: "md:col-span-8",
  },
];

export default function GalleryPage() {
  const group: LightboxItem[] = shots.map(({ src, alt, caption }) => ({
    src,
    alt,
    caption,
  }));
  return (
    <>
      <CinematicHero
        image={HERO}
        badge='Gallery · 2024–2026'
        headline={"Rooms\nRemembered."}
        caption='A slow scroll through the evenings people wrote us about afterward — the candles, the plates, the long pauses between them.'
        height='compact'
      />

      <Section tone='burgundy'>
        <div className='mb-14 md:mb-20 grid gap-8 md:grid-cols-12 items-end'>
          <div className='md:col-span-4'>
            <span className='label'>n°01 · what defines us</span>
          </div>
          <BlurReveal as='h2' className='md:col-span-8 text-stack'>
            {"see what\ndefines us."}
          </BlurReveal>
        </div>

        <div className='grid grid-cols-2 gap-3 md:grid-cols-12 md:auto-rows-[220px] md:gap-6'>
          {shots.map((s, i) => (
            <LightboxImage
              key={s.src}
              src={s.src}
              alt={s.alt}
              caption={s.caption}
              group={group}
              index={i}
              className={`col-span-1 h-56 md:h-auto ${s.span ?? "md:col-span-4"}`}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
