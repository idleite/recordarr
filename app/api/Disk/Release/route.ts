import { type NextRequest } from 'next/server'
import {DiskSaveRelease} from "@/app/create/Disk"

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const ReleaseNumber = formData.get('Release')
  const location = formData.get('location')
  const isChecked = (formData.get('isChecked') =="true");

  let Disk = DiskSaveRelease(ReleaseNumber, location, isChecked)
  if (await Disk) {
    return Response.json({ ReleaseNumber, location })
  }
  else {
    return Response.json({ error: "ReleaseNumber is incomplete or not found" }, { status: 500 })
  }

}