export const personalProjects = {
  vox: {
    title: '3D Vox Mesh to Particles',
    period: 'Feb/2026',
    points: [
      'Python/Fortran desktop app that turns 3D CAD models and point clouds into GADGET-2 particle files for rover–terrain simulation.',
      'Replaced a manual three-stage workflow (voxelise, compile Fortran, run) with one command and a role-based GUI.',
      'Custom numpy ray-stabbing voxeliser: within 0.02% of analytic volume, 7.26 M particles in 2 s.',
      'Terrain-aware placement drops rovers onto slopes and craters with verified clearance; 11 M-particle scenes in under a minute.'
    ],
    link: 'https://github.com/thomasallwinanto/FOTRAN_3D_POINTS_AUTOMATED',
    images: ['/assets/vox_rover_ramp.jpg', '/assets/vox_rover_voxels.jpg']
  },
  astarisk: {
    title: 'AStARISK*',
    period: 'Sep/2026',
    points: [
      'RAG chatbot · AI tool for students at TUHH & AStA, built with Noah and Dominik Wolff (diggary UG i.G.).',
      'Answers questions only from official documents (exam regulations, fees, committee minutes), with source references.',
      'Privacy-first: EU-hosted model (Mistral Small); only excerpts of public documents leave the system, internal ones stay local.',
      'Four-month pilot on the AStA website measuring anonymous usage to plan a TUHH-wide rollout.'
    ]
  },
  nfcSimulator: {
    title: 'NFC Card Simulator and WPT Explorer',
    period: 'Jul/2026',
    points: [
      'Interactive 3D simulator of the 13.56 MHz magnetic field of an NXP CLRC663 (CLEV6630B) reader antenna and an NFC card moving through it.',
      'Biot–Savart field model calibrated to bench measurements: reproduces the measured 9.0 cm read range at 5 V and ~7.8 cm at 3.3 V.',
      'Adjustable card height, offset, antenna current and ISO/IEC 14443 threshold, with live predicted read range.',
      'Built for a TUHH wireless power transfer seminar to derive the antenna current indirectly using the card as a calibrated probe.',
      'Companion WPT Explorer: coupling & efficiency, compensation topologies (SS/SP/PS/PP) and VNA S-parameters.'
    ],
    link: 'https://github.com/thomasallwinanto/NFC-Card-Simulator-and-WPT-Vehicle-Coupling-webapps',
    apps: [
      { label: 'Open Card Simulator', url: '/apps/nfc-card-simulator.html' },
      { label: 'Open WPT Explorer', url: '/apps/wpt-explorer.html' }
    ],
    images: ['/assets/nfc_simulator.jpg']
  },
  twoWire: {
    title: 'Two Wire AC Distribution System',
    period: 'Jan/2021 – Jul/2021',
    points: [
      'Designed a low-cost two-wire AC distribution system enabling isolated power extension for domestic households.',
      'Addressed excessive energy losses and high billing caused by conventional distribution methods.',
      'Implemented solutions for overheating and cooling inefficiencies to enhance reliability and energy efficiency by 20%.'
    ]
  },
  transformer: {
    title: 'Transformer Failure Notifier',
    period: 'Jan/2020 – Jun/2020',
    points: [
      'Developed a GSM-based wireless notification system using Arduino Uno to alert grid authorities of transformer failures.',
      'Enabled real-time fault location detection with transformer ID tagging, reducing downtime by 30% and manual tracing.',
      'Proposed future scope for fault-type classification using extended sensor modules.'
    ]
  },
  isolated: {
    title: 'Isolated Extension Supply',
    period: 'Jan/2019 – Jun/2019',
    points: [
      'Engineered a novel device for safe handling of live AC wires by converting Phase/Neutral to 2-phase input.',
      'Eliminated electrocution risk by isolating ground paths and redesigning current flow through phase-phase methodology.',
      'Enabled live testing and operation of appliances without traditional neutral connections.'
    ]
  },
  portfolio: {
    title: 'Personal Portfolio Website',
    link: 'https://github.com/thomasallwinanto/Thomas_Allwin_Portfolio',
    desc: "This website. I know, the project in a project. I used github copilot, VS code and other softwares to build this site. I am still learning and exploring this domain and figuring out ways to optimise this site, finding cleaner, healthier ways to code. Need to explore react and much more... :)"
  },
  guild: {
    title: 'Band and Music',
    period: '2025',
    desc: "I'm part of a collaborative music and creative project in Hamburg where we explore Blues plus 70s and 80s rock. I personally tilt towards the blues, drawing inspiration from Eric Clapton and Stevie Ray Vaughan. I used to play a Telecaster strung with 10 gauge strings because I found it versatile, simple, and clean. Now I play a strat with 9 gauge strings. Will be trying on 13 gauge strings later. I also started a Music AG at TUHH with my colleague and friend Vincent to connect student musicians with each other based on their genre and taste in music, and we have organised many events at uni. Check out the Music AG on IG: <a href='https://www.instagram.com/musicagtuhh/' target='_blank' style='color:#00bcd4; text-decoration:underline;'>[@musicagtuhh]</a>. Follow us on IG: <a href='https://www.instagram.com/guildband/' target='_blank' style='color:#00bcd4; text-decoration:underline;'>[@guildband]</a>.",
    images: ['/assets/Tom_Guitar.jpg', '/assets/guild-strat.jpg']
  },
  imaginary: {
    title: 'Imaginary Axis',
    desc: "My 3D art project created during lockdown using Paint 3D. See more in the Art Projects section."
  },
  architecture: {
    title: 'Architecture',
    desc: "Planned, designed and constructed a house in Kerala, India using self‑learned tools (Paint, Unreal Engine & open source). Completed concept + plan set in a month; available on request. The plan was designed to stay efficient even in a small space, keeping it affordable and minimal. The plans are free: email me and I will send them to you. Housing is a basic necessity and everyone should have it. It's not much but it's honest work.",
    images: ['/assets/House_1.jpg', '/assets/House_2.jpg', '/assets/House_3.jpg', '/assets/House_4.jpg']
  }
}
