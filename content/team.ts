// The Kenstera team. Names, roles and links only: add a bio or photo here only with real details.
export interface TeamLink {
  label: string;
  href: string;
}

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  palette: "ember" | "dusk" | "moss";
  /** Where to learn more about this person. */
  links: TeamLink[];
}

export const TEAM: TeamMember[] = [
  { name: "Ken Reibman", role: "Founder", initials: "KR", palette: "ember", links: [] },
  {
    name: "Francisco Banda",
    role: "Software Engineer",
    initials: "FB",
    palette: "dusk",
    links: [
      { label: "Website", href: "https://f-banda.com/" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/fbanda/" },
    ],
  },
  {
    name: "Kousay Jebir",
    role: "Software Engineer",
    initials: "KJ",
    palette: "moss",
    links: [{ label: "LinkedIn", href: "https://tn.linkedin.com/in/kousay-jebir" }],
  },
];
