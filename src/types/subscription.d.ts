export type productType = {
  id: string
  name: string
  description: string
  price: number
  images: number
  ads: number
  features: string[]
}

export type subscriptionType = {
  amount: number
  cycles: number
  cycles_complete: number
  frequency: number
  run_date: string
  status: number
  status_reason: string
  status_text: string
  token: string
}

export type payfastAPI = {
  amount: number
  cycles: number
  cycles_complete: number
  frequency: number
  run_date: Date
  status: number
  status_reason: string
  status_text: string
  token: string
}

export type paymentResponseData = {
  m_payment_id: string
  pf_payment_id: string
  payment_status: string
  item_name: string
  item_description: string
  amount_gross: string
  amount_fee: string
  amount_net: string
  custom_str1: string
  custom_str2: string
  custom_str3: string
  custom_str4: string
  custom_str5: string
  custom_int1: string
  custom_int2: string
  custom_int3: string
  custom_int4: string
  custom_int5: string
  name_first: string
  name_last: string
  email_address: string
  merchant_id: string
  signature: string
}

export type subscriptionResponseData = {
  m_payment_id: string
  pf_payment_id: string
  payment_status: string
  item_name: string
  item_description: string
  amount_gross: string
  amount_fee: string
  amount_net: string
  custom_str1: string
  custom_str2: string
  custom_str3: string
  custom_str4: string
  custom_str5: string
  custom_int1: string
  custom_int2: string
  custom_int3: string
  custom_int4: string
  custom_int5: string
  name_first: string
  name_last: string
  email_address: string
  merchant_id: string
  token: string
  billing_date: string
  signature: string
}
