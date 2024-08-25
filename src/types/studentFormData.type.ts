export type StudentPrefixOptions = "MISS" | "MASTER" | "";
export interface StudentDataForm {
    studentId: string;
    studentPrefix: StudentPrefixOptions;
    studentFirstName: string;
    studentLastName: string;
    studentNickName: string;
}