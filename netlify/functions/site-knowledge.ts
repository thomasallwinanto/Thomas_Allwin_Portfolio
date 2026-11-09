/**
 * Plain-text knowledge base handed to the chatbot as context.
 *
 * KEEP THIS IN SYNC: when you change the CV in src/pages/About.tsx, add a project
 * in src/data/projects.ts, or publish a post in src/data/blogs.ts, add the same
 * facts here. The chatbot can only answer from what is written below.
 */

export const SITE_KNOWLEDGE = `
# Who this site belongs to

Thomas Allwin Anto ("Tom"). Master's student and Embedded Systems Engineer.
Currently based in Hamburg, Germany. Born 1999; grew up in Bangalore and Chennai, India.

Contact:
- Email: thomas.anto@tuhh.de
- LinkedIn: https://www.linkedin.com/in/thomas-allwin-anto/
- Instagram: https://www.instagram.com/thomas_allwin/
- Letterboxd: https://letterboxd.com/thomasallwin/

# Profile

Embedded software engineer and M.Sc. student in Microelectronics & Microsystems (Embedded Systems) at TU Hamburg, with a B.E. in Electrical and Electronics Engineering and 3 years at Bosch Global Software Technologies (Powertrain Solutions). At Bosch I developed and validated 20+ ECU communication and diagnostic functions (AUTOSAR Classic, CAN, LIN, UDS) in embedded C, tested them on HiL benches with 95%+ code coverage, kept 200+ requirements traceable in IBM DOORS/DNG, kept the team’s Jenkins CI builds green, and delivered MISRA-compliant software under V-Model, ASPICE and ISO 26262 with every customer audit passed. As a research assistant at TU Hamburg I build Python data tools: 3D VOX Studio turns CAD models into simulation datasets of up to 11.3 M points in under 60 s. I also work on navigation, LiDAR data and Bayesian optimisation for the LEO Rover. With TUHH and AStA colleagues I developed a RAG chatbot that answers students in minutes instead of about two days. I build software end to end with AI coding assistants (Claude, GitHub Copilot), check results against ground truth, and explain technical work clearly: my 10+ training manuals and videos cut onboarding time by 35%. Certified in wind energy, power systems, battery management, IoT and project management.

# Professional experience

## Aug 2025 – Present — Research Assistant
Institut für Geotechnik und Baubetrieb, TUHH — Hamburg, Germany
- Building navigation algorithms for a 4WD autonomous rover using proprioceptive
  sensing (encoders, torque, current).
- Developing slip detection, traction control, and adaptive heading for reliable
  off-road mobility.
- Designing path-planning strategies (switchback, serpentine) to improve slope
  climbing and navigation efficiency.

## Sep 2021 – Sep 2024 — Embedded Software Engineer
Bosch Global Software Technologies — Bangalore, India
- Led AUTOSAR ComStack & BSW migration, enabling 15% faster integration and seamless
  ECU communication (UDS, CAN, LIN).
- Owned the complete SDLC: requirements (IBM DOORS/DNG), development, testing
  (Vector/ETAS), reviews, and ASPICE/MISRA-compliant delivery.
- Validated 20+ ECU features, achieving 95%+ coverage, zero critical defects, and
  boosting team velocity by 20%.

## Jul 2021 – Aug 2021 — Intern
Bangalore Metro Rail Corporation Limited — Bangalore, India
- Explored power distribution and BMS automation for station infrastructure.
- Gained experience in SCADA-driven metro rail subsystems, focusing on automation and
  protection analysis for traction & propulsion units.

# Education

- Master's in Microelectronics and Microsystems (MEMS), TUHH, Hamburg, Germany
  (moved to Germany in 2024 to pursue this).
- Bachelor's in Electrical and Electronics Engineering, India (graduated 2021).

# Projects

## 3D Mesh to Particles simulation (February 2026)
- Developed and documented a Python/C software bridge to convert complex data into
  binary protocols, ensuring seamless integration between high-level simulations and
  embedded hardware.
- Implemented a multi-device tracking system using unique hardware IDs to maintain
  data integrity and address mapping across the internal process communication
  architecture.

## Two Wire AC Distribution System (Jan 2021 – Jul 2021)
- Designed a low-cost two-wire AC distribution system enabling isolated power
  extension for domestic households.
- Addressed excessive energy losses and high billing caused by conventional
  distribution methods.
- Implemented solutions for overheating and cooling inefficiencies, improving
  reliability and energy efficiency by 20%.

## Transformer Failure Notifier (Jan 2020 – Jun 2020)
- Developed a GSM-based wireless notification system using Arduino Uno to alert grid
  authorities of transformer failures.
- Enabled real-time fault location detection with transformer ID tagging, reducing
  downtime by 30% and manual tracing.
- Proposed future scope for fault-type classification using extended sensor modules.

## Isolated Extension Supply (Jan 2019 – Jun 2019)
- Engineered a device for safe handling of live AC wires by converting Phase/Neutral
  to 2-phase input.
- Eliminated electrocution risk by isolating ground paths and redesigning current flow
  through a phase-phase methodology.
- Enabled live testing and operation of appliances without traditional neutral
  connections.

# Personal projects

## Personal Portfolio Website
This site. Built with GitHub Copilot, VS Code and other tools; now a React + TypeScript
+ Vite app deployed on Netlify. Still being learned and optimised.

## Band
A collaborative music and creative project in Hamburg exploring blues plus 70s and 80s
rock. Tom leans towards blues, drawing on Eric Clapton and Stevie Ray Vaughan. He plays
a Telecaster strung with 10-gauge strings and is experimenting with wah pedals.
Instagram: @theguild_band

## Imaginary Axis
A 3D art project created during lockdown using Paint 3D. The models are shown in the
Art Projects section of this site. Instagram: @imaginary_axis

## Architecture
Planned, designed and constructed a house in Kerala, India using self-taught tools
(Paint, Unreal Engine and open-source software). Completed the concept and plan set in
a month; available on request.

# Blogs / Reviews on this site

- "Spontane Jam-Sessions am Klavier: Thomas, Luca und Jakob begeistern"
- "Dune" — review
- "Rust, Dust and Snow: True Detective" — review of True Detective
- "Moral Blindness in High Plains Drifter" — review of the 1973 Clint Eastwood film

# Stuff Tom loves

Books: The Da Vinci Code; The Name of the Rose; Industrial Society and Its Future;
Dune; Dune Messiah; Children of Dune; God Emperor of Dune; Fahrenheit 451;
Crime and Punishment; Once Upon a Time in Hollywood.

Films (all rated 9): Inglourious Basterds; Nayakan; The Thing; The Good, the Bad and
the Ugly; Ratatouille; Saving Private Ryan; Dune; Star Wars: The Empire Strikes Back;
The Man From Earth; GoodFellas; The Social Network; The Godfather Part II.

Music: Stevie Ray Vaughan, Eric Clapton, and blues/70s-80s rock generally.

Cooking: there is a photo gallery of Tom's cooking on the "Stuff I Love" page.

# About this website

Sections: Home, About Me (with Projects nested beneath it), Personal Projects,
Art Projects, Blogs/Reviews, Stuff I Love, Contact. There is a light/dark theme toggle
and a background music player (the track is "One Step Ahead of the Blues" by JJ Cale —
all rights belong to the respective owners). Every page is open; nothing is gated.
`.trim()
