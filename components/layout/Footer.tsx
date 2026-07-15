import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-burgundy-deep text-cream">
      <div className="container-page pt-24 pb-10">
        {/* Big editorial wordmark */}
        <div className="border-b border-cream/15 pb-14">
          <div className="font-display font-bold lowercase text-[clamp(3rem,10vw,9rem)] leading-[0.88] tracking-[-0.045em]">
            love, plated.
          </div>
          <p className="mt-6 max-w-md text-cream/70 leading-relaxed text-[15px]">
            A marketplace of freelance private chefs — for the first date, the tenth anniversary, and every quiet evening worth remembering. We reply within one evening.
          </p>
        </div>

        {/* Four-column Swiss grid */}
        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <div className="label">Explore</div>
            <ul className="mt-6 space-y-3 text-[14px]">
              <li><Link href="/chefs" className="hover:text-cream transition-colors">Chefs</Link></li>
              <li><Link href="/for-chefs" className="hover:text-cream transition-colors">For Chefs</Link></li>
              <li><Link href="/gallery" className="hover:text-cream transition-colors">Gallery</Link></li>
              <li><Link href="/journal" className="hover:text-cream transition-colors">Journal</Link></li>
              <li><Link href="/book" className="hover:text-cream transition-colors">Reservations</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="label">For Chefs</div>
            <ul className="mt-6 space-y-3 text-[14px]">
              <li><Link href="/for-chefs" className="hover:text-cream transition-colors">Apply to cook</Link></li>
              <li><Link href="/chef-handbook" className="hover:text-cream transition-colors">Chef handbook</Link></li>
              <li><Link href="/payouts" className="hover:text-cream transition-colors">Payouts</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="label">Company</div>
            <ul className="mt-6 space-y-3 text-[14px]">
              <li><Link href="/our-story" className="hover:text-cream transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-cream transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-cream transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="label">Legal</div>
            <ul className="mt-6 space-y-3 text-[14px]">
              <li><Link href="/privacy" className="hover:text-cream transition-colors">Privacy</Link></li>
              <li><Link href="/returns" className="hover:text-cream transition-colors">Cancellations</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-6 border-t border-cream/15 pt-6 text-[11px] font-mono uppercase tracking-[0.14em] text-cream/50">
          <div className="truncate">
            © {new Date().getFullYear()} Love at First Sight
            <sup className="ml-1 text-[9px] tracking-[0.14em]">℠</sup>
            {/* <span className="mx-3 text-cream/25">·</span> */}
            {/* <span className="text-cream/60">made for the deeply in love</span> */}
          </div>
          <div className="shrink-0 text-cream/60">a marketplace, not a restaurant</div>
        </div>
      </div>
    </footer>
  );
}