// import { InsuranceCompany, Specialization } from "./doctor.detail";

export interface DashboardState {
  data: Body[];
 
}

// export type DoctorReduxState = Partial<DoctorState>;

// export type GetDoctorQueryParmas = Partial<Omit<DoctorState, "data">>;

// export interface DoctorListDTO {
//   body: Body[];
// }

// export interface Body {
//   id: string;
//   name: string;
//   consultation_fees: string;
//   avatar: string;
//   address: string;
//   experience_years: string;
//   latitude: string;
//   longitude: string;
//   qualification: string;
//   available_now: string;
//   profile_views: string;
//   is_favourite: string;
//   professionalism_rating_average: null | string;
//   punctuality_rating_average: null | string;
//   appearance_rating_average: null | string;
//   display_rating: number;
//   from_hospital_portal: number;
//   specializations: Specialization[];
//   insurance_companies: InsuranceCompany[];
//   hospital_id: string;
//   hospital_name: string;
//   hospital_physical_address: string;
//   hospital_avatar: string;
//   hospital_phones: string[];
//   hospital_phone: null | string;
//   hospital_latitude: string;
//   hospital_longitude: string;
//   hospital_editable: string;
// }

// // specializations api DTO response// Generated by https://quicktype.io

// export interface SpecializationsDTO {
//   body: Specializations[];
// }

// export interface Specializations {
//   id: string;
//   name: string;
//   color: string;
//   image: string;
//   children: string;
//   is_preferred: string;
// }