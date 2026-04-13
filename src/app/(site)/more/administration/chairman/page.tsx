"use client";

import Image from "next/image";
import {
  Shield,
  Briefcase,
  Landmark,
  Rocket,
  BookOpen,
  Star,
  Bookmark,
} from "lucide-react";

export default function DrShekharDuttBiography() {
  return (
    <main className="min-h-screen  antialiased">
      {/* Hero Section */}
      <section className="relative  text-white pb-20 pt-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Portrait Image */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl bg-slate-700">
            <Image
              // Replace with the actual image path: src="/images/dr-shekhar-dutt.jpg"
              src="/img/dr_shekhar_dutt.webp"
              alt="Dr. Shekhar Dutt, SM"
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
            Dr. Shekhar Dutt, SM
          </h1>
          <p className="text-lg md:text-xl text-blue-200 font-medium mb-2">
            IAS (Retd.) | Governor of Chhattisgarh (2010–2014)
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Distinguished Civil Servant • Decorated War Veteran • Strategic
            Administrator
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div
          className="p-6 md:p-8 flex flex-col justify-center rounded-xl border-l-4 border-[#ff6b35] shadow-2xl
         bg-[linear-gradient(to_right_bottom,#0c141c,#14121b,#191118,#1c1114,#1c120f)]  "
        >
          <h2 className="text-2xl text-white font-bold flex items-center gap-3 mb-4">
            <Bookmark className="w-7 h-7 text-amber-600 shrink-0" />{" "}
            Introduction
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Dr. Shekhar Dutt was a distinguished Indian civil servant, decorated
            war veteran, and accomplished administrator whose career exemplified
            excellence in public service, national security, and strategic
            governance. A 1969-batch IAS officer of the Madhya Pradesh cadre, he
            rose to hold several of the highest offices in the Government of
            India, combining deep administrative acumen with frontline military
            experience.
          </p>
        </div>
      </section>

      {/* Military Service */}

      <section className="max-w-6xl mx-auto px-6 py-8">
        <div
          className="p-6 md:p-8 flex flex-col justify-center rounded-xl border-l-4 border-[#ff6b35] shadow-2xl
         bg-[linear-gradient(to_right_bottom,#0c141c,#14121b,#191118,#1c1114,#1c120f)]  "
        >
          <h2 className="text-2xl text-white font-bold flex items-center gap-3 mb-4">
            <Shield  className="w-7 h-7 text-amber-600 shrink-0" /> Military
            Service
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Dr. Dutt began his professional journey as a Short Service
            Commissioned officer in the Indian Army. He participated with
            distinction in the 1971 Indo-Pakistani War, serving with the 218
            Medium Regiment in the western sector. For his gallantry, he was
            awarded the Sena Medal (SM). This early experience in combat and
            leadership profoundly shaped his later contributions to defence and
            strategic affairs.
          </p>
        </div>
      </section>

      {/* Civil Services Career */}

      <section className="max-w-6xl mx-auto px-6 py-8 ">
        
        <div
          className="bg-white rounded-2xl shadow-md  border border-white/20 
         bg-[linear-gradient(to_right_bottom,#0c141c,#14121b,#191118,#1c1114,#1c120f)] p-6 md:p-8"
        >
            <h2 className="text-2xl font-bold   text-white flex items-center gap-3 mb-6">
          <Briefcase className="w-7 h-7 text-blue-600 shrink-0" /> Civil
          Services Career
        </h2>
          <p className="text-white mb-6">
            As a senior IAS officer, Dr. Dutt held critical positions at both
            state and central levels, including:
          </p>
          <ul className="space-y-5">
            {[
              {
                role: "Defence Secretary, Government of India",
                years: "2005–2007",
                desc: "Oversaw key aspects of defence policy, procurement, and modernisation.",
              },
              {
                role: "Deputy National Security Advisor",
                years: "2007–2009",
                desc: "Responsible for defence, internal security, and strategic policy matters.",
              },
              {
                role: "Director General, Sports Authority of India",
                years: "2001–2003",
                desc: "",
              },
              {
                role: "Principal Secretary, Government of Madhya Pradesh",
                years: "1996–2001",
                desc: "Handled Tribal & SC Welfare, School Education, and Sports & Youth Welfare.",
              },
              {
                role: "Secretary, Ministry of Health and Family Welfare (AYUSH)",
                years: "",
                desc: "",
              },
            ].map((item, i) => (
              <li
                key={i}
                className="flex flex-col md:flex-row gap-2 md:gap-6 pb-4 border-b border-slate-100 last:border-0 last:pb-0"
              >
                <div className="md:w-2/5">
                  <span className="font-semibold text-white">{item.role}</span>
                  {item.years && (
                    <span className="block text-sm text-white mt-1">
                      {item.years}
                    </span>
                  )}
                </div>
                {item.desc && (
                  <div className="md:w-3/5">
                    <p className="text-white">{item.desc}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-4 border-t border-slate-100">
            <p className="text-white leading-relaxed">
              He was an alumnus of the Defence Services Staff College, the
              National Defence College, and held advanced qualifications
              including a Postgraduate Diploma in Development Studies from
              Swansea University, United Kingdom. He was also associated with
              IIT Bombay.
            </p>
          </div>
        </div>
      </section>

      {/* Governor of Chhattisgarh */}
      <section className="max-w-6xl mx-auto px-6 py-8  ">
        <div
          className="  text-white
         bg-[linear-gradient(to_right_bottom,#0c141c,#14121b,#191118,#1c1114,#1c120f)] rounded-2xl shadow-md  border-l-4 border-blue-600 p-6 md:p-8"
        >
          <h2 className="text-2xl font-bold   flex items-center gap-3 mb-2">
            <Landmark className="w-7 h-7 text-blue-600 shrink-0" /> Governor of
            Chhattisgarh
          </h2>
          <p className="text-sm font-medium text-blue-600 mb-4">
            23 January 2010 – 18 June 2014
          </p>
          <p className="  leading-relaxed">
            Dr. Dutt served as the 4th Governor of Chhattisgarh. During his
            tenure, he focused on strengthening governance, addressing internal
            security challenges (particularly Left-Wing Extremism), promoting
            inclusive development in tribal regions, and advancing sectors such
            as higher education, agriculture, and infrastructure.
          </p>
        </div>
      </section>

      {/* Post-Retirement Contributions */}

      <section className="max-w-6xl mx-auto px-6 py-8  ">
        <div
          className="  text-white
         bg-[linear-gradient(to_right_bottom,#0c141c,#14121b,#191118,#1c1114,#1c120f)] rounded-2xl shadow-md  border-l-4 border-blue-600 p-6 md:p-8"
        >
          <h2 className="text-2xl font-bold  text-white flex items-center gap-3 mb-6">
            <Rocket className="w-7 h-7 text-indigo-600 shrink-0" />{" "}
            Post-Retirement Contributions
          </h2>

          <p className="  leading-relaxed py-2">
            After superannuation, Dr. Dutt remained actively engaged in
            nation-building. He served as Director General of the Sustainable
            Projects Developers Association, where he played a significant role
            in policy advocacy for the energy sector, with particular emphasis
            on renewable energy development.
          </p>
          <p className="  leading-relaxed py-4">
            He also served as Chairman of the Bharat Space Education Research
            Centre (BSERC), mentoring students, researchers, and professionals
            in space technology, defence innovation, and emerging strategic
            domains. He was also associated with the Indian Space Association
            (ISpA). Known for his supportive approach, he consistently guided
            visionary minds in converting ideas into actionable initiatives for
            national development and security.
          </p>
          <blockquote className="bg-slate-800  border-l-4 border-orange-500 p-4 rounded-r-lg italic  ">
            Bharat Space Education Research Centre (BSERC) stands inspired by
            the visionary leadership of Sena Medal Awardee Shri Shekhar Dutt,
            paying annual tribute to his pioneering ideals on 20th December
            through continued excellence in defence-space education.
          </blockquote>
        </div>
      </section>

      {/* Literary Contributions */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div
          className=" text-white
         bg-[linear-gradient(to_right_bottom,#0c141c,#14121b,#191118,#1c1114,#1c120f)]  rounded-2xl shadow-md border-l-4 border-emerald-600 p-6 md:p-8"
        >
          <h2 className="text-2xl font-bold flex items-center gap-3 mb-4">
            <BookOpen className="w-7 h-7 text-emerald-600 shrink-0" /> Literary
            Contributions
          </h2>
          <p className=" leading-relaxed mb-4">
            An insightful thinker and author, Dr. Dutt wrote{" "}
            <span className="font-semibold italic ">
              "Reflections on Contemporary India"
            </span>{" "}
            (published in 2014). The book comprises a collection of essays and
            lectures offering thoughtful perspectives on governance, society,
            security, and India’s development trajectory, primarily addressed to
            young readers and future leaders.
          </p>
          <p className="leading-relaxed">
            It was formally released at Rashtrapati Bhavan on 10 February 2014,
            with the Honourable President of India, Shri Pranab Mukherjee,
            receiving the first copy from the then Speaker of the Lok Sabha,
            Smt. Meira Kumar. President Mukherjee commended Dr. Dutt for
            documenting his experiences and reflections on critical national
            issues.
          </p>
        </div>
      </section>

      {/* Legacy */}
      <section className="max-w-6xl mx-auto px-6 py-8 mb-16">
        <div
          className=" border border-white/30
         bg-[linear-gradient(to_right_bottom,#0c141c,#14121b,#191118,#1c1114,#1c120f)] rounded-2xl shadow-xl p-6 md:p-10 text-white"
        >
          <h2 className="text-2xl font-bold flex items-center gap-3 mb-4">
            <Star className="w-7 h-7 text-amber-400 shrink-0" /> Legacy
          </h2>
          <p className=" leading-relaxed mb-4">
            Dr. Shekhar Dutt passed away on 2 July 2025 in New Delhi at the age
            of 79. His demise was widely mourned by the Ministry of Defence,
            strategic communities, and public figures, who remembered him as a
            decorated soldier, visionary administrator, and dedicated public
            servant.
          </p>
          <p className=" leading-relaxed">
            Throughout his life, Dr. Dutt embodied the highest traditions of
            duty, integrity, and strategic foresight. From the battlefields of
            1971 to the apex levels of governance and policy formulation, his
            contributions to India’s defence preparedness, administrative
            reforms, education, sports, renewable energy, and youth empowerment
            remain enduring. He will be remembered as a true Karmayogi whose
            legacy continues to inspire generations committed to national
            service and excellence.
          </p>
        </div>
      </section>
    </main>
  );
}
