export interface SheetPayload {
  source: string
  timestamp: string
  name?: string
  phone?: string
  email?: string
  propertyInterest?: string
  listingId?: string
  listingTitle?: string
  listingLocation?: string
  budget?: string
  transactionType?: string
  timeline?: string
  financing?: string
  preferredTime?: string
  message?: string
  interest?: string
}

/**
 * Posts lead data to the Google Apps Script Web App webhook.
 *
 * Uses mode:'no-cors' because Apps Script does not return CORS headers by
 * default. An opaque response (status 0) is treated as success; only a thrown
 * network error surfaces as a real failure.
 *
 * When NEXT_PUBLIC_SHEET_WEBHOOK_URL is missing or still the placeholder the
 * function logs to the console so forms still work in development.
 */
export async function submitToSheet(payload: SheetPayload): Promise<void> {
  const url = process.env.NEXT_PUBLIC_SHEET_WEBHOOK_URL

  if (!url || url.includes('REPLACE_ME')) {
    console.log('[Sheet submission — dev, no webhook configured]', payload)
    return
  }

  await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  // no-cors gives an opaque response with status 0 — assume success if no throw
}
