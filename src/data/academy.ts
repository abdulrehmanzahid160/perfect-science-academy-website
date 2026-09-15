export const academy = {
  name: "Perfect Science Academy",
  shortName: "PSA",
  tagline: "Perfection leads to excellence",
  address: "160 GB Kalyki, Gojra, Toba Tek Singh, Pakistan",
  shortAddress: "160 GB Kalyki, Gojra",
  phone: "0346 4850171",
  whatsapp: "923464850171",
  email: "psa160gb@gmail.com",
  facebook: "https://web.facebook.com/PSA160",
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Faculty", href: "/faculty" },
  { label: "Results", href: "/results" },
  { label: "Admissions", href: "/admissions" },
] as const;

export const teachers = [
  { slug: "muhammad-usman-mustafa", name: "Muhammad Usman Mustafa", subjects: ["Mathematics", "Physics"], experience: "15+ years", phone: "0346 4850171", image: "/images/teachers/usman.jpg", bio: "Building strong concepts through clear explanation, practice and consistent feedback." },
  { slug: "muhammad-sajid-ali", name: "Muhammad Sajid Ali", subjects: ["Biology", "English"], experience: "", phone: "0345 7574147", image: "/images/teachers/sajid.jpg", bio: "Helping students learn with confidence through focused, approachable teaching." },
  { slug: "shahzaib-atif", name: "Shahzaib Atif", subjects: ["Physics", "Chemistry"], experience: "5+ years", phone: "0315 7814715", image: "/images/teachers/shahzaib.jpg", bio: "Connecting scientific ideas to practical problem-solving and exam preparation." },
] as const;

export const sscResults = [
  ["Mubeen Fatima", 1161], ["Ayasha Pervaiz", 1153], ["Noor Fatima", 1151], ["Amna Atiq", 1072], ["Ayasha Sulman", 1069], ["Usman Bilal", 1046], ["Saim Rasheed", 1023], ["Abdullah Sajjad", 1011], ["Sadaf Maqbool", 1007], ["Zain Hassan", 1002],
] as const;

export const classNineResults = [
  ["Zeemal Anum", 545], ["Areesha Sajid", 541], ["Hadia Noor", 540], ["Erin Naveed", 511], ["Abdullah Saeed", 511], ["Umar Farooq", 504], ["Wahab Imran", 502], ["Ahmad Ramzan", 500],
] as const;

export const programs = [
  { title: "Foundation", years: "Classes 1–8", note: "Strong concepts and confident learning from the start." },
  { title: "Matric", years: "Classes 9–10", note: "Focused preparation for board exams and school assessments." },
  { title: "Intermediate", years: "Classes 11–12", note: "Advanced science learning with structured exam practice." },
] as const;

export const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English"] as const;
export const classroomImages = ["/images/academy/classroom-1.jpg", "/images/academy/classroom-2.jpg", "/images/academy/classroom-3.jpg"] as const;
export const whatsappLink = (message: string) => `https://wa.me/${academy.whatsapp}?text=${encodeURIComponent(message)}`;
