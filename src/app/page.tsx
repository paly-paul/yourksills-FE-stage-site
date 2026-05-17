"use client";

import CustomBadge from "@/components/CustomBadge";
import { AccentButton } from "@/components/CustomButton";
import SwiperCarousel from "@/components/SwiperCarousel";
import TitleComponent from "@/components/TitleComponent";
import VideoPlayer from "@/components/VideoComponent";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}: FeatureCardProps) => {
  return (
    <div className='text-center space-y-4'>
      <div className='inline-flex items-center justify-center w-24 h-24'>
        {icon}
      </div>
      <h3 className='text-lg md:text-2xl font-bold'>{title}</h3>
      <p className='text-sm md:text-md font-medium text-grey max-w-sm mx-auto'>
        {description}
      </p>
    </div>
  );
};

interface StatsCardProps {
  value: string;
  label: string;
  index: number;
  length: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
  value,
  label,
  index,
  length,
}: StatsCardProps) => {
  const backgroundPosition = `${(index / (length - 1)) * 100}% 0%`;
  return (
    <div
      className='rounded-xl px-4 py-8 md:px-8 md:py-8 text-center text-white backdrop-blur-sm'
      style={{
        background:
          "linear-gradient(110deg, #72719e, #3c3c78, #313171, #323272)",
        backgroundSize: `${length * 100}% 100%`, // e.g., 4 → 400%
        backgroundPosition,
      }}>
      <p className='text-3xl md:text-2xl font-semibold gradient-text-light'>
        {value}
      </p>
      <p className='text-sm md:text-[15px] text-violet-50 mt-2'>{label}</p>
    </div>
  );
};

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({
  icon,
  title,
  description,
}: StepCardProps) => {
  return (
    <div className='relative w-full h-full p-8 text-center'>
      <div className='dot-gradient-bg rounded-xl fade-mask-vertical -z-10 absolute w-full h-full inset-0 border border-violet-100'></div>

      <div className='inline-flex items-center justify-center mb-8 w-24 h-24'>
        {icon}
      </div>
      <h3 className='text-lg md:text-2xl font-semibold mb-1 text-title-black'>{title}</h3>
      <p className='text-sm md:text-lg text-grey'>{description}</p>
    </div>
  );
};

interface SlideCardProps {
  image: string;
  title: string;
  description: string;
}

const SlideCard: React.FC<SlideCardProps> = ({ image, title, description }) => {
  return (
    <div className='h-[280px] sm:h-60 lg:h-100 carousel-slider-gradient px-4 rounded-2xl tag-shadow text-center  mx-auto space-y-2 flex flex-col items-center justify-center'>
      <div className='relative mb-2 w-full h-[40%]'>
        <Image src={image} alt='' fill className='object-contain' />
      </div>
      <h3 className='text-lg md:text-2xl font-semibold text-title-black'>
        {title}
      </h3>
      <p className='text-sm md:text-lg text-grey'>{description}</p>
    </div>
  );
};

interface ComparisonCardProps {
  icon: string;
  title: string;
  description: string;
}

const ComparisonCard = ({ icon, title, description }: ComparisonCardProps) => {
  return (
    <div
      className={`flex items-center space-x-4 p-4 rounded-xl border border-gray-100 bg-white`}>
      <div className='flex-shrink-0'>
        <Image src={icon} alt={title} width={24} height={24} />
      </div>
      <div>
        <h4 className={`font-semibold text-dark-grey text-base md:text-xl`}>{title}</h4>
        <p className='text-grey text-sm md:text-lg py-2'>{description}</p>
      </div>
    </div>
  );
};

interface TestimonialCardProps {
  avatar: string;
  name: string;
  role: string;
  quote: string;
}

const TestimonialCard = ({
  avatar,
  name,
  role,
  quote,
}: TestimonialCardProps) => {
  return (
    <div className='relative bg-gray-100 rounded-2xl p-6 pt-12 shadow-md max-w-sm mx-auto outline-white outline-5'>
      <Image
        src={avatar}
        alt={name}
        width={80}
        height={80}
        className='object-cover absolute -top-10 left-1/6 -translate-x-1/2 border-6 border-white rounded-full bg-white'
      />

      <h4 className='text-sm md:text-lg font-semibold text-title-black'>{name}</h4>
      <p className='text-xs md:text-lg text-grey mb-4'>{role}</p>
      <hr className='border-dashed border-gray-200 mb-4' />
      <p className='text-sm md:text-lg text-grey'>“{quote}”</p>
    </div>
  );
};

interface FaqItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

const FaqItem = ({ question, answer, defaultOpen }: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`rounded-xl transition duration-300 ease bg-white cursor-pointer border-2 ${isOpen ? "border-violet-300 " : "border-transparent tag-shadow"
        }`}>
      <button className='w-full flex items-center justify-between px-6 py-4 cursor-pointer focus-visible:border-transparent'>
        <span className='font-semibold text-base md:text-xl text-title-black text-left'>
          {question}
        </span>
        {isOpen ? (
          <Image src='/icons/acc-up.svg' alt='' width={30} height={30} />
        ) : (
          <Image src='/icons/acc-down.svg' alt='' width={30} height={30} />
        )}
      </button>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px]" : "max-h-0"
          }`}>
        <div className={`px-6 pb-4 text-sm md:text-lg text-grey`}>{answer}</div>
      </div>
    </div>
  );
};

export default function Home() {
  const features = [
    {
      icon: <Image src='/icons/doc.png' alt='' height={100} width={100} />,
      title: "Get Noticed, Get Shortlisted",
      description:
        "You are 15X more likely to get shortlisted and land an interview.",
    },
    {
      icon: <Image src='/icons/chat.png' alt='' height={100} width={100} />,
      title: "Smarter Conversations, Better Opportunities",
      description:
        "Ideal for dev talks, referrals, or networking because skills stick.",
    },
    {
      icon: <Image src='/icons/graph.png' alt='' height={100} width={100} />,
      title: "Personalized Growth, Powered by Real Data",
      description:
        "Feedforward your career with actionable, validated insights.",
    },
  ],
    glimpsePoints = [
      {
        icon: <Image width={30} height={30} src='/icons/ChartBar.svg' alt='' />,
        text: "Skill gaps, uncovered",
      },
      {
        icon: (
          <Image width={30} height={30} src='/icons/CheckCircle.svg' alt='' />
        ),
        text: "Your top skills & strengths",
      },
      {
        icon: (
          <Image
            width={30}
            height={30}
            src='/icons/NavigationArrow.svg'
            alt=''
          />
        ),
        text: "Your best-fit roles",
      },
      {
        icon: (
          <Image width={30} height={30} src='/icons/TreeStructure.svg' alt='' />
        ),
        text: "Tailored learning paths",
      },
    ],
    stats = [
      { value: "18+", label: "Years of AI industry research and expertise" },
      { value: "5M+", label: "Data points analyzed across roles & skills" },
      { value: "60+", label: "Organizations across the globe" },
      { value: "95%", label: "Users say it helped them in their career" },
    ],
    steps = [
      {
        icon: <Image width={100} height={100} src='/icons/upload.png' alt='' />,
        title: "Connect Your Profile",
        description:
          "Upload your resume or LinkedIn or skip it. We help you either way",
      },
      {
        icon: <Image width={100} height={100} src='/icons/help.png' alt='' />,
        title: "Answer a few simple questions",
        description:
          "Tell us what matters to you, we'll tailor your snapshot accordingly",
      },
      {
        icon: (
          <Image width={100} height={100} src='/icons/download.png' alt='' />
        ),
        title: "Download your skills snapshot",
        description:
          "See your strengths, roles, and skills in a smart, shareable format",
      },
    ],
    featureSlides = [
      {
        image: "/Illustration-1.png",
        title: "Personalized skill validation",
        description:
          "Answer intuitive, tailored questions to validate what you're good at",
      },
      {
        image: "/Illustration-2.png",
        title: "Profile powered insights",
        description:
          "We turn your profile into actionable insights with smart skill parsing",
      },
      {
        image: "/Illustration-3.png",
        title: "Built for social validation",
        description:
          "Share with peers or mentors to validate strengths and get insights",
      },
      {
        image: "/Illustration-4.png",
        title: "Career fit suggestions",
        description:
          "Get matched with career paths that align with your capabilities, interests, and future potential",
      },
      {
        image: "/Illustration-5.png",
        title: "Visual snapshot report",
        description:
          "Receive a summary of your strengths and growth areas designed to be understood at a glance",
      },
    ],
    comparisonCards = {
      before: [
        {
          icon: "/icons/Files.svg",
          title: "No proof of skills",
          text: "Skills remain hidden behind generic resumes",
        },
        {
          icon: "/icons/Question.svg",
          title: "Unclear career direction",
          text: "Lack of clear direction, leading to missed roles",
        },
        {
          icon: "/icons/Users.svg",
          title: "Hard to stand out",
          text: "Difficult to stand out in a crowded market",
        },
      ],
      after: [
        {
          icon: "/icons/ChartLineUp.svg",
          title: "AI powered skills validation",
          text: "Instantly prove your skills with credibility",
        },
        {
          icon: "/icons/Target.svg",
          title: "Personalized career insights",
          text: "Discover roles tailored to your strengths",
        },
        {
          icon: "/icons/RocketLaunch.svg",
          title: "Stand out & grow",
          text: "Gain clarity, confidence, and momentum",
        },
      ],
    },
    faqs = [
      {
        question: "What is Skill Snapshot?",
        answer:
          "Skill Snapshot is a smart snapshot of your professional skills—crafted using AI—that complements your resume and cover letter. It helps you showcase your strengths clearly and confidently.",
      },
      {
        question: "How is Skill Snapshot different from a traditional resume?",
        answer:
          "Unlike traditional resumes, Skill Snapshot validates your skills using AI and helps you stand out with credibility.",
      },
      {
        question: "How is the snapshot generated?",
        answer:
          "The snapshot is generated based on intuitive questions and AI analysis of your skills and experience.",
      },
      {
        question: "Who is Skill Snapshot for?",
        answer:
          "Anyone looking to improve their career visibility — from fresh graduates to experienced professionals.",
      },
    ],
    socialIcons = [
      { src: "/icons/Facebook.svg", href: "#" },
      { src: "/icons/Twitter.svg", href: "#" },
      { src: "/icons/Instagram.svg", href: "#" },
      { src: "/icons/LinkedIn.svg", href: "#" },
      { src: "/icons/YouTube.svg", href: "#" },
    ],
    testimonials = [
      {
        name: "Arjun Mehta",
        role: "Final-Year Student",
        avatar: "/user2.jpg",
        quote:
          "The Skills Snapshot tool gave me clarity on my career direction for the first time. It analyzed my resume and suggested roles I never considered, along with a clear roadmap of skills to develop. It felt like having a personal career coach powered by AI.",
      },
      {
        name: "Priya Sharma",
        role: "Young Professional",
        avatar: "/user3.jpg",
        quote:
          "I was unsure whether to continue in my current industry or pivot. The application showed me my fit score across industries and highlighted skill gaps. The recommendations were data-driven and surprisingly accurate.",
      },
      {
        name: "Rohan Das",
        role: "Corporate Manager",
        avatar: "/new-user.jpg",
        quote:
          "The step-by-step justification report was impressive. It clearly mapped my skills to roles and explained what I needed to develop. It felt transparent and trustworthy, unlike generic career tests.",
      },
    ];

  return (
    <React.Fragment>
      <section className='bg-[url(/BG-Mask.png)] bg-no-repeat bg-contain bg-center'>
        <div className='container'>
          <div className='flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto section-padding'>
            <div className='lg:w-1/2 w-full space-y-6 text-center lg:text-left'>
              <CustomBadge>
                <div className='inline-flex items-center gap-2'>
                  <span>⭐</span>
                  <span>Takes less than 10 minutes.</span>
                </div>
              </CustomBadge>

              <h1 className='text-2xl sm:text-5xl font-bold leading-tight text-title-black'>
                Skills <span className='gradient-text'>mapped</span>
                .<br />
                Story <span className='gradient-text'>told</span>
                .<br />
                Future <span className='gradient-text'>unlocked</span>.
              </h1>

              <p className='text-grey text-sm sm:text-lg max-w-md mx-auto lg:mx-0 px-4'>
                Build a clear path from your skill snapshot to your next role
              </p>

              <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center'>
                <AccentButton href='/signup' text='Create my Skill snapshot' />

                <button className='transition ease-in-out duration-200 btn-radius-padding border border-indigo-100 btn-radius font-semibold text-title-black bg-white hover:bg-indigo-100 cursor-pointer btn-shadow '>
                  How it works?
                </button>
              </div>

              <div className='flex flex-col md:flex-row items-center justify-center lg:justify-start gap-3 pt-6 px-4'>
                <Image
                  src='/avatar-trail.png'
                  alt='user1'
                  width={100}
                  height={100}
                />
                <p className='text-sm text-grey text-left'>
                  20k Users shaping their future with us.
                </p>
              </div>
            </div>

            <div className='lg:w-1/2 w-full relative aspect-[5/4] max-w-md lg:max-w-none'>
              <Image
                src='/hero-image.png'
                alt='Business Meeting'
                fill
                className='object-contain'
              />
            </div>
          </div>
        </div>
      </section>

      <section className='section-padding container'>
        <h1 className='text-2xl sm:text-4xl font-bold leading-tight text-title-black text-center mb-16'>
          How does <span className='gradient-text'>Skill Snapshot </span><br className="md:hidden" />help
          you?
        </h1>

        <div className='section-card'>
          <div className='max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-20 text-center'>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className='pt-0 pb-8 md:py-20 container'>
        <div className='section-card dot-bg !pt-0 md:!pt-16'>
          <div className='md:hidden mb-6 text-center'>
            <TitleComponent
              text="Here's a glimpse of skill"
              gradientText='snapshot'
            />
          </div>
          <div className='flex flex-col md:grid md:grid-cols-2 gap-8 md:items-center'>
            <div className='relative w-full h-full min-h-[300px] md:min-h-0 aspect-square md:aspect-auto'>
              <Image
                src='/glimpse-screen.png'
                alt=''
                fill
                sizes='100vw'
                className='object-contain'
              />
              <div className='absolute -top-8 right-4'>
                <CustomBadge>
                  <div className='p-1 text-xs'>
                    <span>
                      Takes less than <br />
                      <span className='font-medium text-xl text-green-900'>
                        10
                      </span>{" "}
                      mins.
                    </span>
                  </div>
                </CustomBadge>
              </div>
            </div>

            <div className='space-y-6'>
              <div className='hidden md:block'>
                <TitleComponent
                  text="Here's a glimpse of skill"
                  gradientText='snapshot'
                />
              </div>
              <p className='text-dark-grey text-xl'>
                See your strengths, skills, and next steps all in one smart
                report
              </p>

              <ul className='grid grid-cols-2 gap-3 text-grey my-10'>
                {glimpsePoints.map((item, index) => (
                  <li key={index} className='flex items-center gap-2'>
                    {item.icon}
                    {item.text}
                  </li>
                ))}
              </ul>

              <div className='flex justify-center md:justify-start'>
                <AccentButton href='/signup' text='Create my skill snapshot' />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='section-padding bg-indigo-950'>
        <div className='[&>h2]:text-white'>
          <TitleComponent text='Powered by proven' gradientText='expertise' />
        </div>

        <div className='container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4'>
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              index={index}
              label={stat.label}
              length={stats.length}
              value={stat.value}
            />
          ))}
        </div>
      </section>

      <section className='section-padding container'>
        <div className='section-title-width'>
          <TitleComponent text='The Skill Snapshot' gradientText='process' />
          <p className='text-center text-grey text-sm md:text-xl -mt-4 px-4'>
            Just follow 3 quick steps to get a clear, visual snapshot of your
            skills
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16 px-4 md:px-0'>
          {steps.map((step, index) => (
            <StepCard key={index} {...step} />
          ))}
        </div>
      </section>

      <section className='section-padding gradient-bg'>
        <div className='container'>
          <div className='section-title-width '>
            <TitleComponent
              text='Smart features, real '
              gradientText='impact'
            />
            <p className='text-center text-grey text-sm md:text-xl -mt-4 px-4'>
              Not just data, but direction. SkillSnap turns your experience into
              an action ready career path
            </p>
          </div>
          <div className='mt-8'>
            <SwiperCarousel
              items={featureSlides.map((slide, i) => (
                <SlideCard
                  key={i}
                  image={slide.image}
                  title={slide.title}
                  description={slide.description}
                />
              ))}
              centeredSlides={true}
              slidesPerView={1.5}
              breakpoints={{
                768: { slidesPerView: 2, centeredSlides: false },
                1024: { slidesPerView: 3, centeredSlides: false },
              }}
            />
          </div>
        </div>
      </section>

      <section className='container section-padding px-4'>
        <TitleComponent
          text='Skill Snapshot explained in '
          gradientText='30 seconds'
        />
        <div className='p-4 tag-shadow rounded-xl bg-white h-[90dvh]'>
          <VideoPlayer />
        </div>
      </section>

      <section className='relative py-8 md:py-20 container'>
        <TitleComponent
          text='
              Beyond a resume. Built to spark'
          gradientText='conversations'
        />
        <p className='text-center text-grey text-sm md:text-xl -mt-4 px-4'>
          Proven to get you 15X more chances of landing an interview.
        </p>
        <div className='relative block mx-auto w-max mt-16'>
          <Image
            src='/convo-main.png'
            alt=''
            width={300}
            height={300}
            className='object-contain w-32 md:w-[300px] h-auto'
          />
          <Image
            src='/convo-1.png'
            alt=''
            width={300}
            height={300}
            className='object-contain bottom-0 -left-full absolute transform translate-x-1/6 w-32 md:w-[300px] h-auto'
          />
          <Image
            src='/convo-2.png'
            alt=''
            width={300}
            height={300}
            className='object-contain top-0 -right-full absolute transform -translate-x-1/6 w-32 md:w-[300px] h-auto'
          />
        </div>
      </section>

      <section className='section-padding dot-bg'>
        <div className='container px-4'>
          <div className='grid grid-cols-1 md:grid-cols-[3fr_1fr_3fr] gap-6 items-center'>
            <div className='space-y-6'>
              <div className='text-center'>
                <h3 className='text-red-600 font-semibold text-sm md:text-base'>
                  <Image
                    src='/icons/XCircle.svg'
                    alt='Arrow'
                    width={20}
                    height={20}
                    className='inline-block mr-1'
                  />
                  BEFORE SKILL SNAPSHOT
                </h3>
                <p className='text-sm md:text-base text-dark-grey font-semibold pt-2'>
                  Struggling to get a job after countless interviews
                </p>
              </div>
              {comparisonCards.before.map((card, index) => (
                <ComparisonCard
                  key={index}
                  icon={card.icon}
                  title={card.title}
                  description={card.text}
                />
              ))}
            </div>
            <div className='hidden md:flex justify-center items-center mt-16'>
              <Image
                src='/icons/arrow.svg'
                alt='Arrow'
                width={48}
                height={48}
              />
            </div>
            <div className='space-y-6 mt-10 md:mt-0'>
              <div className='text-center'>
                <h3 className='text-green-600 font-semibold text-sm md:text-base'>
                  <Image
                    src='/icons/CheckCircleGreen.svg'
                    alt='Arrow'
                    width={20}
                    height={20}
                    className='inline-block mr-1'
                  />
                  AFTER SKILL SNAPSHOT
                </h3>
                <p className='text-sm md:text-base text-dark-grey font-semibold pt-2'>
                  Struggling to get a job after countless interviews
                </p>
              </div>
              {comparisonCards.after.map((card, index) => (
                <ComparisonCard
                  key={index}
                  icon={card.icon}
                  title={card.title}
                  description={card.text}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='py-8 md:py-20'>
        <TitleComponent text='What our users ' gradientText='say' />
        <div className='container card-gradient -mt-10 px-4 py-8 md:p-8 rounded-3xl'>
          <p className='text-center text-grey text-sm md:text-xl -mt-4 section-title-width'>
            Discover what our users say about their experiences with Skill
            Snapshot- real stories, real impact, real satisfaction.
          </p>

          <div className='flex flex-col md:flex-row gap-16 md:gap-6 items-center justify-between mt-10 md:mt-20'>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                avatar={testimonial.avatar}
                name={testimonial.name}
                role={testimonial.role}
                quote={testimonial.quote}
              />
            ))}
          </div>
        </div>
      </section>

      <section className='section-padding gradient-bg'>
        <TitleComponent text='Frequently asked ' gradientText='questions' />
        <div className='container space-y-6 mt-16 px-4'>
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              defaultOpen={index === 0} // open first by default
            />
          ))}
        </div>
      </section>

      <footer className='section-padding footer-bg'>
        <div className='container px-4'>
          <div className='rounded-lg button-gradient-bg text-white p-6 flex flex-col md:flex-row justify-between items-center gap-16 shadow-md'>
            <h3 className='text-base md:text-3xl font-semibold text-center md:text-left'>
              Get your skill snapshot today in minutes
            </h3>
            <Link href={"/signup"}>
              <div className='cursor-pointer bg-violet-50 text-dark-grey text-sm md:text-lg px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition'>
                Create my skill snapshot
              </div>
            </Link>
          </div>
          <div className='mt-10 flex flex-col md:flex-row justify-between items-center gap-4 pt-6'>
            <Link href={"/"}>
              <Image src='/logo.png' alt='' width={250} height={250} />
            </Link>

            <div className='flex items-center space-x-3'>
              {socialIcons.map((icon, index) => (
                <Link href={icon.href} key={index}>
                  <Image
                    src={icon.src}
                    alt=''
                    width={40}
                    height={40}
                    className='hover:scale-150 transition-transform duration-200'
                  />
                </Link>
              ))}
            </div>
          </div>
          <p className='text-sm text-blue-950 text-center pt-16'>
            © 2025 YourSkills.ai | All Rights Reserved
          </p>
        </div>
      </footer>
    </React.Fragment>
  );
}
