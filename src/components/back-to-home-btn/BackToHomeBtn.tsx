import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';

export default function BackToHomeBtn() {
  return (
    <>
      {/* Back Button */}
      <div className="mb-10 flex justify-center md:justify-end">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 rounded-2xl border border-border/60 bg-card/60 px-5 py-3 text-sm font-medium backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary hover:shadow-lg"
        >
          <span>الرجوع إلى الرئيسية</span>
          <FaArrowLeft className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </>
  );
}
