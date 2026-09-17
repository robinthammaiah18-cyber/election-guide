/**
 * Comprehensive Election Guide Data Store
 * Contains all structured data for Stages, Procedures, Errors, Myths, FAQs, Quiz, and Chatbot.
 */

const ELECTION_DATA = {
  stages: [
    {
      id: "stage-1",
      number: 1,
      title: "Voter Registration & Electoral Roll Verification",
      shortTitle: "Voter Registration",
      icon: "clipboard-check",
      timelineSpan: "6 to 2 months before Election Day",
      summary: "Citizens enroll in the official electoral roll and verify their details to ensure eligibility on polling day.",
      overview: "Every legal election begins with an accurate, inclusive voter list (the electoral roll). Without registration, even eligible citizens cannot cast their ballot. Election commissions conduct special enrollment drives, allowing citizens who turn 18 to register, update addresses, and resolve duplicate records.",
      keyDeadlines: [
        { label: "Draft Roll Publication", time: "~90 days prior", desc: "Public inspection of names in every constituency." },
        { label: "Claims & Objections Window", time: "30-day window", desc: "Submit Form 6 (new voter), Form 7 (deletion), or Form 8 (correction)." },
        { label: "Final Roll Freeze", time: "~10 to 14 days prior", desc: "No further names can be added for the upcoming election." }
      ],
      citizenAction: "Search your name on the national/state voter portal, check polling station assignment, and download your digital voter slip.",
      behindTheScenes: "Electoral Registration Officers (EROs) and booth-level officials (BLOs) cross-verify physical residency, remove deceased voters, and issue voter photo identity cards."
    },
    {
      id: "stage-2",
      number: 2,
      title: "Candidate Nomination, Scrutiny & Symbol Allocation",
      shortTitle: "Candidate Nomination",
      icon: "user-check",
      timelineSpan: "4 to 3 weeks before Election Day",
      summary: "Political parties and independent candidates file nomination papers, undergo legal scrutiny, and receive official symbols.",
      overview: "Democracy requires transparent rules for who can stand for office. Prospective candidates submit sworn affidavits disclosing criminal records, assets, liabilities, and educational qualifications, giving voters complete visibility into their prospective representatives.",
      keyDeadlines: [
        { label: "Gazette Notification", time: "Day 0", desc: "Official call to election specifying the nomination calendar." },
        { label: "Last Date for Filing", time: "Day 7", desc: "Candidates submit security deposits and nomination forms." },
        { label: "Scrutiny of Nominations", time: "Day 8", desc: "Returning Officer examines legal eligibility and affidavits in public view." },
        { label: "Withdrawal of Candidature", time: "Day 10", desc: "Final list of contesting candidates is published with allotted election symbols." }
      ],
      citizenAction: "Review candidate affidavits online (criminal records, assets, educational backgrounds) to make an informed choice.",
      behindTheScenes: "Election officials verify that no candidate violates qualification statutes, has unpaid government dues, or submits fraudulent documentation."
    },
    {
      id: "stage-3",
      number: 3,
      title: "Campaigning & Model Code of Conduct",
      shortTitle: "Campaigning & Ethics",
      icon: "megaphone",
      timelineSpan: "3 weeks until 48 hours before voting",
      summary: "Candidates appeal to voters under strict ethical guidelines, followed by a mandatory 'Election Silence' period.",
      overview: "Campaigning allows parties to present manifestos, debate public policies, and hold rallies. To ensure fair competition, the Model Code of Conduct (MCC) takes effect: governments cannot announce new policy bribes or use state resources for campaigning. 48 hours prior to polling close, all campaigning ceases (the 'Silence Period') so voters can reflect calmly.",
      keyDeadlines: [
        { label: "Campaign Period Opens", time: "Upon symbol allotment", desc: "Rallies, door-to-door campaigning, and televised debates begin." },
        { label: "Expense Monitoring", time: "Daily logging", desc: "Candidate bank accounts and campaign expenditures are audited." },
        { label: "Silence Period (Blackout)", time: "48 hours before poll end", desc: "All public meetings, advertisements, and campaign speeches are strictly banned." }
      ],
      citizenAction: "Evaluate party manifestos against your community's needs and report illicit cash or gift distribution to the election helpline or watchdog app.",
      behindTheScenes: "Flying Squad Units (FSUs) and Static Surveillance Teams (SSTs) inspect vehicles, monitor cash flows, and take down illegal banners."
    },
    {
      id: "stage-4",
      number: 4,
      title: "Voting Day Operations & Polling Booth Procedures",
      shortTitle: "Voting Day",
      icon: "fingerprint",
      timelineSpan: "Election Day (Usually 7:00 AM to 6:00 PM)",
      summary: "Registered voters cast secret ballots at designated booths under heavy civil oversight and security.",
      overview: "The pinnacle of democratic expression. Polling stations are set up in schools, community centers, and public facilities. Every polling booth is staffed by a Presiding Officer, Polling Officers, and verified polling agents representing each competing party to guarantee non-partisanship and transparency.",
      keyDeadlines: [
        { label: "Mock Poll Conducted", time: "6:00 AM (1 hr prior)", desc: "50+ test votes cast in front of candidate agents to prove 100% machine/ballot accuracy." },
        { label: "Voting Opens", time: "7:00 AM", desc: "Queue opens; voter identity checked against official roll." },
        { label: "Voting Closes", time: "6:00 PM", desc: "Anyone standing in queue before closing time is legally entitled to vote." },
        { label: "Machine / Box Sealing", time: "Immediately post-poll", desc: "Ballot boxes or EVMs are sealed with unique numbered green paper and tamper-evident tags signed by candidate agents." }
      ],
      citizenAction: "Carry an accepted photo ID, visit your designated booth early, cast your ballot in absolute secrecy, and verify the physical confirmation slip.",
      behindTheScenes: "Voters receive indelible ink on the left index finger to prevent dual voting, sign the register of voters, and step into the voting compartment."
    },
    {
      id: "stage-5",
      number: 5,
      title: "Vote Counting, EVM/VVPAT Reconciliation & Auditing",
      shortTitle: "Vote Counting & Audit",
      icon: "chart-bar",
      timelineSpan: "Counting Day (Starts 8:00 AM)",
      summary: "Ballots or electronic memory units are counted round-by-round in secure counting halls under video surveillance and agent oversight.",
      overview: "Votes are counted in specialized counting halls supervised by the Returning Officer and independent observers. Postal ballots from military and absentee voters are counted first, followed by round-by-round tallying from each polling station. In systems with paper audit trails (VVPAT), mandatory randomized slip audits are conducted to verify electronic counts.",
      keyDeadlines: [
        { label: "Strong Room Opened", time: "7:00 AM", desc: "Double locks opened in presence of candidates, agents, and election magistrates." },
        { label: "Postal Ballots Tabulation", time: "8:00 AM", desc: "Early and absentee mail ballots counted first." },
        { label: "Round-by-Round Display", time: "8:30 AM onwards", desc: "Results displayed on large screens round-by-round for public inspection." },
        { label: "Mandatory VVPAT Audit", time: "Final stages", desc: "Paper slips from randomly selected polling stations hand-counted to verify EVM integrity." }
      ],
      citizenAction: "Follow real-time verified data feeds directly from the official Election Commission website rather than unverified social media claims.",
      behindTheScenes: "Any margin narrower than statutory thresholds automatically triggers a recount procedure with candidate representatives present."
    },
    {
      id: "stage-6",
      number: 6,
      title: "Declaration of Results, Certification & Peaceful Transition",
      shortTitle: "Results & Transition",
      icon: "award",
      timelineSpan: "Same day or Day after Counting",
      summary: "Winning candidates receive official Certificates of Election, results are gazetted, and new representatives take oath.",
      overview: "Once all rounds and audits conclude without unresolved disputes, the Returning Officer formally announces the winning candidate and presents them with Form 22 (Certificate of Election). The full results are notified in the official government gazette, paving the way for the peaceful transition or continuance of executive leadership.",
      keyDeadlines: [
        { label: "Formal Declaration", time: "Immediately post-tally", desc: "Returning Officer declares winner and signs statutory certificate." },
        { label: "Statutory Filing of Expenses", time: "Within 30 days", desc: "Elected and defeated candidates submit final audited expenditure accounts." },
        { label: "Election Petitions Window", time: "Within 45 days", desc: "Legal challenges on irregularities may be filed exclusively in the High Court." }
      ],
      citizenAction: "Hold your elected representatives accountable to their campaign commitments and stay engaged in local civic governance.",
      behindTheScenes: "Election machinery safely archives all electronic voting units and paper ballots in sealed treasury repositories for 6 to 12 months for judicial review if required."
    }
  ],

  procedures: [
    {
      id: "proc-register",
      title: "How to Register to Vote (First-Time & Existing Voters)",
      badge: "Eligibility: 18+ Years",
      steps: [
        { step: 1, title: "Check Eligibility", desc: "You must be a citizen, at least 18 years old on the qualifying date, and an ordinary resident of your constituency." },
        { step: 2, title: "Submit Application (Form 6)", desc: "Apply online via the National Voter Service Portal / Voter App, or submit Form 6 physically to your local Electoral Registration Officer (ERO) or Booth Level Officer (BLO)." },
        { step: 3, title: "Provide Essential Proofs", desc: "Upload 1 Proof of Age (Birth certificate, Passport, Driving License, Aadhaar, School Leaving certificate) and 1 Proof of Ordinary Residence (Utility bill, Bank passbook, Rental agreement, Passport)." },
        { step: 4, title: "Field Verification", desc: "A Booth Level Officer visits your stated residence to verify your presence and documents." },
        { step: 5, title: "Receive EPIC & Download e-EPIC", desc: "Upon approval, your Electoral Photo Identity Card (EPIC) is dispatched, and you can immediately download the digital e-EPIC PDF." }
      ]
    },
    {
      id: "proc-verify",
      title: "How to Verify Your Name on the Voter List & Find Your Polling Station",
      badge: "Check 2 Weeks Before Polling",
      steps: [
        { step: 1, title: "Visit Official Search Portal", desc: "Open the official election portal (e.g. voters.eci.gov.in) or call the toll-free helpline 1950." },
        { step: 2, title: "Search by Details or EPIC Number", desc: "Enter your 10-character Voter ID (EPIC) code, or search using your full name, age, state, and district." },
        { step: 3, title: "Check Polling Station Name & Part Number", desc: "Note down your assigned Polling Station name, Room/Part number, and Serial Number on the roll." },
        { step: 4, title: "Download or Print Voter Information Slip", desc: "Save your official voter slip (either printed or on your phone) to save significant time on election day." }
      ]
    },
    {
      id: "proc-booth",
      title: "Step-by-Step Polling Day Walkthrough Inside the Booth",
      badge: "The 4 Polling Officers",
      steps: [
        { step: 1, title: "Entry & Identity Verification (First Polling Officer)", desc: "Present your Voter ID or approved photo identification document. The officer reads your name aloud to candidate agents and checks the roll." },
        { step: 2, title: "Indelible Ink & Register (Second Polling Officer)", desc: "The officer marks your left index finger with indelible violet silver-nitrate ink, notes your signature or thumb impression in Register 17A, and issues your voter slip." },
        { step: 3, title: "Handover Slip (Third Polling Officer)", desc: "Deposit your slip with the third officer who checks your inked finger and presses the 'Ballot' button on the Control Unit to activate the voting compartment." },
        { step: 4, title: "Cast Secret Vote (Voting Compartment)", desc: "Step inside the private voting compartment. Press the blue button next to your chosen candidate. A red LED illuminates, a confirmation beep sounds, and the VVPAT paper slip displays your candidate for 7 seconds." }
      ]
    },
    {
      id: "proc-counting",
      title: "How Votes are Counted & Audited for 100% Integrity",
      badge: "Chain of Custody",
      steps: [
        { step: 1, title: "Pre-Count Verification of Seals", desc: "Candidate agents inspect the serial numbers of the green paper seals and tamper-evident tags on each voting unit before any box or machine is activated." },
        { step: 2, title: "Postal Ballot Counting", desc: "All mail-in ballots from elderly, disabled, and service voters are unsealed, verified, and counted under video surveillance." },
        { step: 3, title: "Control Unit Result Display", desc: "The 'Result' button is pressed on each Control Unit in round order, showing candidate-wise tallies on the digital display board witnessed by party agents." },
        { step: 4, title: "Mandatory VVPAT Physical Slip Audit", desc: "In designated random polling stations per assembly segment, paper slips from the sealed drop box are counted by hand to confirm 100% match with the electronic counter." },
        { step: 5, title: "Tabulation & Certification", desc: "Round results are compiled on Form 20, verified by the Returning Officer, and declared openly." }
      ]
    }
  ],

  errorsAndChallenges: [
    {
      id: "err-name-missing",
      title: "Name Missing or Deleted from the Electoral Roll",
      severity: "High",
      category: "Registration",
      symptom: "You have a physical Voter ID card, but your name cannot be found in the current polling booth voter list.",
      rootCause: "Failure to re-register after shifting residences, roll revision deletions due to non-response to verification notices, or typographical errors in database records.",
      solution: "A voter ID card alone does not entitle you to vote if your name is not on the active electoral list. Always verify your roll status 15 days before the election. If missing, file Form 6 immediately before the roll freezes for future rounds, or contact the local ERO.",
      proactiveTip: "Use the online electoral search tool at least 4 weeks before election day to guarantee your active status."
    },
    {
      id: "err-id-mismatch",
      title: "Voter ID Address Mismatch or Missing Physical EPIC Card",
      severity: "Medium",
      category: "Identification",
      symptom: "You moved to a new house, your ID card shows your old address, or you misplaced your physical card.",
      rootCause: "Recent relocation without updating Form 8, or lost identity cards.",
      solution: "You do NOT need your physical Voter ID if your name is already in the electoral roll. Election commissions authorize 12 alternative government photo IDs: Passport, Driving License, PAN Card, Aadhaar, MNREGA Card, Bank Passbook with photo, or Health Insurance Smart Card.",
      proactiveTip: "Save a soft copy of your e-EPIC on your phone and bring any valid government photo ID matching your name."
    },
    {
      id: "err-rejected-ballot",
      title: "Mail-in / Postal Ballot Rejection",
      severity: "Medium",
      category: "Ballot Issues",
      symptom: "Your absentee or mail-in vote is declared invalid during pre-counting.",
      rootCause: "Missing voter declaration (Form 13A), un-attested declaration signature, mismatched signature, or ballot arriving after the legal deadline.",
      solution: "Ensure you sign the statutory declaration, get it attested by an authorized officer or notary where required, seal the inner secret envelope properly, and mail well in advance.",
      proactiveTip: "Track your mail-in ballot tracking number or use designated drop-boxes where available."
    },
    {
      id: "err-misinformation",
      title: "Viral Rumors, Fake Dates & WhatsApp Disinformation",
      severity: "High",
      category: "Information",
      symptom: "Social media posts claiming 'voting day is postponed', 'online voting via WhatsApp is active', or false candidate disqualifications.",
      rootCause: "Coordinated election interference, spoofed news graphics, and sensational viral rumors.",
      solution: "Never rely on forwarded social media messages for polling dates, booth locations, or rules. Cross-reference claims exclusively with official election commission portals (e.g., eci.gov.in), verified press releases, or by dialing helpline 1950.",
      proactiveTip: "Report misleading posts directly to the election cyber cell or through official reporting portals."
    },
    {
      id: "err-accessibility",
      title: "Accessibility Barriers & Long Queues for Senior/Disabled Citizens",
      severity: "Medium",
      category: "Accessibility",
      symptom: "Lack of wheelchair ramps, lack of Braille signage, or difficulty standing in long general queues.",
      rootCause: "Temporary booth setups failing accessibility compliance standards.",
      solution: "By law, every polling station must provide: Priority queue entry for senior citizens and persons with disabilities, wheelchair ramps, Braille voter guides on EVMs, and the right to an adult companion helper (under Form 14A declaration). In many jurisdictions, home voting is available upon pre-application.",
      proactiveTip: "Book wheelchair assistance via the official voter accessibility mobile app 5 days in advance."
    },
    {
      id: "err-tendered-vote",
      title: "Someone Already Cast a Vote in Your Name (Impersonation)",
      severity: "Critical",
      category: "Integrity",
      symptom: "You arrive at the booth, but the officer finds your name already crossed out as voted.",
      rootCause: "Voter impersonation or clerical error by polling staff.",
      solution: "Do not leave the booth! Under election rules, you have the right to cast a 'Tendered Vote' (Rule 49P). After answering questions and verifying your identity with the Presiding Officer, you receive a special paper ballot to cast your genuine vote, which is sealed in a separate statutory envelope for judicial tallying.",
      proactiveTip: "Carry multiple original photo documents to immediately establish your identity without dispute."
    }
  ],

  myths: [
    {
      id: "myth-1",
      myth: "Electronic Voting Machines (EVMs) can be hacked remotely via Wi-Fi or Bluetooth.",
      reality: "FACT: EVMs are completely standalone, air-gapped computers with no internet, Wi-Fi, Bluetooth, or wireless transceivers. The microchips are One-Time Programmable (OTP) burned at manufacture and cannot be reprogrammed.",
      icon: "wifi-off",
      tag: "Technology"
    },
    {
      id: "myth-2",
      myth: "If you don't have your physical Voter ID card, you cannot vote.",
      reality: "FACT: As long as your name is on the electoral roll, you can vote using any of 12 approved alternative government photo IDs (Aadhaar, Passport, Driving License, PAN card, etc.).",
      icon: "id-card",
      tag: "Rules"
    },
    {
      id: "myth-3",
      myth: "Polling officers or party agents can find out which candidate you voted for.",
      reality: "FACT: Absolute secrecy of the ballot is legally guaranteed. The voting compartment is shielded from view, and the machine registers only anonymous aggregated counts, never linking your identity to your vote.",
      icon: "shield-check",
      tag: "Secrecy"
    },
    {
      id: "myth-4",
      myth: "Elections are decided before regular voters cast their ballots.",
      reality: "FACT: Every vote has equal weight. Numerous elections have been decided by margins as thin as 1 vote or fewer than 50 votes. Your individual ballot genuinely counts.",
      icon: "scales",
      tag: "Civic Power"
    },
    {
      id: "myth-5",
      myth: "You can vote online or via SMS from home if you are busy.",
      reality: "FACT: General public voting is conducted in-person at secure physical booths or via supervised postal ballots for authorized categories. There is no official public internet or text message voting.",
      icon: "alert-triangle",
      tag: "Security"
    },
    {
      id: "myth-6",
      myth: "The VVPAT paper slip is just for show and doesn't get verified.",
      reality: "FACT: The VVPAT is a legal paper ballot. In every constituency, paper slips from randomly chosen polling stations are hand-counted and matched against electronic results. In disputes, the physical slip takes legal precedence.",
      icon: "file-text",
      tag: "Auditing"
    }
  ],

  faqs: [
    {
      category: "First-Time Voters",
      q: "I just turned 18. How soon can I register?",
      a: "Most jurisdictions now have multiple qualifying dates every year (e.g., January 1, April 1, July 1, October 1). You can submit your application (Form 6) even at age 17 in advance, and your enrollment activates automatically on the qualifying date after you turn 18."
    },
    {
      category: "First-Time Voters",
      q: "What is the difference between an Electoral Roll and a Voter ID card?",
      a: "The Electoral Roll is the official, binding legal registry of eligible voters in a constituency. The Voter ID card (EPIC) is simply an identity document. To vote, your name MUST be in the active Electoral Roll; having a card without being in the roll does not permit you to vote."
    },
    {
      category: "ID & Documentation",
      q: "What alternative IDs are accepted at the polling booth?",
      a: "If you do not have your physical Voter ID, you may use: 1) Aadhaar Card, 2) Passport, 3) Driving License, 4) PAN Card, 5) Service ID card with photo issued by central/state govt, 6) Bank/Post Office passbook with photo, 7) MNREGA job card, 8) Health insurance smart card, or 9) Official pension document with photo."
    },
    {
      category: "ID & Documentation",
      q: "My address on my ID card is old. Can I still vote at my new locality?",
      a: "You must vote at the polling station where your name is currently registered on the electoral roll. If you moved, you should file Form 8 to shift your registration to your new residence before the roll freezes."
    },
    {
      category: "Polling Day",
      q: "Can I carry my mobile phone or camera inside the voting compartment?",
      a: "NO. Mobile phones, smartwatches, cameras, and recording devices are strictly prohibited inside the voting booth compartment to protect the secrecy of the ballot and prevent voter coercion."
    },
    {
      category: "Polling Day",
      q: "What happens if I am standing in queue when the official closing time (6:00 PM) arrives?",
      a: "By election law, anyone standing in the official queue at the scheduled closing time is legally entitled to vote. The Presiding Officer distributes numbered slips from the last person in line forward, ensuring everyone present gets to cast their ballot."
    },
    {
      category: "Rights & Security",
      q: "What is 'NOTA' (None of the Above)?",
      a: "NOTA is an option on the ballot allowing you to exercise your franchise while formally rejecting all nominated candidates. While NOTA does not currently disqualify candidates if a candidate wins the majority of valid votes, it sends a powerful statistical signal of voter dissatisfaction."
    },
    {
      category: "Rights & Security",
      q: "What is the 'Model Code of Conduct' (MCC)?",
      a: "The Model Code of Conduct is a set of ethical rules agreed upon by political parties to maintain free and fair elections. It prevents governing parties from using government machinery, advertising state achievements at public cost, or announcing new populist schemes during elections."
    }
  ],

  quiz: [
    {
      id: "q1",
      question: "Which document legally entitles you to vote on Election Day?",
      options: [
        "Having your name listed on the active official Electoral Roll",
        "Holding an original Voter ID card, even if your name isn't on the list",
        "Showing proof of property ownership in the constituency",
        "Having a verified social media voter badge"
      ],
      correct: 0,
      explanation: "Having your name on the active Electoral Roll is mandatory. Even if you possess an ID card, you cannot cast a vote if your name has been removed from the current roll."
    },
    {
      id: "q2",
      question: "If you lose your physical Voter ID card, what should you do on Election Day?",
      options: [
        "You are disqualified from voting for that election",
        "Request a neighbor to vouch for you without documents",
        "Bring an approved alternative photo ID like an Aadhaar, Passport, or Driving License",
        "Pay a penalty fee at the polling station to get an emergency pass"
      ],
      correct: 2,
      explanation: "Election commissions permit over 10 valid government-issued photo IDs (Aadhaar, Passport, Driving License, PAN card) if your name is already on the voter list."
    },
    {
      id: "q3",
      question: "How long does the VVPAT paper slip remain visible through the transparent window after you vote?",
      options: [
        "1 second",
        "30 seconds",
        "Until the next voter presses a button",
        "7 seconds"
      ],
      correct: 3,
      explanation: "The VVPAT transparent window illuminates and displays your chosen candidate's serial number, name, and symbol for precisely 7 seconds before cutting and dropping securely into the sealed ballot compartment."
    },
    {
      id: "q4",
      question: "What is the 'Election Silence Period'?",
      options: [
        "A 10-minute meditation before entering the voting booth",
        "The 48 hours preceding the close of polling where all campaign rallies and ads are banned",
        "The period during vote counting when observers cannot speak",
        "The first 24 hours after election results are declared"
      ],
      correct: 1,
      explanation: "The 48-hour Election Silence Period gives voters a calm, unpressured window to reflect on candidates without loud rallies, propaganda, or campaign broadcasts."
    },
    {
      id: "q5",
      question: "What should you do if someone has already cast a fraudulent vote in your name?",
      options: [
        "Demand a 'Tendered Ballot' from the Presiding Officer to record your genuine vote",
        "Leave quietly because the machine count cannot be altered",
        "Vote twice in the next election to balance the score",
        "Stage a protest inside the voting compartment"
      ],
      correct: 0,
      explanation: "Under election rules (e.g. Rule 49P), you are legally entitled to cast a 'Tendered Vote' on a special paper ballot after the Presiding Officer verifies your identity."
    },
    {
      id: "q6",
      question: "Can Electronic Voting Machines (EVMs) be connected to Wi-Fi, Bluetooth, or the Internet?",
      options: [
        "Yes, they connect via satellite for rapid counting",
        "Yes, only polling officers have the Wi-Fi password",
        "No, EVMs are completely standalone, battery-powered devices with zero network capability",
        "Only when uploading votes at the end of the day"
      ],
      correct: 2,
      explanation: "EVMs are 100% air-gapped and have no wireless antennas, Wi-Fi, Bluetooth, or internet modules. They operate exclusively on independent internal battery packs."
    },
    {
      id: "q7",
      question: "What is the legal purpose of NOTA (None of the Above) on the ballot?",
      options: [
        "To automatically cancel the election if chosen by any voter",
        "To donate your vote to the winning party",
        "To request a private interview with candidates",
        "To allow voters to formally reject all candidates while protecting ballot secrecy"
      ],
      correct: 3,
      explanation: "NOTA empowers citizens to exercise their democratic franchise to express dissatisfaction with all nominated candidates while upholding ballot secrecy."
    },
    {
      id: "q8",
      question: "Are mobile phones or cameras allowed inside the voting booth compartment?",
      options: [
        "No, electronic devices and cameras are strictly banned to preserve ballot secrecy",
        "Yes, if you want to take a selfie with the machine",
        "Yes, but only in silent mode",
        "Only for first-time voters"
      ],
      correct: 0,
      explanation: "Mobile phones, cameras, and recording gadgets are strictly prohibited inside the voting compartment to protect the fundamental constitutional principle of secret ballot."
    },
    {
      id: "q9",
      question: "What happens if you are standing in line at 6:00 PM when polling officially closes?",
      options: [
        "The polling booth gates close and all remaining people are turned away",
        "Only senior citizens in line are allowed to vote",
        "All voters already in queue before closing time are legally entitled to vote",
        "You must pay an overtime fee to cast your ballot"
      ],
      correct: 2,
      explanation: "By law, every citizen standing in the official queue at the scheduled closing hour is legally entitled to vote. The Presiding Officer distributes numbered slips from back to front."
    },
    {
      id: "q10",
      question: "What is the purpose of the Mock Poll conducted before voting begins?",
      options: [
        "To test the microphone in the building",
        "To cast at least 50 test votes in front of candidate agents proving 100% machine accuracy",
        "To let election staff vote early",
        "To demonstrate voting to nearby school children"
      ],
      correct: 1,
      explanation: "A mandatory Mock Poll with at least 50 votes is conducted around 6:00 AM in the presence of candidate polling agents to verify that the EVM and VVPAT match 100% before the count is cleared to zero."
    },
    {
      id: "q11",
      question: "Why is indelible ink applied to a voter's finger at the polling station?",
      options: [
        "To track voter movements via GPS",
        "To indicate which political party was chosen",
        "To verify age eligibility",
        "To prevent duplicate voting and voter impersonation"
      ],
      correct: 3,
      explanation: "Indelible silver-nitrate ink stains the skin for days and cannot be washed off, ensuring that an individual cannot attempt to vote a second time at another booth."
    },
    {
      id: "q12",
      question: "Under the Model Code of Conduct (MCC), what is an incumbent governing party prohibited from doing?",
      options: [
        "Announcing new policy grants or using official government vehicles for campaigning",
        "Holding peaceful press conferences",
        "Speaking to foreign journalists",
        "Filing nomination forms"
      ],
      correct: 0,
      explanation: "The Model Code of Conduct strictly bars ruling parties from using state resources, government machinery, official transport, or announcing new populist financial handouts during elections."
    },
    {
      id: "q13",
      question: "What is the official cVIGIL mobile app used for?",
      options: [
        "Casting votes online from your smartphone",
        "Checking live cricket scores during elections",
        "Reporting electoral misconduct, cash/gift distribution, and MCC violations with live geotagged proof",
        "Booking priority queues at polling booths"
      ],
      correct: 2,
      explanation: "cVIGIL allows any citizen to photograph or video-record violations of the Model Code of Conduct. The complaint is dispatched to flying squads for resolution within 100 minutes."
    },
    {
      id: "q14",
      question: "How does the election commission verify electronic vote counts after polling concludes?",
      options: [
        "By relying only on oral declarations by officers",
        "By re-running all machines in a private laboratory",
        "By asking party leaders to agree on an estimate",
        "Through mandatory physical counting of paper slips from randomly chosen VVPATs per constituency"
      ],
      correct: 3,
      explanation: "Statutory rules require mandatory randomized physical counting of VVPAT paper slips from polling booths in every constituency to cross-verify the electronic tally."
    },
    {
      id: "q15",
      question: "What facility is available for elderly voters (85+) and persons with disabilities (PwD)?",
      options: [
        "They are exempted from participating in elections",
        "Home voting via postal ballot upon advance application, plus priority queues and ramps at booths",
        "Only telephone voting is permitted",
        "They must bring three family witnesses to vote"
      ],
      correct: 1,
      explanation: "Election commissions provide optional supervised home-voting facilities for voters aged 85+ and certified PwD voters, along with mandatory wheelchair ramps and Braille guides at polling stations."
    },
    {
      id: "q16",
      question: "At what age can an Indian citizen submit an advance application (Form 6) for voter enrollment?",
      options: [
        "At 17 years of age, to be enrolled on the next qualifying quarterly date after turning 18",
        "Only on their 21st birthday",
        "Only during general election years",
        "At 25 years of age"
      ],
      correct: 0,
      explanation: "Citizens can now apply in advance upon turning 17 years old. Their application is processed, and they are automatically enrolled on the qualifying date (Jan 1, Apr 1, Jul 1, Oct 1) after turning 18."
    }
  ],

  chatbotKnowledge: [
    {
      keywords: ["register", "enroll", "form 6", "how to register", "apply"],
      title: "Voter Registration Guidance",
      response: "To register, you must be 18+ and a citizen. Submit **Form 6** online through your election commission portal or submit it physically to your local Booth Level Officer (BLO) with proof of age and residence. You can check the step-by-step walkthrough in our **Procedures** section!",
      actionLink: "#procedures",
      actionText: "Open Registration Steps"
    },
    {
      keywords: ["id", "documents", "aadhaar", "passport", "no card", "lost card", "identity"],
      title: "Accepted ID Documents",
      response: "Missing your physical Voter ID? No panic! As long as your name is on the roll, you can use **Aadhaar, Passport, Driving License, PAN Card, or Bank Passbook with photo**. Check our **Common Errors** section for the complete list.",
      actionLink: "#errors",
      actionText: "View Accepted Photo IDs"
    },
    {
      keywords: ["evm", "hack", "vvpat", "machine", "beep", "how does evm work"],
      title: "EVM & VVPAT Transparency",
      response: "EVMs are 100% standalone, battery-powered devices with no internet or wireless antennas. When you vote, the **VVPAT slip displays your selected candidate for 7 seconds** and drops into a sealed box for auditing. Try out our **Interactive EVM Simulator** right on this page!",
      actionLink: "#simulator",
      actionText: "Launch EVM Simulator"
    },
    {
      keywords: ["timeline", "dates", "schedule", "stages", "silence period"],
      title: "Election Stages & Deadlines",
      response: "Elections follow 6 transparent stages: 1) Roll Registration, 2) Nominations, 3) Campaigning, 4) Voting Day, 5) Vote Counting & Auditing, and 6) Results Declaration. Explore our **Interactive Timeline** for key milestones and deadlines.",
      actionLink: "#timeline",
      actionText: "Explore Timeline"
    },
    {
      keywords: ["helpline", "complaint", "fraud", "contact", "report", "phone"],
      title: "Official Helplines & Assistance",
      response: "Need immediate official help? Dial toll-free **1950** (voter helpline) or download the official voter grievance app to report code violations, missing names, or booth irregularities with photographic proof.",
      actionLink: "#resources",
      actionText: "See Official Resources"
    },
    {
      keywords: ["quiz", "test", "ready", "score", "certificate"],
      title: "Test Your Knowledge",
      response: "Take our **5-question Civic Literacy Quiz** to check how prepared you are for polling day and earn your shareable 'Election Ready Certified Voter' badge!",
      actionLink: "#quiz",
      actionText: "Start the Quiz"
    },
    {
      keywords: ["checklist", "bring", "prepare", "what to bring"],
      title: "Voter Day Checklist",
      response: "You can generate a personalized **'What to Bring on Election Day'** checklist in our Voter Tools section, complete with reminders for valid photo ID, voter slips, and booth etiquette!",
      actionLink: "#checklist",
      actionText: "Open Checklist Generator"
    }
  ]
};

// Freeze data to prevent accidental modification
Object.freeze(ELECTION_DATA);
