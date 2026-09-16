export type PositionCertificateDraft = {
  id: string;
  recipient: string;
  classLevel: string;
  position: string;
  examTitle: string;
  academicSession: string;
  marks: string;
  totalMarks: string;
  percentage: string;
  issueDate: string;
  issuer: string;
  remarks: string;
  includeSignature: boolean;
  createdAt: string;
  updatedAt: string;
};

export const positionOptions = ["First Position", "Second Position", "Third Position", "Position Holder"] as const;
