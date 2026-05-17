import type { SnapShotData } from "@/services/snapshot/generateAllInsightsService";

export const questions = {
  missing: [
    {
      question:
        "Select the options that best describe your current or most recent industry",
      type: "dropdown-multiple",
      iconfilename: "student",
      select: ["Engineering", "Business", "Arts"],
    },
    {
      question: "Can you list 3-5 roles you've held?",
      type: "short",
      label: "Add roles",
      iconfilename: "officeworker",
      note: "Add up to 5 roles. Use a comma to separate roles",
    },
    {
      question:
        "What is your highest level of education and major area of study?",
      type: "single-dropdown",
      iconfilename: "student",
      options: ["High School", "Diploma", "Bachelor's", "Master's", "PhD"],
      label: "Field of Study",
      select: ["Engineering", "Business", "Arts"],
    },
    {
      question:
        "Have you pursued any certifications, upskilling programs, or side projects in the last 3-5 years?",
      type: "multiple",
      iconfilename: "student",
      options: [
        "Online courses (e.g., Coursera, Udemy, edX)",
        "Industry-specific certifications (e.g., PMP, CFA, AWS, SHRM)",
        "Bootcamps (tech/design/product)",
        "Volunteering or pro bono consulting",
        "Passion projects (blogs, art, code, startups)",
        "Internal learning programs",
        "No recent certifications",
      ],
    },
    {
      question:
        "Which of the following tools, platforms, or technologies have you worked with?",
      type: "multiple-add",
      iconfilename: "toolbox",
      options: [
        "Microsoft Office / Google Workspace",
        "Project management (e.g., Jira, Asana, Trello)",
        "CRM platforms (e.g., Salesforce, Zoho)",
        "Design tools (e.g., Figma, Canva, Adobe Suite)",
        "Data tools (e.g., Excel, Power BI, Tableau)",
        "Programming languages (e.g., Python, JavaScript)",
        "AI tools (e.g., ChatGPT, Midjourney, Notion AI)",
        "None / Willing to learn",
      ],
    },
    {
      question:
        "Have you had any career breaks in the last 10 years? If yes, please mention the reason briefly.",
      type: "single-input",
      iconfilename: "page",
      options: [
        "No major break",
        "Personal/family reasons",
        "Health-related",
        "Upskilling/sabbatical",
        "Industry shift",
        "Other",
      ],
    },
  ],
  anchor: [
    {
      question:
        "To help identify viable roles, could you share your current or recent salary range (approximate)?",
      type: "single",
      iconfilename: "money",
      options: [
        "< ₹5L / <$10K",
        "₹20L - ₹35L ",
        "₹5L - ₹10L ",
        "₹35L+ / $70K+",
        "₹10L - ₹20L ",
        "Prefer not to say",
      ],
    },
    {
      question: "Did you attend any formal in-plant or on-site training",
      type: "single",
      iconfilename: "yoga",
      options: ["Yes", "No"],
    },
    {
      question: "How many years of total work experience do you have?",
      type: "slider",
      iconfilename: "officeworker",
      min: 0,
      max: 50,
      label: "years",
    },
    {
      question: "What industries have you worked in?",
      type: "tags",
      iconfilename: "toolbox",
      options: [
        "Manufacturing",
        "Education",
        "Healthcare",
        "Transportation",
        "Finances",
        "Technology",
        "Energy",
      ],
    },
  ],
  job: [
    {
      question: "Which work values do you most identify with?",
      type: "multiple-limit",
      limit: 3,
      iconfilename: "industry",
      options: [
        "Recognition",
        "Relationships",
        "Support",
        "Independence",
        "Good Conditions",
        "Achievement",
      ],
    },
    {
      question:
        "Would you be open to completely shifting industries or starting fresh?",
      type: "single-slider",
      iconfilename: "toolbox",
      options: ["Yes", "No"],
      min: 0,
      max: 100,
      label: "%",
      metric: "Confidence",
    },
    {
      question: "What's your most recent job title?",
      type: "list",
      iconfilename: "officeworker",
      list: [
        { title: "IT Engineer - Kotak Bank", experience: "2 years" },
        { title: "Intern - World Trade Centre", experience: "4 Months" },
      ],
    },
    {
      question:
        "Picked up anything new recently? A course, project, or tool maybe?",
      type: "short",
      label: "Add roles",
      iconfilename: "page",
    },
  ],
};

export const LinkedInProfile = {
  bannerImage: "/linkedin-banner.jpg",
  avatar: "/avatar.png",
  name: "Zaha Rahman",
  designation:
    "UX UI Designer at Feelpixel | Student at MIT Avantika University",
  location: "Pune, Maharashtra, India",
  followers: "2K followers",
  connections: "500+ connections",
  company: {
    logo: "/icons/google-color.svg",
    name: "Feelpixel - UX Design Studio",
  },
  institute: {
    logo: "/icons/google-color.svg",
    name: "MIT Institute of Design",
  },
};

export const extractedInfo = {
  name: "Anita Shen",
  role: "Software Engineer",
  progress: 75,
  avatar: "/avatar.png",
  journey: "Mid career pivot",
  knownItems: ["Education", "Years Of Experience", "Hard Skills", "Tools"],
  unknownItems: ["Certifications", "Industry", "Soft Skills"],
};

export const jobPrediction = {
  jobAttributes: [
    {
      title: "Core code",
      items: [
        "Competency",
        "Organisational Skills",
        "Behavioural Skills",
        "Competency",
        "Organisational Skills",
        "Behavioural Skills",
      ],
    },
    {
      title: "DNA of work",
      items: ["Work Activities", "Work Values", "Motivation Drivers"],
    },
    {
      title: "Interest Compass",
      items: [
        "Interests Summary",
        "Career Interest Areas",
        "Future Study Intent",
      ],
    },
  ],

  anchorAttributes: [
    {
      title: "Passion Palette",
      items: ["Hobbies,", "Personal Interests", "Creative Inclinations"],
    },
    {
      title: "Drives you",
      items: ["Motivating Activities", "Interests Summary", "Learning Agility"],
    },
    {
      title: "Rooted in you",
      items: ["Achievements,", "Life Skills", "Behavioural Skill"],
    },
  ],

  upskills: ["Learning Agility", "Newly Acquired Skill"],
  forwards: ["Exploration Interest", "Future Study Intent"],
};

export const questionnaireSummary = {
  name: "Anita Shen",
  role: "Software Engineer",
  quote:
    "A creative problem-solver who blends design, tech, and strategy to build bold ideas.",
  imageUrl: "/avatar.png",
  progress: 75,
  hardSkills: [
    "Operating Systems",
    "Programming",
    "Cloud Computing",
    "Operating Systems",
    "Programming",
    "Cloud Computing",
  ],
  softSkills: ["Presentation", "Team Work", "Adaptability"],
  tools: ["C++", "JAVA", "C#"],
  education: {
    degree: "B.Tech in Computer Science",
    note: "Recent Education",
  },
  careerYears: 2,
  certifications: [
    {
      provider: "COURSERA",
      title: "Learn Python From Beginner To Master",
    },
    {
      provider: "COURSERA",
      title: "Learn Python From Beginner To Master",
    },
  ],
};

export const roleRadarData = {
  jobTitle: "UX Researcher",
  matchPercentage: 70,
  matchBreakdown: [
    {
      label: "CV",
      percentage: 60,
      color: "#48ABE8",
    },
    {
      label: "Talent",
      percentage: 40,
      color: "#8FB20E",
    },
    {
      label: "Anchor",
      percentage: 90,
      color: "#3C3CC2",
    },
  ],
  user: {
    imageUrl: "/avatar.png",
  },
  industry: "Technology",
  subSector: "Product Management",
  seniority: "Manager",
  tags: ["cv", "Talent", "Anchor"],
  matchAttributes: [
    { item: "Stakeholder Mgmt", tag: "talent" },
    { item: "Product Strategy", tag: "cv" },
    { item: "Analytics", tag: "anchor" },
  ],
};

export const roleData = {
  type: "talent",
  jobTitle: "Data Product Manager",
  matchPercent: 90,
  tags: ["cv", "Talent", "Anchor"],
  matchAttributes: [
    { item: "Stakeholder Mgmt", tag: "talent" },
    { item: "Product Strategy", tag: "cv" },
    { item: "Analytics", tag: "anchor" },
  ],
  skillGaps: [
    { item: "Stakeholder Mgmt", tag: "cv" },
    { item: "Analytics", tag: "talent" },
    { item: "Product Strategy", tag: "anchor" },
  ],
  matchBreakdown: [
    // {
    //   label: "CV",
    //   percentage: 60,
    //   color: "#48ABE8",
    // },
    {
      label: "Talent",
      percentage: 40,
      color: "#8FB20E",
    },
    {
      label: "Anchor",
      percentage: 90,
      color: "#3C3CC2",
    },
  ],
  industry: "Technology",
  subSector: "Product Management",
  seniority: "Manager",
};

export const sameIndustryRecommendations = {
  type: "job",
  recommendations: [
    {
      title: "Data Product Manager",
      matchPercent: 90,
      tags: ["cv", "Talent"],
      matchAttributes: [
        { item: "Stakeholder Mgmt", tag: "talent" },
        { item: "Product Strategy", tag: "cv" },
        { item: "Analytics", tag: "cv" },
      ],
      skillGaps: [
        { item: "Stakeholder Mgmt", tag: "cv" },
        { item: "Analytics", tag: "talent" },
        { item: "Product Strategy", tag: "talent" },
      ],
    },
    {
      title: "UX Researcher",
      matchPercent: 60,
      tags: ["cv", "Talent"],
      matchAttributes: [
        { item: "Design thinking", tag: "cv" },
        { item: "User interviews", tag: "talent" },
        { item: "Usability testing", tag: "cv" },
      ],
      skillGaps: [
        { item: "Stakeholder Mgmt", tag: "talent" },
        { item: "Analytics", tag: "cv" },
        { item: "Product Strategy", tag: "talent" },
      ],
    },
    {
      title: "Data Product Manager",
      matchPercent: 30,
      tags: ["cv", "Talent"],
      matchAttributes: [
        { item: "Stakeholder Mgmt", tag: "talent" },
        { item: "Product Strategy", tag: "cv" },
        { item: "Analytics", tag: "cv" },
      ],
      skillGaps: [
        { item: "Stakeholder Mgmt", tag: "cv" },
        { item: "Analytics", tag: "talent" },
        { item: "Product Strategy", tag: "talent" },
      ],
    },
    {
      title: "UX Researcher",
      matchPercent: 60,
      tags: ["cv", "Talent"],
      matchAttributes: [
        { item: "Design thinking", tag: "cv" },
        { item: "User interviews", tag: "talent" },
        { item: "Usability testing", tag: "cv" },
      ],
      skillGaps: [
        { item: "Stakeholder Mgmt", tag: "talent" },
        { item: "Analytics", tag: "cv" },
        { item: "Product Strategy", tag: "talent" },
      ],
    },
  ],
};

export const alternateRecommendations = {
  type: "alternate",
  recommendations: [
    {
      title: "Food Product Developer",
      matchPercent: 90,
      tags: ["cv", "Talent", "Anchor"],
      matchAttributes: [
        { item: "Recipe Remixing", tag: "talent" },
        { item: "Food Plating & Styling", tag: "anchor" },
        { item: "Leadership", tag: "cv" },
        { item: "Operational skills", tag: "cv" },
      ],
      skillGaps: [
        { item: "Market-fit thinking", tag: "talent" },
        { item: "Process specs", tag: "cv" },
      ],
    },
    {
      title: "Pastry Chef",
      matchPercent: 60,
      tags: ["cv", "Talent", "Anchor"],
      matchAttributes: [
        { item: "Creative", tag: "cv" },
        { item: "Food Plating & Styling", tag: "anchor" },
        { item: "Attention to Detail", tag: "talent" },
        { item: "Operational skills", tag: "cv" },
      ],
      skillGaps: [
        { item: "Product Lifecycle", tag: "talent" },
        { item: "Process specs", tag: "cv" },
      ],
    },
  ],
};

export const snapShotData: SnapShotData = {
  status: "completed",
  results: {
    Skill_and_Role: {
      Job_Standards_and_Polished: {
        Job_Standards: {
          Skills: [
            "Vocal Control",
            "Pitch Accuracy",
            "Rhythm and Timing",
            "Breath Support",
            "Diction and Enunciation",
            "Sight-Reading",
          ],
          Abilities: [
            "Musicality",
            "Memorization",
            "Emotional Expression",
            "Auditory Discrimination",
            "Stamina",
            "Adaptability",
          ],
          Knowledge: [
            "Music Theory Fundamentals",
            "Vocal Health and Anatomy",
            "Microphone Technique",
            "Performance Etiquette",
            "Basic Genre Conventions",
          ],
        },
        Polished_Candidate: {
          Skills: [
            "Advanced Vocal Techniques (e.g., Belting, Vibrato Control)",
            "Vocal Improvisation",
            "Harmonization",
            "Songwriting and Composition",
            "Basic Instrument Proficiency (Piano/Guitar)",
            "Studio Recording Techniques",
          ],
          Abilities: [
            "Artistic Interpretation",
            "Charismatic Stage Presence",
            "Audience Engagement",
            "Genre Versatility",
            "Resilience and Professionalism",
            "Creative Collaboration",
          ],
          Knowledge: [
            "Advanced Music Theory and Harmony",
            "Music Business (Contracts, Royalties, Publishing)",
            "Artist Branding and Marketing",
            "Music Production Software (DAWs)",
            "Music History and Context",
          ],
        },
        Why_to_hire:
          "A polished singer is not just a vocalist but a complete artist who can captivate audiences, create original work, and navigate the music industry effectively, ensuring a greater artistic and commercial impact.",
        Takeaway:
          "While a standard singer possesses the core vocal abilities, a polished singer elevates their craft with unique artistic interpretation, versatile performance skills, and business acumen, transforming their voice into a sustainable career.",
      },
      Skill_Journey: {
        Polished_Candidate: {
          Technical: {
            Foundation: [
              "Formal vocal training and lessons",
              "Mastering scales, arpeggios, and breathing exercises",
              "Learning basic music theory and sight-singing",
            ],
            Strengthening: [
              "Expanding vocal range and dynamics",
              "Developing advanced techniques like mixed voice and vibrato",
              "Learning an accompanying instrument like piano or guitar",
            ],
            Transition: [
              "Developing a unique vocal style and signature sound",
              "Mastering studio microphone techniques for recording",
              "Exploring music production basics in a Digital Audio Workstation (DAW)",
            ],
          },
          Functional: {
            "Transition phase": [
              "Building a diverse repertoire of songs",
              "Gaining stage experience through open mics and local gigs",
              "Collaborating with other musicians, bands, and producers",
              "Creating professional demo recordings and performance reels",
              "Networking within the local and online music community",
            ],
          },
          Behavioral: {
            "Learning Growth": [
              "Cultivating discipline for consistent daily practice",
              "Building resilience to handle performance anxiety and criticism",
              "Actively seeking and applying feedback from coaches and mentors",
              "Developing creativity for songwriting and unique song interpretation",
              "Fostering professionalism in communication and commitments",
            ],
          },
        },
        Takeaway_ts:
          "The technical journey for a singer evolves from mastering the foundational mechanics of the voice to developing a unique, signature sound and leveraging technology for professional recording and production.",
        Takeaway_fs:
          "Functional growth is about moving from the practice room to the real world by building a performance-ready repertoire, gaining invaluable stage experience, and establishing a professional presence in the music community.",
        Takeaway_bs:
          "Behavioral development is the bedrock of a long-term career, requiring the cultivation of discipline, resilience, and creative confidence to navigate the competitive and subjective nature of the music industry.",
      },
      Skill_Pillars: {
        Skill_Pillars: [
          "Vocal Technique & Health",
          "Musicality & Artistry",
          "Performance & Stage Presence",
          "Repertoire & Versatility",
          "Collaboration & Networking",
          "Music Business & Branding",
          "Continuous Learning & Adaptation",
        ],
        What_you_are_doing: [
          "Engaging in daily vocal exercises, practicing proper breath support, and prioritizing vocal rest to maintain instrument health.",
          "Interpreting lyrics with emotional depth, experimenting with phrasing and dynamics, and developing a unique vocal style.",
          "Performing for live audiences, honing physical expression, and learning to command a stage and connect with the crowd.",
          "Learning and mastering a diverse catalog of songs across various genres to suit different venues, events, and audiences.",
          "Working with bands, producers, and songwriters, and attending industry events to build professional relationships.",
          "Managing a social media presence, understanding basic contracts, and marketing your unique identity as an artist.",
          "Taking lessons with vocal coaches, attending workshops, and staying current with music trends and recording technologies.",
        ],
        Outcome: [
          "Achieving vocal consistency, stamina, and career longevity while preventing injury.",
          "Delivering memorable and emotionally resonant performances that connect deeply with listeners.",
          "Creating a captivating and professional live show experience that builds a loyal fanbase.",
          "Maximizing booking opportunities and demonstrating professional adaptability.",
          "Creating new musical projects, securing gigs, and building a supportive career network.",
          "Building a recognizable artist brand and navigating the industry to create a sustainable career.",
          "Maintaining artistic relevance, expanding creative capabilities, and ensuring long-term career growth.",
        ],
        Takeaway:
          "A successful singer's career is built on seven pillars, balancing exceptional vocal and artistic talent with dynamic performance skills, industry savvy, and a relentless commitment to collaboration and personal growth.",
      },
    },
    Technical_and_Career: {
      Explorer: [
        {
          Technology: "Federated Learning",
          Description:
            "Training machine learning models across multiple decentralized edge devices or servers holding local data samples, without exchanging them.",
        },
        {
          Technology: "Quantum Machine Learning",
          Description:
            "Exploring the use of quantum computing for machine learning tasks, potentially offering speedups for specific types of problems.",
        },
        {
          Technology: "Graph Neural Networks (GNNs)",
          Description:
            "Applying deep learning techniques to graph-structured data for tasks like social network analysis, recommendation systems, and molecular chemistry.",
        },
      ],
      Practitioner: [
        {
          Technology: "Python",
          Description:
            "The primary language for ML development, used with libraries like Pandas, NumPy, and Scikit-learn for data manipulation, analysis, and building traditional ML models.",
        },
        {
          Technology: "TensorFlow / PyTorch",
          Description:
            "Core deep learning frameworks for building, training, and deploying neural networks for tasks in computer vision, NLP, and more.",
        },
        {
          Technology: "Docker",
          Description:
            "Containerization tool used to package ML applications and their dependencies, ensuring consistency from development to production environments.",
        },
        {
          Technology: "SQL",
          Description:
            "Essential for querying and extracting data from relational databases, a common first step in any ML workflow.",
        },
      ],
      Expert: [
        {
          Technology: "MLOps Platforms (Kubeflow, MLflow)",
          Description:
            "Implementing and managing the complete machine learning lifecycle, including experimentation, reproducibility, deployment, and monitoring.",
        },
        {
          Technology: "Cloud ML Services (AWS SageMaker, GCP Vertex AI)",
          Description:
            "Leveraging managed cloud services to build, train, and deploy ML models at scale, handling infrastructure and operational overhead.",
        },
        {
          Technology: "Distributed Computing (Apache Spark)",
          Description:
            "Processing and analyzing massive datasets that don't fit into a single machine's memory, crucial for large-scale model training.",
        },
        {
          Technology: "Kubernetes",
          Description:
            "Orchestrating containerized ML applications, managing deployment, scaling, and operational tasks for production-grade services.",
        },
      ],
      Takeaway:
        "The Machine Learning Engineer is a hybrid role blending software engineering, data science, and DevOps. The focus is on productionizing ML models, building robust, scalable, and maintainable systems rather than just research and experimentation. Success is measured by the performance and business impact of deployed models.",
      "Job Title": "Machine Learning Engineer",
      "Daily Routine": {
        Morning: [
          "Daily stand-up meeting to sync with the team",
          "Reviewing alerts and monitoring dashboards for deployed models",
          "Code reviews for teammates' merge requests",
        ],
        "Mid-day": [
          "Developing new features for ML pipelines",
          "Training or re-training models with new data",
          "Collaborating with data scientists on model requirements and validation",
        ],
        Evening: [
          "Documenting code and system architecture",
          "Running end-to-end tests for deployment candidates",
          "Researching new tools or techniques for upcoming projects",
        ],
      },
      "Weekly Activities": [
        {
          Activity: "Analyze campaign performance",
          "Value%": "30%",
        },
        {
          Activity: "Develop marketing strategies",
          "Value%": "25%",
        },
        {
          Activity: "Generate performance reports",
          "Value%": "20%",
        },
        {
          Activity: "Conduct market research",
          "Value%": "15%",
        },
        {
          Activity: "Present findings to stakeholders",
          "Value%": "10%",
        },
      ],
      "KPI Focus": {
        KPI: [
          "Model Performance (e.g., Accuracy, Precision, Recall, F1-Score)",
          "Inference Latency & Throughput",
          "System Uptime & Reliability of ML Services",
          "Business Impact (e.g., uplift in user engagement, revenue)",
        ],
      },
      "Tools and Technologies": {
        Tools: [
          "Python",
          "TensorFlow",
          "PyTorch",
          "Scikit-learn",
          "AWS SageMaker",
          "Docker",
          "Kubernetes",
          "MLflow",
          "Apache Spark",
          "SQL",
        ],
      },
      "Skills Analysis": {
        "Hot Skills": [
          {
            Skill: "Python Programming",
            "Importance (%)": 98,
          },
          {
            Skill: "Deep Learning Frameworks (TensorFlow/PyTorch)",
            "Importance (%)": 95,
          },
          {
            Skill: "MLOps Principles & Tools",
            "Importance (%)": 92,
          },
          {
            Skill: "Software Engineering Best Practices (Git, CI/CD)",
            "Importance (%)": 90,
          },
          {
            Skill: "Cloud Computing (AWS, GCP, or Azure)",
            "Importance (%)": 88,
          },
        ],
        "Warm Skills": [
          {
            Skill: "Containerization (Docker, Kubernetes)",
            "Importance (%)": 85,
          },
          {
            Skill: "Big Data Technologies (Spark, Hadoop)",
            "Importance (%)": 80,
          },
          {
            Skill: "Advanced SQL & Data Warehousing",
            "Importance (%)": 75,
          },
          {
            Skill: "Model Optimization & Performance Tuning",
            "Importance (%)": 72,
          },
        ],
        "Getting There Skills": [
          {
            Skill: "Statistical Analysis & A/B Testing",
            "Importance (%)": 65,
          },
          {
            Skill: "Data Visualization Tools (e.g., Tableau, Matplotlib)",
            "Importance (%)": 60,
          },
          {
            Skill: "High-Performance Computing (C++, CUDA)",
            "Importance (%)": 55,
          },
        ],
      },
    },
    Growth_and_Market: {
      "What to do next": {
        Learn: [
          "Advanced Vocal Techniques (e.g., belting, vibrato control, scatting)",
          "Music Production Basics (DAW software like Logic Pro or Ableton Live)",
        ],
        Build: [
          "A Professional Electronic Press Kit (EPK) with high-quality demos and headshots",
          "A strong online presence and brand across social media platforms (YouTube, TikTok, Instagram)",
        ],
        Share: [
          "Original music and covers on streaming platforms like Spotify and Apple Music",
          "Live performances at local venues, open mics, and online concerts",
        ],
        Apply: [
          {
            "Job Title 1": "Session Vocalist",
          },
          {
            "Job Title 2": "Cruise Ship Entertainer",
          },
          {
            "Job Title 3": "Vocal Coach",
          },
          {
            "Job Title 4": "Music Composer",
          },
        ],
      },
      Pitches: {
        "Overall Skill Match %": "92%",
        "Overall Behavioral Match %": "95%",
        "Overall Learning Match %": "90%",
        "Skill Pitch":
          "Possesses a versatile vocal range and exceptional pitch control, adept at delivering emotive performances across multiple genres. Proven ability to harmonize, interpret complex melodies, and contribute to the songwriting process, making them a dynamic asset for both live and studio settings.",
        "Behavioral Pitch":
          "A dedicated and resilient performer with a captivating stage presence and the ability to connect deeply with an audience. Highly collaborative and professional, thrives in team environments with bands, producers, and crew, consistently demonstrating a strong work ethic and commitment to artistic excellence.",
        "Learning Pitch":
          "Demonstrates a strong commitment to continuous artistic development, actively seeking feedback and engaging in advanced vocal coaching to refine technique. Eager to embrace new technologies, learn music production software, and adapt to evolving industry trends to remain a relevant and innovative artist.",
        Name: "You",
        ["Job Title"]: "Business Analyst",
      },
      Career_Progression: {
        "Job Level": "Middle Level",
        Entry: {
          "Business Analyst": [
            "Gathering requirements",
            "Analyzing processes",
            "Delivering solutions",
          ],
        },
        Middle: {
          "Business Analyst": [
            "Cross-functional support",
            "Functional specifications",
            "Agile ceremonies",
          ],
        },
        Senior: {
          "Lead Business Analyst": [
            "AI technology adoption",
            "Workflow modeling",
            "Driving growth",
          ],
        },
      },
      Geo_Opportunity: {
        "Country with package": [
          "55K-90K USA",
          "United Kingdom",
          "Germany",
          "Australia",
          "Japan",
        ],
        City: "45K-75K Mumbai",
        Companies: [
          "Universal Music Group",
          "Sony Music Entertainment",
          "Warner Music Group",
          "Live Nation",
          "Royal Caribbean International",
        ],
      },
    },
  },
};
