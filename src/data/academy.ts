export const academy = {
  name: "Perfect Science Academy",
  shortName: "PSA",
  address: "160 GB Kalyki, Gojra, Toba Tek Singh, Pakistan",
  phone: "0346 4850171",
  whatsapp: "923464850171",
  email: "psa160gb@gmail.com",
  facebook: "https://web.facebook.com/PSA160",
  googleMapsUrl: "",
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Faculty", href: "/faculty" },
  { label: "Results", href: "/results" },
  { label: "Admissions", href: "/admissions" },
  { label: "Promos", href: "/promos" },
] as const;

export const teachers = [
  {
    slug: "muhammad-usman-mustafa",
    name: "Muhammad Usman Mustafa",
    subjects: ["Mathematics", "Physics"],
    experience: "15+ Years",
    phone: "0346 4850171",
    image: "/images/teachers/usman.jpg",
    bio: "",
    qualification: "",
    teachingPhilosophy: "",
  },
  {
    slug: "muhammad-sajid-ali",
    name: "Muhammad Sajid Ali",
    subjects: ["Biology", "English"],
    experience: "",
    phone: "0345 7574147",
    image: "/images/teachers/sajid.jpg",
    bio: "",
    qualification: "",
    teachingPhilosophy: "",
  },
  {
    slug: "shahzaib-atif",
    name: "Shahzaib Atif",
    subjects: ["Physics", "Chemistry"],
    experience: "5+ Years",
    phone: "0315 7814715",
    image: "/images/teachers/shahzaib.jpg",
    bio: "",
    qualification: "",
    teachingPhilosophy: "",
  },
] as const;

export const sscResults = [
  ["Mubeen Fatima", 1161],
  ["Ayasha Pervaiz", 1153],
  ["Noor Fatima", 1151],
  ["Amna Atiq", 1072],
  ["Ayasha Sulman", 1069],
  ["Usman Bilal", 1046],
  ["Saim Rasheed", 1023],
  ["Abdullah Sajjad", 1011],
  ["Sadaf Maqbool", 1007],
  ["Zain Hassan", 1002],
] as const;

export const classNineResults = [
  ["Zeemal Anum", 545],
  ["Areesha Sajid", 541],
  ["Hadia Noor", 540],
  ["Erin Naveed", 511],
  ["Abdullah Saeed", 511],
  ["Umar Farooq", 504],
  ["Wahab Imran", 502],
  ["Ahmad Ramzan", 500],
] as const;

export const programs = [
  { title: "Matric", years: "Classes 9–10", note: "Board-focused subject preparation" },
  { title: "Intermediate", years: "Classes 11–12", note: "Advanced science foundations" },
  { title: "Foundation", years: "Classes 1–8", note: "Strong concepts from the start" },
] as const;

export const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English"] as const;

export const classroomImages = [
  "/images/academy/classroom-1.jpg",
  "/images/academy/classroom-2.jpg",
  "/images/academy/classroom-3.jpg",
] as const;

export const whatsappLink = (message: string) =>
  `https://wa.me/${academy.whatsapp}?text=${encodeURIComponent(message)}`;
