// Enum untuk Status
enum Status {
  WAITING_FOR_RESPONSE = 1,
  READY_TO_EXECUTE = 2,
  ON_PROGRESS = 3,
  DONE = 4,
}

// Enum untuk Service ID
enum ServiceId {
  PEMASANGAN_METERAN_BARU = 1,
  PENAMBAHAN_PENURUNAN_DAYA = 2,
  PERBAIKAN = 3,
  PERMINTAAN_KHUSUS = 4,
}

export interface DataItem {
  orderId: string;
  status: Status;
  nama: string;
  serviceId: ServiceId;
  alamat: string;
  startDate?: string | null;
  endDate?: string | null;
  selectedDate?: string | null;
  notes?: string;
}

const data: DataItem[] = [
  {
    orderId: "FS4353KSM1",
    status: Status.WAITING_FOR_RESPONSE,
    nama: "Sujanti Putri P",
    serviceId: ServiceId.PEMASANGAN_METERAN_BARU,
    alamat:
      "Jl. Ancol Selatan I 10, RT.3/RW.6, Sunter Agung, Kec. Tj. Priok, Jkt Utara, Daerah Khusus Ibukota Jakarta 14350",
    startDate: "2024-12-05 08:00:00",
    endDate: "2024-12-10 18:00:00",
    selectedDate: null,
  },
  {
    orderId: "FS4354ABX2",
    status: Status.READY_TO_EXECUTE,
    nama: "Andi Wijaya",
    serviceId: ServiceId.PENAMBAHAN_PENURUNAN_DAYA,
    alamat: "Jl. Kebon Jeruk 2 No.34, Jakarta Barat, DKI Jakarta 11530",
    startDate: null,
    endDate: null,
    selectedDate: "2024-12-15 14:30:00",
  },
  {
    orderId: "FS4355PLT3",
    status: Status.ON_PROGRESS,
    nama: "Rina Melati",
    serviceId: ServiceId.PERBAIKAN,
    alamat: "Jl. Sudirman Kav. 45, Jakarta Selatan, DKI Jakarta 12190",
    startDate: null,
    endDate: null,
    selectedDate: "2024-12-20 10:00:00",
  },
  {
    orderId: "FS4356YTR4",
    status: Status.DONE,
    nama: "Budi Hartono",
    serviceId: ServiceId.PERBAIKAN,
    alamat: "Jl. Meruya Ilir No.12, Kembangan, Jakarta Barat, DKI Jakarta",
    startDate: null,
    endDate: null,
    selectedDate: "2025-01-05 16:00:00",
  },
  {
    orderId: "FS4357MNB5",
    status: Status.WAITING_FOR_RESPONSE,
    nama: "Ayu Ningsih",
    serviceId: ServiceId.PERMINTAAN_KHUSUS,
    alamat: "Jl. Tebet Timur Dalam No.56, Jakarta Selatan, DKI Jakarta",
    startDate: "2024-12-08 09:00:00",
    endDate: "2024-12-13 17:00:00",
    selectedDate: null,
  },
  {
    orderId: "FS4358LKP6",
    status: Status.READY_TO_EXECUTE,
    nama: "Samsul Arifin",
    serviceId: ServiceId.PENAMBAHAN_PENURUNAN_DAYA,
    alamat: "Jl. Cikini Raya No.78, Jakarta Pusat, DKI Jakarta",
    startDate: null,
    endDate: null,
    selectedDate: "2025-01-10 11:00:00",
  },
  {
    orderId: "FS4359XYZ7",
    status: Status.ON_PROGRESS,
    nama: "Nina Aprilia",
    serviceId: ServiceId.PEMASANGAN_METERAN_BARU,
    alamat: "Jl. Pahlawan Revolusi No.10, Jakarta Timur, DKI Jakarta",
    startDate: null,
    endDate: null,
    selectedDate: "2024-12-25 08:30:00",
  },
  {
    orderId: "FS4360QWE8",
    status: Status.DONE,
    nama: "Doni Saputra",
    serviceId: ServiceId.PERBAIKAN,
    alamat: "Jl. Gajah Mada No.2, Jakarta Pusat, DKI Jakarta",
    startDate: null,
    endDate: null,
    selectedDate: "2025-01-15 09:45:00",
  },
  {
    orderId: "FS4361RTY9",
    status: Status.WAITING_FOR_RESPONSE,
    nama: "Melati Anggraeni",
    serviceId: ServiceId.PERBAIKAN,
    alamat: "Jl. Fatmawati No.20, Jakarta Selatan, DKI Jakarta",
    startDate: "2025-01-03 10:00:00",
    endDate: "2025-01-08 18:00:00",
    selectedDate: null,
  },
  {
    orderId: "FS4362UIO10",
    status: Status.READY_TO_EXECUTE,
    nama: "Ferry Pratama",
    serviceId: ServiceId.PERMINTAAN_KHUSUS,
    alamat: "Jl. Rasuna Said Kav.21, Jakarta Selatan, DKI Jakarta",
    startDate: null,
    endDate: null,
    selectedDate: "2025-01-20 15:30:00",
  },
];

// Interface untuk StatusBadge
interface StatusBadgeItem {
  label: string;
  color: string;
}

// Badge dengan tipe Record<number, StatusBadgeItem>
const StatusBadge: Record<number, StatusBadgeItem> = {
  [Status.WAITING_FOR_RESPONSE]: {
    label: "Waiting For Response",
    color: "bg-yellow-500 text-white",
  },
  [Status.READY_TO_EXECUTE]: {
    label: "Ready to Execute",
    color: "bg-blue-500 text-white",
  },
  [Status.ON_PROGRESS]: {
    label: "On Progress",
    color: "bg-orange-500 text-white",
  },
  [Status.DONE]: {
    label: "Done",
    color: "bg-green-500 text-white",
  },
};

const ServiceIdLabel: Record<ServiceId, string> = {
  [ServiceId.PEMASANGAN_METERAN_BARU]: "Pemasangan Meteran Baru",
  [ServiceId.PENAMBAHAN_PENURUNAN_DAYA]: "Penambahan / Penurunan Daya",
  [ServiceId.PERBAIKAN]: "Perbaikan",
  [ServiceId.PERMINTAAN_KHUSUS]: "Permintaan Khusus",
};

enum InspectionStatus {
  GOOD = 1,
  MEDIUM = 2,
  POOR = 3,
}

interface InspectionDetails {
  kondisiMesin: InspectionStatus;
  kondisiBan: InspectionStatus;
  kondisiKelistrikan: InspectionStatus;
  kondisiRem: InspectionStatus;
  kondisiFilter: InspectionStatus;
  timingBelt: InspectionStatus;
}

interface Vehicle {
  id: number;
  name: string;
  licensePlate: string;
  transmission: string;
  lastInspection: string;
  inspectionDetails: InspectionDetails;
}

const vehicles: Vehicle[] = [
  {
    id: 1,
    name: "Mitsubishi L300",
    licensePlate: "B 1323 XX",
    transmission: "Manual Transmission",
    lastInspection: "10 Des 2024 17:00",
    inspectionDetails: {
      kondisiMesin: InspectionStatus.GOOD,
      kondisiBan: InspectionStatus.MEDIUM,
      kondisiKelistrikan: InspectionStatus.MEDIUM,
      kondisiRem: InspectionStatus.GOOD,
      kondisiFilter: InspectionStatus.GOOD,
      timingBelt: InspectionStatus.MEDIUM,
    },
  },
  {
    id: 2,
    name: "Toyota Avanza",
    licensePlate: "B 8823 QW",
    transmission: "Automatic Transmission",
    lastInspection: "10 Des 2024 15:30",
    inspectionDetails: {
      kondisiMesin: InspectionStatus.GOOD,
      kondisiBan: InspectionStatus.GOOD,
      kondisiKelistrikan: InspectionStatus.GOOD,
      kondisiRem: InspectionStatus.GOOD,
      kondisiFilter: InspectionStatus.GOOD,
      timingBelt: InspectionStatus.GOOD,
    },
  },
  {
    id: 3,
    name: "Daihatsu Luxio",
    licensePlate: "D 4532 HW",
    transmission: "Manual Transmission",
    lastInspection: "10 Des 2024 14:00",
    inspectionDetails: {
      kondisiMesin: InspectionStatus.MEDIUM,
      kondisiBan: InspectionStatus.POOR,
      kondisiKelistrikan: InspectionStatus.MEDIUM,
      kondisiRem: InspectionStatus.POOR,
      kondisiFilter: InspectionStatus.MEDIUM,
      timingBelt: InspectionStatus.POOR,
    },
  },
  {
    id: 4,
    name: "Suzuki Carry",
    licensePlate: "B 7342 YY",
    transmission: "Manual Transmission",
    lastInspection: "10 Des 2024 10:45",
    inspectionDetails: {
      kondisiMesin: InspectionStatus.GOOD,
      kondisiBan: InspectionStatus.GOOD,
      kondisiKelistrikan: InspectionStatus.GOOD,
      kondisiRem: InspectionStatus.GOOD,
      kondisiFilter: InspectionStatus.GOOD,
      timingBelt: InspectionStatus.GOOD,
    },
  },
  {
    id: 5,
    name: "Daihatsu Xenia",
    licensePlate: "F 2134 UY",
    transmission: "Automatic Transmission",
    lastInspection: "10 Des 2024 09:15",
    inspectionDetails: {
      kondisiMesin: InspectionStatus.MEDIUM,
      kondisiBan: InspectionStatus.MEDIUM,
      kondisiKelistrikan: InspectionStatus.MEDIUM,
      kondisiRem: InspectionStatus.GOOD,
      kondisiFilter: InspectionStatus.GOOD,
      timingBelt: InspectionStatus.MEDIUM,
    },
  },
];

export {
  Status,
  ServiceId,
  data,
  StatusBadge,
  ServiceIdLabel,
  InspectionStatus,
  vehicles,
};

export type { InspectionDetails, Vehicle };
