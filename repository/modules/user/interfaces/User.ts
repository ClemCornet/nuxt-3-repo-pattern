export type User = {
  address: string
  bankAccountOwner: string | null
  bic: string | null
  birthdate: string | null
  city: string | null
  civility: string
  country: string
  createdAt: string
  email: string
  esClientGeneralRentalConditionSignedAt: boolean | null
  firstName: string
  frClientGeneralRentalConditionSignedAt: string
  iban: string | null
  invitationCreatedAt: string | null
  isAdmin: boolean
  lastName: string
  locale: 'fr' | 'en'
  nationality: string | null
  ownerGeneralRentalConditionSigned: boolean
  partnershipAgency: boolean
  partnershipAgencyName: string | null
  phone: string
  postalCode: string
  termsOfServiceSigned: boolean
  updatedAt: string
  incompleteSignup: boolean
  termsOfServiceSignedAt: string
}
