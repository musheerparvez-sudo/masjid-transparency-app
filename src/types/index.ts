/**
 * Mosque Transparency App - TypeScript Type Definitions
 * Enums and interfaces for mosque management, finances, staff, properties, and API responses.
 */

// ==========================================
// Enums matching Prisma schema
// ==========================================

/**
 * User roles within the Mosque Transparency platform.
 */
export enum UserRole {
  ADMIN = 'ADMIN',
  VOLUNTEER = 'VOLUNTEER',
  DONOR = 'DONOR',
  VIEWER = 'VIEWER',
}

/**
 * Management and governing entity classification for a Mosque.
 */
export enum MosqueType {
  PRIVATE = 'PRIVATE',
  TRUST = 'TRUST',
  WAQF_BOARD = 'WAQF_BOARD',
  COMMITTEE = 'COMMITTEE',
}

/**
 * Roles and designations for mosque personnel and staff.
 */
export enum StaffRole {
  IMAM = 'IMAM',
  MUAZZIN = 'MUAZZIN',
  KHADIM = 'KHADIM',
  NAIB_IMAM = 'NAIB_IMAM',
}

/**
 * Payment completion status for transactions and salaries.
 */
export enum PaymentStatus {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
  PARTIAL = 'PARTIAL',
}

/**
 * Accepted payment methods for salaries, donations, and expenses.
 */
export enum PaymentMethod {
  CASH = 'CASH',
  BANK_TRANSFER = 'BANK_TRANSFER',
  UPI = 'UPI',
  CHEQUE = 'CHEQUE',
  ONLINE = 'ONLINE',
}

/**
 * Classification categories for operational and capital expenses.
 */
export enum ExpenseCategory {
  SALARY = 'SALARY',
  UTILITIES = 'UTILITIES',
  MAINTENANCE = 'MAINTENANCE',
  CONSTRUCTION = 'CONSTRUCTION',
  EVENTS = 'EVENTS',
  MISCELLANEOUS = 'MISCELLANEOUS',
}

/**
 * Types of recurring utility and service bills.
 */
export enum BillType {
  ELECTRICITY = 'ELECTRICITY',
  WATER = 'WATER',
  GAS = 'GAS',
  INTERNET = 'INTERNET',
  PHONE = 'PHONE',
  OTHER = 'OTHER',
}

/**
 * Status of recurring utility and service bills.
 */
export enum BillStatus {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
  OVERDUE = 'OVERDUE',
}

/**
 * Revenue and incoming fund sources.
 */
export enum IncomeSource {
  DONATION = 'DONATION',
  RENTAL = 'RENTAL',
  LAND = 'LAND',
  GOVERNMENT_AID = 'GOVERNMENT_AID',
  TRUST_FUND = 'TRUST_FUND',
  OTHER = 'OTHER',
}

/**
 * Classification types for waqf and mosque-owned real estate properties.
 */
export enum PropertyType {
  LAND = 'LAND',
  SHOP = 'SHOP',
  HALL = 'HALL',
  RESIDENTIAL = 'RESIDENTIAL',
  AGRICULTURAL = 'AGRICULTURAL',
  COMMERCIAL = 'COMMERCIAL',
}

/**
 * Measurement units for land and property surface area.
 */
export enum AreaUnit {
  SQFT = 'SQFT',
  SQMETER = 'SQMETER',
  ACRE = 'ACRE',
  BIGHA = 'BIGHA',
}

/**
 * Actions tracked in audit logs for system transparency.
 */
export enum AuditAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

// ==========================================
// Interfaces
// ==========================================

/**
 * Summary data representing a mosque card in search and list views.
 */
export interface MosqueCardData {
  id: string;
  name: string;
  city: string;
  state: string;
  type: MosqueType;
  transparencyScore: number;
  totalDonations: number;
  totalExpenses: number;
  isVerified: boolean;
  photos: string[];
}

/**
 * Comprehensive details of a mosque including staff, financials, properties, and governance.
 */
export interface MosqueDetailData extends MosqueCardData {
  nameUrdu?: string;
  address: string;
  pinCode: string;
  latitude: number;
  longitude: number;
  capacity: number;
  constructionYear?: number;
  description?: string;
  mutawalli?: MutawalliData;
  bankAccount?: BankAccountData;
  staff: StaffData[];
  recentExpenses: ExpenseData[];
  recentIncomes: IncomeData[];
  properties: PropertyData[];
  bills: BillData[];
}

/**
 * Represents a staff member employed by the mosque.
 */
export interface StaffData {
  id: string;
  name: string;
  role: StaffRole;
  phone?: string;
  photoUrl?: string;
  qualification?: string;
  experienceYears?: number;
  appointedDate: string;
  monthlySalary: number;
  isActive: boolean;
  recentPayments: SalaryPaymentData[];
}

/**
 * Monthly salary payment record for mosque staff.
 */
export interface SalaryPaymentData {
  id: string;
  amount: number;
  month: number;
  year: number;
  status: PaymentStatus;
  paymentDate?: string;
  paymentMethod?: PaymentMethod;
  proofUrl?: string;
}

/**
 * Expense record for mosque operations, maintenance, or projects.
 */
export interface ExpenseData {
  id: string;
  category: ExpenseCategory;
  amount: number;
  description: string;
  receiptUrl?: string;
  expenseDate: string;
  isPaid: boolean;
}

/**
 * Utility or service bill record for a mosque.
 */
export interface BillData {
  id: string;
  billType: BillType;
  amount: number;
  billDate: string;
  dueDate: string;
  status: BillStatus;
  paidDate?: string;
  receiptUrl?: string;
}

/**
 * Record of revenue or incoming funds for a mosque.
 */
export interface IncomeData {
  id: string;
  source: IncomeSource;
  amount: number;
  description: string;
  incomeDate: string;
}

/**
 * Waqf or mosque-owned property details and generated income.
 */
export interface PropertyData {
  id: string;
  type: PropertyType;
  area: number;
  areaUnit: AreaUnit;
  location: string;
  description?: string;
  legalStatus?: string;
  monthlyIncome: number;
}

/**
 * Record of a donation received by the mosque.
 */
export interface DonationData {
  id: string;
  amount: number;
  isAnonymous: boolean;
  donorName?: string;
  method: PaymentMethod;
  message?: string;
  donatedAt: string;
}

/**
 * Information regarding the mosque trustee / administrator (Mutawalli).
 */
export interface MutawalliData {
  id: string;
  name: string;
  phone: string;
  email?: string;
  sinceDate: string;
  photoUrl?: string;
}

/**
 * Official verified bank account and payment gateway details for donations.
 */
export interface BankAccountData {
  id: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
  upiId?: string;
  qrCodeUrl?: string;
  isVerified: boolean;
}

/**
 * Registration form payload for volunteer sign-up.
 */
export interface VolunteerRegistrationForm {
  name: string;
  email: string;
  phone: string;
  area: string;
  city: string;
  state: string;
  password: string;
}

/**
 * Query parameters used when filtering and searching mosques.
 */
export interface MosqueSearchParams {
  query?: string;
  city?: string;
  state?: string;
  type?: MosqueType;
  pinCode?: string;
  lat?: number;
  lng?: number;
  radius?: number;
}

/**
 * Aggregated financial summary and monthly cashflow breakdown.
 */
export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  totalDonations: number;
  balance: number;
  monthlyBreakdown: {
    month: string;
    income: number;
    expenses: number;
  }[];
}

// ==========================================
// API Response types
// ==========================================

/**
 * Standard API response wrapper.
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Standard paginated API response wrapper.
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
