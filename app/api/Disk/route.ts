import { type NextRequest } from 'next/server'
import DiskSave from "@/app/create/Disk"

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const barcode = formData.get('barcode')?.toString()
  const location = formData.get('location')
  const isChecked = (formData.get('isChecked') =="true");

  let Disk = DiskSave(barcode, location, isChecked)
  if (await Disk) {
    return Response.json({ barcode, location })
  }
  else {
    return Response.json({ error: "Barcode is incomplete or not found" }, { status: 500 })
  }

}