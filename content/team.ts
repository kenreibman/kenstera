// The Kenstera team. Names and roles only: add a bio or photo here only with real details.
export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  palette: "ember" | "dusk" | "moss";
}

export const TEAM: TeamMember[] = [
  { name: "Ken Reibman", role: "Founder", initials: "KR", palette: "ember" },
  { name: "Francisco Banda", role: "Software Engineer", initials: "FB", palette: "dusk" },
  { name: "Kousay Jebir", role: "Software Engineer", initials: "KJ", palette: "moss" },
];
