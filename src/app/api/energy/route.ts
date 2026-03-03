import { NextResponse, NextRequest } from 'next/server'
import { getEnergyData, IntervalOption, DateRangeOption } from '@/lib/energyData'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const interval  = (searchParams.get('interval')  ?? '1h') as IntervalOption
  const dateRange = (searchParams.get('dateRange') ?? 'default') as DateRangeOption
  try {
    const data = await getEnergyData({ interval, dateRange })
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}
