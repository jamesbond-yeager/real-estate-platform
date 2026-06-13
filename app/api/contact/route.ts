import { NextRequest, NextResponse } from 'next/server'

/**
 * Contact form proxy — forwards submissions to Web3Forms.
 * Get your free access key at https://web3forms.com
 * Set WEB3FORMS_ACCESS_KEY in your .env.local file.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Basic server-side validation
    if (!body.type) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY

    // If no access key is configured, log to console and return success
    // (useful for local development without an email backend)
    if (!accessKey || accessKey === 'your_access_key_here') {
      console.log('[Contact Form Submission]', JSON.stringify(body, null, 2))
      return NextResponse.json({ success: true, dev: true })
    }

    // Build a human-readable subject line based on submission type
    const subjects: Record<string, string> = {
      contact: `New Contact Enquiry from ${body.name ?? 'Unknown'}`,
      enquiry: `Property Enquiry — ${body.listingTitle ?? body.listingId}`,
      callback: `Callback Request from ${body.name ?? 'Unknown'}`,
      notify: `New Listing Alert Signup — ${body.interest ?? 'General'}`,
    }

    const web3Payload = {
      access_key: accessKey,
      subject: subjects[body.type] ?? 'New Form Submission',
      from_name: body.name ?? 'Website Visitor',
      replyto: body.email ?? '',
      // Convert all fields to a readable message
      message: Object.entries(body)
        .filter(([k]) => !['access_key', 'subject'].includes(k))
        .map(([k, v]) => `${k.charAt(0).toUpperCase() + k.slice(1)}: ${v}`)
        .join('\n'),
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(web3Payload),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
      console.error('[Web3Forms Error]', result)
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Contact API Error]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
