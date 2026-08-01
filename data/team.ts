export type TeamMember = {
  id: string;
  name: string;
  position: string;
  qualification: string;
  experience: string;
  imageUrl?: string;
};

export const leadershipData: TeamMember[] = [
  {
    id: "seraj-mikrani",
    name: "Seraj Mikrani",
    position: "CEO",
    qualification: "MBA, LL.B",
    experience: "15+ years in Corporate Management, Legal Services, Business Development & Consulting. Recognized for professional contributions connected with the SAARC Youth Conference."
  },
  {
    id: "mohini-prasad",
    name: "Mohini Prasad Bhattarai",
    position: "Consultant",
    qualification: "Professional Consultant",
    experience: "Extensive experience in business strategy and corporate consulting."
  },
  {
    id: "kumar-adhikari",
    name: "Adv. Kumar Adhikari",
    position: "Consultant",
    qualification: "Advocate",
    experience: "Specialized in corporate law, litigation, and dispute resolution."
  },
  {
    id: "subij-paudel",
    name: "CA Subij Paudel",
    position: "Consultant",
    qualification: "Chartered Accountant",
    experience: "Expertise in financial auditing, tax planning, and corporate finance."
  },
  {
    id: "rajendra-regmi",
    name: "Rajendra Regmi",
    position: "Consultant",
    qualification: "Professional Consultant",
    experience: "Specialist in operations management and strategic planning."
  },
  {
    id: "subash-baral",
    name: "Subash Baral",
    position: "Consultant",
    qualification: "Professional Consultant",
    experience: "Focused on entrepreneurship development and research."
  },
  {
    id: "bimala-shrestha",
    name: "Bimala Shrestha",
    position: "Consultant",
    qualification: "Professional Consultant",
    experience: "Experienced in HR outsourcing, training, and talent management."
  }
];
